'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, MapPin, Filter, ChevronLeft, ChevronRight, Heart, ArrowRight, ChevronDown, ChevronUp, Brain, BookOpen, Award, LogIn, UserPlus, Hammer, BarChart3 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

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
  },
  {
    id: 17,
    course: "Fabrication & Product Design",
    instructor: "Product Design Engineer / Fabrication Specialist",
    date: "2024-09-20",
    time: "6:00 PM - 8:30 PM",
    duration: 2.5,
    location: "BEAM Innovation Lab",
    maxStudents: 12,
    enrolledStudents: 0,
    category: "Manufacturing",
    price: "Free (unlocked through community donations)",
    featured: true,
          courseId: 17
  },
  {
    id: 5,
    course: "Automotive Design & Fabrication",
    instructor: "Automotive Engineer / Fabrication Expert",
    date: "2024-09-21",
    time: "9:00 AM - 12:00 PM",
    duration: 3,
    location: "BEAM Automotive Workshop",
    maxStudents: 10,
    enrolledStudents: 0,
    category: "Transportation Innovation",
    price: "Free (unlocked through community donations)",
    featured: true,
          courseId: 5
  },
  {
    id: 16,
    course: "Juice & Food Manufacturing",
    instructor: "Food Safety Specialist / Manufacturing Expert",
    date: "2024-09-22",
    time: "2:00 PM - 4:00 PM",
    duration: 2,
    location: "BEAM Food Lab",
    maxStudents: 15,
    enrolledStudents: 0,
    category: "Manufacturing",
    price: "Free (unlocked through community donations)",
    featured: false,
          courseId: 16
  },
  {
    id: 18,
    course: "Beginning French & Creole",
    instructor: "Language & Culture Specialist",
    date: "2024-09-23",
    time: "6:00 PM - 7:30 PM",
    duration: 1.5,
    location: "BEAM Language Lab",
    maxStudents: 20,
    enrolledStudents: 0,
    category: "Languages",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 18
  },
  {
    id: 19,
    course: "Beginning Architecture",
    instructor: "Architectural Designer / Urban Planner",
    date: "2024-09-24",
    time: "6:00 PM - 8:00 PM",
    duration: 2,
    location: "BEAM Design Studio",
    maxStudents: 15,
    enrolledStudents: 0,
    category: "Design & Built Environment",
    price: "Free (unlocked through community donations)",
    featured: true,
    courseId: 19
  },
  {
    id: 20,
    course: "Beginning Drawing",
    instructor: "Visual Artist / Art Educator",
    date: "2024-09-25",
    time: "6:00 PM - 7:30 PM",
    duration: 1.5,
    location: "BEAM Art Studio",
    maxStudents: 18,
    enrolledStudents: 0,
    category: "Visual Arts",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 20
  },
  {
    id: 21,
    course: "Beginning Interior Design",
    instructor: "Interior Designer / Sustainability Specialist",
    date: "2024-09-26",
    time: "6:00 PM - 8:00 PM",
    duration: 2,
    location: "BEAM Design Studio",
    maxStudents: 16,
    enrolledStudents: 0,
    category: "Design & Built Environment",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 21
  },
  {
    id: 22,
    course: "Real Estate Attorney Law",
    instructor: "Real Estate Attorney / Legal Educator",
    date: "2024-09-27",
    time: "6:00 PM - 8:30 PM",
    duration: 2.5,
    location: "BEAM Legal Center",
    maxStudents: 12,
    enrolledStudents: 0,
    category: "Legal & Governance",
    price: "Free (unlocked through community donations)",
    featured: true,
    courseId: 22
  },
  {
    id: 23,
    course: "Governance",
    instructor: "Governance Specialist / Civic Educator",
    date: "2024-09-28",
    time: "10:00 AM - 12:00 PM",
    duration: 2,
    location: "BEAM Civic Center",
    maxStudents: 20,
    enrolledStudents: 0,
    category: "Leadership & Civic Studies",
    price: "Free (unlocked through community donations)",
    featured: true,
    courseId: 23
  },
  {
    id: 24,
    course: "Accounting",
    instructor: "Certified Accountant / Financial Educator",
    date: "2024-09-29",
    time: "2:00 PM - 4:00 PM",
    duration: 2,
    location: "BEAM Financial Center",
    maxStudents: 18,
    enrolledStudents: 0,
    category: "Finance & Productivity",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 24
  },
  {
    id: 25,
    course: "Collaborative Piano: Introduction to Accompaniment",
    instructor: "Professional Collaborative Pianist / Music Educator",
    date: "2024-09-15",
    time: "3:00 PM - 4:30 PM",
    duration: 1.5,
    location: "BEAM Music Studio",
    maxStudents: 12,
    enrolledStudents: 0,
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    featured: false,
    courseId: 25
  },
  {
    id: 26,
    course: "International Construction & Sustainable Development",
    instructor: "Construction Professional / International Development Specialist",
    date: "2024-10-01",
    time: "6:00 PM - 8:00 PM",
    duration: 2,
    location: "BEAM Innovation Lab",
    maxStudents: 15,
    enrolledStudents: 0,
    category: "Design & Built Environment",
    price: "Free (unlocked through community donations)",
    featured: true,
    courseId: 26
  },
  {
    id: 27,
    course: "Beautification & Entrepreneurship",
    instructor: "Beauty Industry Professional / Entrepreneurship Mentor",
    date: "2024-10-03",
    time: "6:00 PM - 8:00 PM",
    duration: 2,
    location: "BEAM Community Hub",
    maxStudents: 15,
    enrolledStudents: 0,
    category: "Business & Finance",
    price: "Free (unlocked through community donations)",
    featured: true,
    courseId: 27
  }
]

