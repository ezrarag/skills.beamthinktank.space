'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, MapPin, Filter, ChevronLeft, ChevronRight, Heart, ArrowRight, ChevronDown, ChevronUp, Brain, BookOpen, Award, LogIn, UserPlus } from 'lucide-react'

const scheduleData = [
  {
    id: 1,
    course: "Intro to Tech for All Ages",
    instructor: "BEAM Skills Volunteer Team",
    date: "2024-02-15",
    time: "10:00 AM - 11:30 AM",
    duration: 1.5,
    location: "Community Center - Room A",
    maxStudents: 15,
    enrolledStudents: 8,
    category: "Technology",
    price: "Free (unlocked through community donations)",
    featured: true,
    courseId: 1
  },
  {
    id: 2,
    course: "Intro to Car Maintenance & Repair",
    instructor: "BEAM Skills Volunteer Mechanics",
    date: "2024-02-16",
    time: "2:00 PM - 4:00 PM",
    duration: 2,
    location: "Auto Shop - Bay 3",
    maxStudents: 12,
    enrolledStudents: 6,
    category: "Transportation",
    price: "Free (unlocked through community donations)",
    featured: true,
    courseId: 2
  },
  {
    id: 3,
    course: "Orchestra Repertoire for Beginners",
    instructor: "BEAM Skills Music Volunteers",
    date: "2024-02-17",
    time: "1:00 PM - 2:30 PM",
    duration: 1.5,
    location: "Library - Music Room",
    maxStudents: 20,
    enrolledStudents: 3,
    category: "Community Skills",
    price: "Free (unlocked through community donations)",
    featured: true,
    courseId: 3
  },
  {
    id: 4,
    course: "Planting & Houseplants: Community Green Skills",
    instructor: "Local Practitioner / Beginner-friendly Mentor",
    date: "2024-09-10",
    time: "6:00 PM - 7:30 PM",
    duration: 1.5,
    location: "Cleveland Ave Library",
    maxStudents: 15,
    enrolledStudents: 0,
    category: "Community Skills",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 4
  },
  {
    id: 5,
    course: "Emergency & Proactive Health Skills",
    instructor: "Certified Healthcare Professional",
    date: "2024-09-11",
    time: "6:00 PM - 8:00 PM",
    duration: 2,
    location: "Cleveland Ave Library",
    maxStudents: 15,
    enrolledStudents: 0,
    category: "Health & Wellness",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 5
  },
  {
    id: 6,
    course: "Audio Recording & Production",
    instructor: "Audio Engineer / Advanced Musician",
    date: "2024-09-12",
    time: "6:00 PM - 8:00 PM",
    duration: 2,
    location: "Cleveland Ave Library",
    maxStudents: 12,
    enrolledStudents: 0,
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 6
  },
  {
    id: 7,
    course: "Band Instruments – Multi-Genre Training",
    instructor: "Experienced Musician / Mentor",
    date: "2024-09-13",
    time: "6:00 PM - 7:30 PM",
    duration: 1.5,
    location: "Cleveland Ave Library",
    maxStudents: 18,
    enrolledStudents: 0,
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 7
  },
  {
    id: 8,
    course: "Voice Training – Multi-Genre",
    instructor: "Vocal Coach / Mentor",
    date: "2024-09-14",
    time: "10:00 AM - 11:30 AM",
    duration: 1.5,
    location: "Cleveland Ave Library",
    maxStudents: 15,
    enrolledStudents: 0,
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 8
  },
  {
    id: 9,
    course: "Community Beautification & Design",
    instructor: "Local Designer / Advanced Participant",
    date: "2024-09-15",
    time: "2:00 PM - 4:00 PM",
    duration: 2,
    location: "Cleveland Ave Library",
    maxStudents: 15,
    enrolledStudents: 0,
    category: "Community Skills",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 9
  },
  {
    id: 10,
    course: "Entrepreneurship & Business Building",
    instructor: "Experienced Entrepreneur / Business Mentor",
    date: "2024-09-16",
    time: "6:00 PM - 8:00 PM",
    duration: 2,
    location: "Cleveland Ave Library",
    maxStudents: 15,
    enrolledStudents: 0,
    category: "Business & Finance",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 10
  },
  {
    id: 11,
    course: "Commercial Real Estate Acquisition & Development",
    instructor: "Real Estate Developer / Finance Mentor",
    date: "2024-09-17",
    time: "6:00 PM - 8:30 PM",
    duration: 2.5,
    location: "Cleveland Ave Library",
    maxStudents: 12,
    enrolledStudents: 0,
    category: "Real Estate",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 11
  },
  {
    id: 12,
    course: "Cryptocurrency & Digital Finance",
    instructor: "Crypto Professional / Fintech Mentor",
    date: "2024-09-18",
    time: "6:00 PM - 8:00 PM",
    duration: 2,
    location: "Cleveland Ave Library",
    maxStudents: 15,
    enrolledStudents: 0,
    category: "Digital Finance",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 12
  }
]

const categories = ['All', 'Technology', 'Transportation', 'Community Skills', 'Health & Wellness', 'Arts & Music', 'Business & Finance', 'Real Estate', 'Digital Finance']

