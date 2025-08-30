'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, MapPin, ArrowLeft, Building2, Phone, Mail, Globe, Send, CheckCircle, X } from 'lucide-react'
import { useLocation } from '../components/LocationProvider'
import Toast from '../components/Toast'

// Available courses for selection
const availableCourses = [
  "Intro to Tech for All Ages",
  "Intro to Car Maintenance & Repair",
  "Orchestra Repertoire for Beginners",
  "Planting & Houseplants: Community Green Skills",
  "Emergency & Proactive Health Skills",
  "Audio Recording & Production",
  "Band Instruments – Multi-Genre Training",
  "Voice Training – Multi-Genre",
  "Community Beautification & Design",
  "Entrepreneurship & Business Building"
]

// Available institutions for selection
const availableInstitutions = [
  "Cleveland Ave Library",
  "Community Center",
  "Downtown Library",
  "Westside Community Center",
  "Eastside Learning Hub",
  "Northside Cultural Center",
  "Southside Innovation Lab"
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    institutionName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    message: ''
  })
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const { city, isLocationEnabled } = useLocation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Submit to API
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          institutionName: formData.institutionName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          website: formData.website,
          message: formData.message,
          selectedCourses
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit application')
      }

      const result = await response.json()
      
      // Store partnership ID for reference
      localStorage.setItem('partnershipId', result.partnership.id)
      
      setIsSubmitted(true)
      setIsSubmitting(false)
      
      // Redirect to partner login after a short delay
      setTimeout(() => {
        window.location.href = '/partner-login'
      }, 3000)
      
    } catch (error) {
      console.error('Error submitting application:', error)
      setToastMessage(error instanceof Error ? error.message : 'Failed to submit application')
      setToastType('error')
      setShowToast(true)
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCourseToggle = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course) 
        ? prev.filter(c => c !== course)
        : [...prev, course]
    )
  }

  const handleInstitutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      institutionName: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFFF] via-[#FAFAFA] to-[#FFFFFF]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-[#7A3B3B] mb-4 font-satoshi">
              Partnership Complete!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-satoshi">
              Thank you for your partnership inquiry! We've received your information and will review the courses you'd like to offer. 
              Our team will get back to you within 2-3 business days to discuss next steps.
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/partners"
                className="inline-block bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                View Partners Page
              </Link>
              
              <Link 
                href="/"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ml-4"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF] via-[#FAFAFA] to-[#FFFFFF]">
      <Toast 
        isVisible={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7A3B3B]/10 to-[#6A2B2B]/10 py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-8">
            <Link 
              href="/partners"
              className="flex items-center space-x-2 text-[#7A3B3B] hover:text-[#6A2B2B] transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-satoshi font-medium">Back to Partners</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-normal text-[#7A3B3B] mb-6 leading-tight font-satoshi">
              Become a Partner
            </h1>
            <p className="text-lg text-[#7A3B3B]/80 max-w-3xl mx-auto font-satoshi">
              Join our network of community institutions and help us bring skill-building opportunities to more people. 
              Select the courses you'd like to offer and tell us about your institution.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#7A3B3B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-[#7A3B3B]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#7A3B3B] mb-2 font-satoshi">
              Partnership Application
            </h2>
            <p className="text-gray-600 font-satoshi">
              Tell us about your institution and select the courses you'd like to offer
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-satoshi">
                  Institution Name *
                </label>
                <select
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleInstitutionChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select an institution</option>
                  {availableInstitutions.map((institution) => (
                    <option key={institution} value={institution}>
                      {institution}
                    </option>
                  ))}
                  <option value="custom">Other (specify below)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-satoshi">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent transition-all duration-200"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Custom Institution Name (shown when "Other" is selected) */}
            {formData.institutionName === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-satoshi">
                  Custom Institution Name *
                </label>
                <input
                  type="text"
                  name="customInstitutionName"
                  onChange={(e) => setFormData(prev => ({ ...prev, institutionName: e.target.value }))}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your institution name"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-satoshi">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent transition-all duration-200"
                  placeholder="your.email@institution.org"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-satoshi">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent transition-all duration-200"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-satoshi">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent transition-all duration-200"
                placeholder="Full street address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-satoshi">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent transition-all duration-200"
                placeholder="https://www.institution.org"
              />
            </div>

            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 font-satoshi">
                Select Courses to Offer *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {availableCourses.map((course) => (
                  <label key={course} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course)}
                      onChange={() => handleCourseToggle(course)}
                      className="w-4 h-4 text-[#7A3B3B] focus:ring-[#7A3B3B] border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#7A3B3B] transition-colors">
                      {course}
                    </span>
                  </label>
                ))}
              </div>
              {selectedCourses.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Selected courses:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourses.map((course) => (
                      <span 
                        key={course}
                        className="inline-flex items-center space-x-1 bg-[#7A3B3B]/10 text-[#7A3B3B] px-3 py-1 rounded-full text-sm"
                      >
                        <span>{course}</span>
                        <button
                          type="button"
                          onClick={() => handleCourseToggle(course)}
                          className="ml-1 hover:bg-[#7A3B3B]/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-satoshi">
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent transition-all duration-200"
                placeholder="Tell us about your institution, available spaces, scheduling preferences, or any other details..."
              />
            </div>

            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting || selectedCourses.length === 0}
                className="w-full bg-[#7A3B3B] hover:bg-[#6A2B2B] disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg font-satoshi flex items-center justify-center space-x-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Complete Partnership</span>
                  </>
                )}
              </motion.button>
              
              {selectedCourses.length === 0 && (
                <p className="text-sm text-red-600 text-center mt-2">
                  Please select at least one course to continue
                </p>
              )}
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#7A3B3B] mb-4 font-satoshi">
                What We're Looking For
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-5 w-5 text-[#7A3B3B] mt-0.5" />
                  <div>
                    <strong>Accessible Locations</strong>
                    <p>Easy to reach by public transit and car</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Building2 className="h-5 w-5 text-[#7A3B3B] mt-0.5" />
                  <div>
                    <strong>Meeting Spaces</strong>
                    <p>Classrooms, conference rooms, or open areas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Globe className="h-5 w-5 text-[#7A3B3B] mt-0.5" />
                  <div>
                    <strong>Community Focus</strong>
                    <p>Institutions that serve diverse populations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