const categories = ['All', 'Technology', 'Transportation', 'Transportation Innovation', 'Community Skills', 'Health & Wellness', 'Arts & Music', 'Business & Finance', 'Real Estate', 'Digital Finance', 'Manufacturing', 'Languages', 'Design & Built Environment', 'Visual Arts', 'Legal & Governance', 'Leadership & Civic Studies', 'Finance & Productivity']

export default function SchedulePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDate, setSelectedDate] = useState('')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'calendar'
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [user, setUser] = useState<any>(null)

  // Check user authentication
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
    }
    
    checkUser()
  }, [])

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
                <Hammer className="h-5 w-5" />
                <span className="font-satoshi">Schedule</span>
                <motion.div
                  animate={{ rotate: isSkillsDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
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
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <BookOpen className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Courses</span>
                        </Link>
                        
                        <Link 
                          href="/instructors" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <Users className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Instructors</span>
                        </Link>
                        
                        <Link 
                          href="/schedule" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <Calendar className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Schedule</span>
                        </Link>
                        
                        <Link 
                          href="/certifications" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <Award className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Certifications</span>
                        </Link>
                        
                        <Link 
                          href="/dashboard" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <BarChart3 className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Dashboard</span>
                        </Link>
                      </div>
                      
                      {/* Divider */}
                      <div className="border-t border-gray-200 my-2" />
                      
                      {/* Auth Links */}
                      <div className="px-4 py-2">
                        {user ? (
                          <button
                            onClick={async () => {
                              await supabase.auth.signOut()
                              window.location.href = '/'
                            }}
                            className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 w-full text-left"
                          >
                            <LogIn className="h-5 w-5" />
                            <span className="font-satoshi font-medium">Sign Out</span>
                          </button>
                        ) : (
                          <>
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
                          </>
                        )}
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
                            <Link href={`/login?next=/enroll/${item.courseId}`} className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
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
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Calendar View</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => {
                          setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <h4 className="text-lg font-medium text-gray-700">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h4>
                      <button
                        onClick={() => {
                          setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center text-sm font-semibold text-gray-600 bg-gray-50 rounded-lg">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const firstOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
                    const start = new Date(firstOfMonth)
                    start.setDate(start.getDate() - start.getDay())
                    const cells = [] as JSX.Element[]
                    for (let i = 0; i < 42; i++) {
                      const date = new Date(start)
                      date.setDate(start.getDate() + i)
                      const dateString = date.toISOString().split('T')[0]
                      const daySchedule = scheduleData.filter(item => item.date === dateString)
                      const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
                      cells.push(
                        <div
                          key={i}
                          className={`relative min-h-[90px] p-2 border border-gray-200 rounded-lg ${
                            isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                          }`}
                        >
                          <div className="text-sm font-medium">{date.getDate()}</div>
                          {daySchedule.length > 0 && (
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-500" />
                          )}
                          <div className="mt-1 space-y-1">
                            {daySchedule.length > 0 && (
                              <div className="text-[10px] p-1 bg-primary-100 text-primary-700 rounded">
                                {daySchedule.length} class{daySchedule.length > 1 ? 'es' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    }
                    return cells
                  })()}
                </div>
                
                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3">Legend</h5>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary-100 rounded mr-2"></div>
                      <span>Class Scheduled</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-100 rounded mr-2"></div>
                      <span>Other Month</span>
                    </div>
                  </div>
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