export default function SchedulePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDate, setSelectedDate] = useState('')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'calendar'
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false)

  const filteredSchedule = scheduleData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesDate = !selectedDate || item.date === selectedDate
    return matchesCategory && matchesDate
  })

  const sortedSchedule = [...filteredSchedule].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getDateDisplay = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getTimeDisplay = (timeString: string) => {
    return timeString.split(' - ')[0]
  }

  const getAvailabilityStatus = (enrolled: number, max: number) => {
    const percentage = (enrolled / max) * 100
    if (percentage >= 90) return { status: 'Almost Full', color: 'text-red-600', bgColor: 'bg-red-100' }
    if (percentage >= 70) return { status: 'Limited', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
    return { status: 'Available', color: 'text-green-600', bgColor: 'bg-green-100' }
  }

  const toggleSkillsDropdown = () => {
    setIsSkillsDropdownOpen(!isSkillsDropdownOpen)
  }

  const closeSkillsDropdown = () => {
    setIsSkillsDropdownOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-0 mr-6">Class Schedule</h1>
            
            {/* Skills Dropdown Button */}
            <div className="relative">
              <motion.button
                onClick={toggleSkillsDropdown}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-satoshi">Schedule</span>
                <motion.div
                  animate={{ rotate: isSkillsDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.button>

              {/* Skills Dropdown Menu */}
              <AnimatePresence>
                {isSkillsDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={closeSkillsDropdown}
                    />
                    
                    {/* Dropdown Content */}
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50"
                    >
                      {/* Navigation Links */}
                      <div className="px-4 py-2">
                        <Link 
                          href="/courses" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <BookOpen className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Courses</span>
                        </Link>
                        
                        <Link 
                          href="/instructors" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <Users className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Instructors</span>
                        </Link>
                        
                        <Link 
                          href="/schedule" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <Calendar className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Schedule</span>
                        </Link>
                        
                        <Link 
                          href="/certifications" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <Award className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Certifications</span>
                        </Link>
                      </div>
                      
                      {/* Divider */}
                      <div className="border-t border-gray-200 my-2" />
                      
                      {/* Auth Links */}
                      <div className="px-4 py-2">
                        <Link 
                          href="/login" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <LogIn className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Sign In</span>
                        </Link>
                        
                        <Link 
                          href="/register" 
                          className="flex items-center space-x-3 px-3 py-3 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <UserPlus className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Get Started</span>
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            View upcoming classes and enroll in your preferred sessions to accelerate your learning journey
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Filter className="h-5 w-5 text-primary-600" />
                Filters
              </h3>
              
              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 mb-4">Category</h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-3 text-primary-600 focus:ring-primary-500 w-4 h-4"
                      />
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 mb-4">Date</h4>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-field"
                />
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate('')}
                    className="text-sm text-primary-600 hover:text-primary-700 mt-3 font-medium"
                  >
                    Clear date filter
                  </button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-4">View Mode</h4>
                <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-200 ${
                      viewMode === 'calendar'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-lg text-gray-600">
                Showing {sortedSchedule.length} of {scheduleData.length} scheduled classes
              </p>
            </div>

            {viewMode === 'list' ? (
              /* List View */
              <div className="space-y-6">
                {sortedSchedule.map((item) => {
                  const availability = getAvailabilityStatus(item.enrolledStudents, item.maxStudents)
                  return (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="card hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-primary-200 relative">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                              <Calendar className="h-10 w-10 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{item.course}</h3>
                                <p className="text-lg text-primary-600 font-medium">with {item.instructor}</p>
                              </div>
                              
                              <div className="flex items-center space-x-6 text-gray-600">
                                <div className="flex items-center">
                                  <Clock className="h-5 w-5 text-primary-600 mr-2" />
                                  <span className="font-medium">{item.time}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-5 w-5 text-primary-600 mr-2" />
                                  <span className="font-medium">{item.enrolledStudents}/{item.maxStudents}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-5 w-5 text-primary-600 mr-2" />
                                  <span className="font-medium">{item.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                              <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full">
                                {item.category}
                              </span>
                              <span className={`text-sm font-semibold px-3 py-2 rounded-full ${availability.bgColor} ${availability.color}`}>
                                {availability.status}
                              </span>
                              <span className="text-2xl font-bold text-green-600">{item.price}</span>
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0">
                            <Link href={`/enroll/${item.courseId}`} className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                              Enroll Now
                              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              /* Calendar View */
              <div className="card">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Calendar View</h3>
                  <p className="text-lg text-gray-600">Interactive calendar view coming soon...</p>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-12 text-center">
                  <Calendar className="h-20 w-20 text-primary-600 mx-auto mb-6" />
                  <p className="text-lg text-primary-700 font-medium">Interactive calendar view will be implemented here</p>
                </div>
              </div>
            )}

            {sortedSchedule.length === 0 && (
              <div className="text-center py-20">
                <Calendar className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No classes scheduled</h3>
                <p className="text-lg text-gray-600 mb-8">Try adjusting your filters or check back later for new schedules.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('All')
                    setSelectedDate('')
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
