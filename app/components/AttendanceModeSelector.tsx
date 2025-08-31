'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Video, MessageCircle, CheckCircle } from 'lucide-react'
import { MultiDeliveryService } from '@/lib/multi-delivery'

interface AttendanceModeSelectorProps {
  sessionId: number
  courseId: number
  sessionDate: string
  sessionTime: string
  onModeSelected?: (mode: 'in-person' | 'jitsi' | 'discord') => void
}

export default function AttendanceModeSelector({
  sessionId,
  courseId,
  sessionDate,
  sessionTime,
  onModeSelected
}: AttendanceModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<'in-person' | 'jitsi' | 'discord' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleModeSelection = async (mode: 'in-person' | 'jitsi' | 'discord') => {
    setSelectedMode(mode)
    setIsSubmitting(true)
    
    try {
      // Get current user ID from Supabase auth
      const { supabase } = await import('@/lib/supabase')
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }
      
      await MultiDeliveryService.selectAttendanceMode(user.id, sessionId, mode)
      setIsSubmitted(true)
      onModeSelected?.(mode)
      
      // Show success message
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
      
    } catch (error) {
      console.error('Error selecting attendance mode:', error)
      // Reset selection on error
      setSelectedMode(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const modes = [
    {
      id: 'in-person',
      title: 'In-Person',
      description: 'Attend class at the physical location',
      icon: Users,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'jitsi',
      title: 'Jitsi Meet',
      description: 'Join via video conference',
      icon: Video,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'discord',
      title: 'Discord',
      description: 'Join via voice/video channel',
      icon: MessageCircle,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    }
  ]

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center"
      >
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">Attendance Mode Selected!</h3>
        <p className="text-green-700">
          You've selected <strong>{selectedMode}</strong> attendance for this session.
        </p>
        <p className="text-sm text-green-600 mt-2">
          Check your phone/email for confirmation and joining details.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">How would you like to attend?</h3>
        <p className="text-gray-600">
          Select your preferred attendance method for {sessionDate} at {sessionTime}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {modes.map((mode) => {
          const Icon = mode.icon
          const isSelected = selectedMode === mode.id
          const isDisabled = isSubmitting
          
          return (
            <motion.button
              key={mode.id}
              onClick={() => handleModeSelection(mode.id as 'in-person' | 'jitsi' | 'discord')}
              disabled={isDisabled}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 ${mode.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{mode.title}</h4>
                </div>
              </div>
              <p className="text-sm text-gray-600">{mode.description}</p>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="h-4 w-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {isSubmitting && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Processing your selection...</p>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        <p>You can change your selection up to 2 hours before class starts.</p>
      </div>
    </div>
  )
}
