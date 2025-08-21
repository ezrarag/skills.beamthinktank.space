'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Users, MapPin, Calendar, CheckCircle, Phone, Mail, User } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: "Intro to Tech for All Ages",
    category: "Technology",
    duration: "6 weeks (1.5 hrs / session)",
    instructor: "BEAM Skills Volunteer Team",
    location: "Community Center - Room A",
    startDate: "February 15, 2024",
    endDate: "March 28, 2024",
    classTime: "Thursdays, 10:00 AM - 11:30 AM",
    maxStudents: 15,
    enrolledStudents: 8
  },
  {
    id: 2,
    title: "Intro to Car Maintenance & Repair",
    category: "Transportation",
    duration: "8 weeks (2 hrs / session)",
    instructor: "BEAM Skills Volunteer Mechanics",
    location: "Auto Shop - Bay 3",
    startDate: "February 16, 2024",
    endDate: "April 5, 2024",
    classTime: "Fridays, 2:00 PM - 4:00 PM",
    maxStudents: 12,
    enrolledStudents: 6
  },
  {
    id: 3,
    title: "Orchestra Repertoire for Beginners",
    category: "Community Skills",
    duration: "16 weeks (1.5 hrs / session)",
    instructor: "BEAM Skills Music Volunteers",
    location: "Library - Music Room",
    startDate: "February 17, 2024",
    endDate: "June 8, 2024",
    classTime: "Sundays, 1:00 PM - 2:30 PM",
    maxStudents: 20,
    enrolledStudents: 3
  }
]

export default function EnrollmentPage({ params }: { params: { courseId: string } }) {
  const course = courses.find(c => c.id === parseInt(params.courseId))
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    specialNeeds: '',
    agreeToTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The course you're trying to enroll in doesn't exist.</p>
          <Link href="/courses" className="btn-primary">
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the data to your backend
    // and integrate with an SMS service like Twilio
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Enrollment Successful!</h1>
          <p className="text-lg text-gray-600 mb-6">
            You've been successfully enrolled in <strong>{course.title}</strong>.
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Next Steps:</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Check your phone for a confirmation text message
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Check your email for course details and materials
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Arrive 10 minutes early for your first class
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <Link href="/courses" className="btn-secondary w-full">
              Browse More Courses
            </Link>
            <Link href="/schedule" className="btn-primary w-full">
              View Class Schedule
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Enroll in Course</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Complete your registration for {course.title}
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Course Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Details</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <BookOpen className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="font-medium">{course.title}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 text-primary-600 mr-3" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{course.startDate} - {course.endDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{course.classTime}</span>
                </div>
              </div>
              
              <div className="bg-primary-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  {course.maxStudents - course.enrolledStudents}
                </div>
                <div className="text-sm text-primary-700">Spots Remaining</div>
              </div>
            </div>
          </div>

          {/* Enrollment Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Registration Form</h2>
              
              {/* Quick Login Options */}
              <div className="mb-8">
                <div className="text-center mb-4">
                  <p className="text-gray-600">Sign up quickly with your existing account</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // TODO: Integrate with Supabase Google Auth
                    console.log('Google login clicked - integrate with Supabase')
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or register manually</span>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter your phone number"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        We'll send a confirmation text to this number
                      </p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter emergency contact name"
                      />
                    </div>
                    <div>
                      <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter emergency contact phone"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Needs */}
                <div>
                  <label htmlFor="specialNeeds" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Needs or Accommodations
                  </label>
                  <textarea
                    id="specialNeeds"
                    name="specialNeeds"
                    rows={3}
                    value={formData.specialNeeds}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Please let us know if you need any accommodations or have special requirements"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary-600 hover:text-primary-700 underline">
                      Terms and Conditions
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                      Privacy Policy
                    </Link>
                    . I understand that this is a community-funded program and I commit to attending all sessions.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing Enrollment...' : 'Complete Enrollment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
