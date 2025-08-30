'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LocationContextType {
  city: string | null
  isLocationEnabled: boolean
  enableLocation: () => void
  disableLocation: () => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string | null>(null)
  const [isLocationEnabled, setIsLocationEnabled] = useState(false)

  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`
            )
            const data = await response.json()
            if (data.results && data.results[0]) {
              const cityName = data.results[0].components.city || 
                              data.results[0].components.town || 
                              data.results[0].components.village
              setCity(cityName)
              setIsLocationEnabled(true)
              localStorage.setItem('locationEnabled', 'true')
              localStorage.setItem('userCity', cityName)
            }
          } catch (error) {
            console.error('Error getting city name:', error)
            // Fallback to coordinates if API fails
            setCity(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`)
            setIsLocationEnabled(true)
            localStorage.setItem('locationEnabled', 'true')
            localStorage.setItem('userCity', `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`)
          }
        },
        (error) => {
          console.error('Error getting location:', error)
          // For demo purposes, set a default city
          setCity('Columbus')
          setIsLocationEnabled(true)
          localStorage.setItem('locationEnabled', 'true')
          localStorage.setItem('userCity', 'Columbus')
        }
      )
    }
  }

  const disableLocation = () => {
    setCity(null)
    setIsLocationEnabled(false)
    localStorage.removeItem('locationEnabled')
    localStorage.removeItem('userCity')
  }

  useEffect(() => {
    // Check if location was previously enabled
    const wasEnabled = localStorage.getItem('locationEnabled')
    const savedCity = localStorage.getItem('userCity')
    
    if (wasEnabled === 'true' && savedCity) {
      setCity(savedCity)
      setIsLocationEnabled(true)
    }
  }, [])

  const value: LocationContextType = {
    city,
    isLocationEnabled,
    enableLocation,
    disableLocation
  }

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
