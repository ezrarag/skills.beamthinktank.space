'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Clock, Users, Star, Filter, Search, Heart, ArrowRight, Lightbulb, ExternalLink, ChevronDown, ChevronUp, Brain, Calendar, Award, LogIn, UserPlus, Hammer, BarChart3, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Toast from '../components/Toast'

const categories = [
  'All',
  'Technology',
  'Transportation',
  'Transportation Innovation',
  'Community Skills',
  'Health & Wellness',
  'Arts & Music',
  'Business & Finance',
  'Real Estate',
  'Digital Finance',
  'Manufacturing'
]

const courses = [
  {
    id: 1,
    title: "Intro to Tech for All Ages",
    description: "Learn the basics of computers, phones, and the internet. Build confidence using email, Zoom, and everyday apps safely.",
    category: "Technology",
    price: "Free (unlocked through community donations)",
    duration: "6 weeks (1.5 hrs / session)",
    students: 0,
    rating: 4.9,
    instructor: "BEAM Skills Volunteer Team",
    level: "Beginner",
    featured: true,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/home/pexels-kampus-7983573.jpg", // Placeholder for tech course image
    videoUrl: null
  },
  {
    id: 2,
    title: "Intro to Car Maintenance & Repair",
    description: "Hands-on introduction to car systems, safety checks, and basic repair skills. Includes community service car clinic.",
    category: "Transportation",
    price: "Free (unlocked through community donations)",
    duration: "8 weeks (2 hrs / session)",
    students: 0,
    rating: 4.8,
    instructor: "BEAM Skills Volunteer Mechanics",
    level: "Beginner",
    featured: true,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-daniel-andraski-197681005-13065692.jpg", // Placeholder for car maintenance image
    videoUrl: null
  },
  {
    id: 3,
    title: "Orchestra Repertoire for Beginners",
    description: "A welcoming introduction to orchestral music for beginners. Learn how to explore, prepare, and perform standard orchestra repertoire. Students will be guided through essential resources, performance history, technical lessons, and rehearsal prep skills to build a solid foundation in orchestral playing.",
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    duration: "16 weeks (1.5 hrs / session)",
    students: 0,
    rating: 4.7,
    instructor: "BEAM Skills Music Volunteers",
    level: "Beginner",
    featured: true,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-tima-miroshnichenko-6671694.jpg", // Placeholder for orchestra image
    videoUrl: null
  },
  {
    id: 4,
    title: "Planting & Houseplants: Community Green Skills",
    description: "Learn plant care, propagation, and community gardening. Create mini community garden projects and care for at least 3 plants.",
    category: "Community Skills",
    price: "Free (unlocked through community donations)",
    duration: "8 weeks (1.5 hrs / session)",
    students: 0,
    rating: 4.6,
    instructor: "Local Practitioner / Beginner-friendly Mentor",
    level: "Beginner",
    featured: false,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-zen-chung-5529587.jpg", // Placeholder for planting course image
    videoUrl: null,
    location: "Cleveland Ave Library",
    startDate: "2024-09-10",
    endDate: "2024-11-05",
    classTime: "Tuesdays, 6:00 PM - 7:30 PM"
  },
  {
    id: 5,
    title: "Emergency & Proactive Health Skills",
    description: "Learn CPR, first aid, home remedies, and preventive care. Practice emergency response skills and basic medical procedures.",
    category: "Health & Wellness",
    price: "Free (unlocked through community donations)",
    duration: "10 weeks (2 hrs / session)",
    students: 0,
    rating: 4.8,
    instructor: "Certified Healthcare Professional",
    level: "Beginner",
    featured: false,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-duy-tan-d-i-h-c-842966226-30902100.jpg", // Placeholder for health skills image
    videoUrl: null,
    location: "Cleveland Ave Library",
    startDate: "2024-09-11",
    endDate: "2024-11-13",
    classTime: "Wednesdays, 6:00 PM - 8:00 PM"
  },
  {
    id: 6,
    title: "Audio Recording & Production",
    description: "Master audio gear, recording setups, mixing, and mastering. Complete a full recording project with professional guidance.",
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    duration: "12 weeks (2 hrs / session)",
    students: 0,
    rating: 4.5,
    instructor: "Audio Engineer / Advanced Musician",
    level: "Intermediate",
    featured: false,
    imageUrl: "/images/courses/audio-recording.jpg", // Placeholder for audio recording image
    videoUrl: null,
    location: "Cleveland Ave Library",
    startDate: "2024-09-12",
    endDate: "2024-12-05",
    classTime: "Thursdays, 6:00 PM - 8:00 PM"
  },
  {
    id: 7,
    title: "Band Instruments – Multi-Genre Training",
    description: "Learn strings, brass, percussion, and woodwinds across jazz, classical, and contemporary genres. Perform in ensemble showcases.",
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    duration: "14 weeks (1.5 hrs / session)",
    students: 0,
    rating: 4.7,
    instructor: "Experienced Musician / Mentor",
    level: "Beginner",
    featured: false,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-dean-fugate-579564645-17028509.jpg", // Placeholder for band instruments image
    videoUrl: null,
    location: "Cleveland Ave Library",
    startDate: "2024-09-13",
    endDate: "2024-12-20",
    classTime: "Fridays, 6:00 PM - 7:30 PM"
  },
  {
    id: 8,
    title: "Voice Training – Multi-Genre",
    description: "Master breath control, pitch, tone, and diction across classical, jazz, and contemporary styles. Perform in public showcases.",
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    duration: "12 weeks (1.5 hrs / session)",
    students: 0,
    rating: 4.6,
    instructor: "Vocal Coach / Mentor",
    level: "Beginner",
    featured: false,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-cristian-rojas-7586662.jpg", // Placeholder for voice training image
    videoUrl: null,
    location: "Cleveland Ave Library",
    startDate: "2024-09-14",
    endDate: "2024-12-07",
    classTime: "Saturdays, 10:00 AM - 11:30 AM"
  },
  {
    id: 9,
    title: "Community Beautification & Design",
    description: "Learn urban aesthetics, public space design, and DIY skills. Complete small-scale public beautification projects.",
    category: "Community Skills",
    price: "Free (unlocked through community donations)",
    duration: "10 weeks (2 hrs / session)",
    students: 0,
    rating: 4.5,
    instructor: "Local Designer / Advanced Participant",
    level: "Beginner",
    featured: false,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-rstephens-33501308.jpg", // Placeholder for beautification image
    videoUrl: null,
    location: "Cleveland Ave Library",
    startDate: "2024-09-15",
    endDate: "2024-11-17",
    classTime: "Sundays, 2:00 PM - 4:00 PM"
  },
  {
    id: 10,
    title: "Entrepreneurship & Business Building",
    description: "Master business planning, marketing, and scaling strategies. Create and present business plans to mentor panels.",
    category: "Business & Finance",
    price: "Free (unlocked through community donations)",
    duration: "12 weeks (2 hrs / session)",
    students: 0,
    rating: 4.7,
    instructor: "Experienced Entrepreneur / Business Mentor",
    level: "Intermediate",
    featured: false,
    imageUrl: "/images/courses/entrepreneurship.jpg", // Placeholder for entrepreneurship image
    videoUrl: null,
    location: "Cleveland Ave Library",
    startDate: "2024-09-16",
    endDate: "2024-12-09",
    classTime: "Mondays, 6:00 PM - 8:00 PM"
  },
  {
    id: 11,
    title: "Commercial Real Estate Acquisition & Development",
    description: "Learn commercial real estate fundamentals, investment strategies, and construction management. Analyze real properties.",
    category: "Real Estate",
    price: "Free (unlocked through community donations)",
    duration: "14 weeks (2.5 hrs / session)",
    students: 0,
    rating: 4.8,
    instructor: "Real Estate Developer / Finance Mentor",
    level: "Advanced",
    featured: false,
    imageUrl: "/images/courses/real-estate.jpg", // Placeholder for real estate image
    videoUrl: null,
    location: "Cleveland Ave Library",
    startDate: "2024-09-17",
    endDate: "2024-12-24",
    classTime: "Tuesdays, 6:00 PM - 8:30 PM"
  },
  {
    id: 12,
    title: "Cryptocurrency & Digital Finance",
    description: "Master crypto fundamentals, blockchain technology, and DeFi basics. Complete wallet creation and trading simulations.",
    category: "Digital Finance",
    price: "Free (unlocked through community donations)",
    duration: "10 weeks (2 hrs / session)",
    students: 0,
    rating: 4.6,
    instructor: "Crypto Professional / Fintech Mentor",
    level: "Intermediate",
    featured: false,
    imageUrl: "/images/courses/cryptocurrency.jpg", // Placeholder for crypto image
    videoUrl: null,
    location: "Cleveland Ave Library",
    startDate: "2024-09-18",
    endDate: "2024-11-20",
    classTime: "Wednesdays, 6:00 PM - 8:00 PM"
  },
  {
    id: 13,
    title: "Fabrication & Product Design",
    description: "Learn how to design and fabricate everyday products using modern tools like 3D printers, CNC machines, and textiles. Students will explore wearable tech concepts such as hybrid shoes with GPS tracking, custom clothing, and community-use devices. This course emphasizes how to build not just products, but also the tools for production.",
    category: "Manufacturing",
    price: "Free (unlocked through community donations)",
    duration: "14 weeks (2.5 hrs / session)",
    students: 0,
    rating: 4.7,
    instructor: "Product Design Engineer / Fabrication Specialist",
    level: "Intermediate",
    featured: true,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-kampus-7983552.jpg", // Placeholder for fabrication image
    videoUrl: null,
    location: "BEAM Innovation Lab",
    startDate: "2024-09-20",
    endDate: "2024-12-27",
    classTime: "Fridays, 6:00 PM - 8:30 PM"
  },
  {
    id: 14,
    title: "Automotive Design & Fabrication",
    description: "A hands-on workshop for designing and building new vehicles from the ground up. Unlike the car maintenance course, this class focuses on innovation: designing lightweight chassis, experimenting with hybrid or electric drivetrains, and fabricating components in-house.",
    category: "Transportation Innovation",
    price: "Free (unlocked through community donations)",
    duration: "16 weeks (3 hrs / session)",
    students: 0,
    rating: 4.8,
    instructor: "Automotive Engineer / Fabrication Expert",
    level: "Advanced",
    featured: true,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-daniel-andraski-197681005-13065692.jpg", // Placeholder for automotive design image
    videoUrl: null,
    location: "BEAM Automotive Workshop",
    startDate: "2024-09-21",
    endDate: "2025-01-11",
    classTime: "Saturdays, 9:00 AM - 12:00 PM"
  },
  {
    id: 15,
    title: "Juice & Food Manufacturing",
    description: "Learn how to design and operate small-scale juice and food manufacturing processes, from sourcing ingredients to packaging and community distribution.",
    category: "Manufacturing",
    price: "Free (unlocked through community donations)",
    duration: "12 weeks (2 hrs / session)",
    students: 0,
    rating: 4.7,
    instructor: "Food Safety Specialist / Manufacturing Expert",
    level: "Beginner",
    featured: false,
    imageUrl: "https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-kampus-7983552.jpg", // Placeholder for food manufacturing image
    videoUrl: null,
    location: "BEAM Food Lab",
    startDate: "2024-09-22",
    endDate: "2024-12-15",
    classTime: "Sundays, 2:00 PM - 4:00 PM"
  }
]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [priceFilter, setPriceFilter] = useState(['Free (Community Funded)', 'Sponsored Programs'])
  const [levelFilter, setLevelFilter] = useState(['Beginner', 'Intermediate', 'Advanced'])
  const [expandedCard, setExpandedCard] = useState(null)
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([])
  const [enrolling, setEnrolling] = useState<number | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  // Check user authentication and fetch enrolled courses
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        // Fetch enrolled courses
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select('course_id')
          .eq('user_id', user.id)
          .in('status', ['confirmed', 'pending'])
        
        if (enrollments) {
          setEnrolledCourses(enrollments.map(e => e.course_id))
        }
      }
    }
    
    checkUser()
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = priceFilter.includes('Free (Community Funded)') || 
                        priceFilter.includes('Sponsored Programs')
    const matchesLevel = levelFilter.includes(course.level)
    
    return matchesCategory && matchesSearch && matchesPrice && matchesLevel
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'duration':
        return a.duration.localeCompare(b.duration)
      case 'level':
        return a.level.localeCompare(b.level)
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return b.rating - a.rating
    }
  })

  const handleEnroll = async (courseId: number) => {
    if (!user) {
      setToastMessage('Please sign in to enroll in courses')
      setToastType('error')
      setShowToast(true)
      return
    }

    setEnrolling(courseId)
    try {
      // Check if already enrolled
      if (enrolledCourses.includes(courseId)) {
        setToastMessage('You are already enrolled in this course')
        setToastType('error')
        setShowToast(true)
        return
      }

      // Create enrollment
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          status: 'pending',
          attendance_mode: 'in-person'
        })

      if (error) throw error

      // Update local state
      setEnrolledCourses(prev => [...prev, courseId])
      
      // Show success message
      setToastMessage('Successfully enrolled in course! Check your dashboard.')
      setToastType('success')
      setShowToast(true)

    } catch (error) {
      console.error('Enrollment error:', error)
      setToastMessage('Failed to enroll. Please try again.')
      setToastType('error')
      setShowToast(true)
    } finally {
      setEnrolling(null)
    }
  }

  const handlePriceFilterChange = (price) => {
    setPriceFilter(prev => 
      prev.includes(price) 
        ? prev.filter(p => p !== price)
        : [...prev, price]
    )
  }

  const handleLevelFilterChange = (level) => {
    setLevelFilter(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    )
  }

  const toggleCardExpansion = (courseId) => {
    setExpandedCard(expandedCard === courseId ? null : courseId)
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
            <h1 className="text-4xl md:text-6xl font-bold mb-0 mr-6">Browse Courses</h1>
            
            {/* Skills Dropdown Button */}
            <div className="relative">
              <motion.button
                onClick={toggleSkillsDropdown}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Hammer className="h-5 w-5" />
                <span className="font-satoshi">Courses</span>
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
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
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
                        <Link 
                          href="/login" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
                        >
                          <LogIn className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Sign In</span>
                        </Link>
                        
                        <Link 
                          href="/register" 
                          className="flex items-center space-x-3 px-3 py-3 text-[#7A3B3B] hover:text-[#6A2B2B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
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
            Find the perfect course to advance your skills and transform your career
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

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 mb-4">Pricing</h4>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="mr-3 text-primary-600 w-4 h-4"
                      checked={priceFilter.includes('Free (Community Funded)')}
                      onChange={() => handlePriceFilterChange('Free (Community Funded)')}
                    />
                    <span className="text-gray-700 group-hover:text-primary-600 transition-colors">Free (Community Funded)</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="mr-3 text-primary-600 w-4 h-4"
                      checked={priceFilter.includes('Sponsored Programs')}
                      onChange={() => handlePriceFilterChange('Sponsored Programs')}
                    />
                    <span className="text-gray-700 group-hover:text-primary-600 transition-colors">Sponsored Programs</span>
                  </label>
                </div>
              </div>

              {/* Level Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 mb-4">Level</h4>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="mr-3 text-primary-600 w-4 h-4"
                      checked={levelFilter.includes('Beginner')}
                      onChange={() => handleLevelFilterChange('Beginner')}
                    />
                    <span className="text-gray-700 group-hover:text-primary-600 transition-colors">Beginner</span>
                    </label>
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="mr-3 text-primary-600 w-4 h-4"
                      checked={levelFilter.includes('Intermediate')}
                      onChange={() => handleLevelFilterChange('Intermediate')}
                    />
                    <span className="text-gray-700 group-hover:text-primary-600 transition-colors">Intermediate</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="mr-3 text-primary-600 w-4 h-4"
                      checked={levelFilter.includes('Advanced')}
                      onChange={() => handleLevelFilterChange('Advanced')}
                    />
                    <span className="text-gray-700 group-hover:text-primary-600 transition-colors">Advanced</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Course Listings */}
          <div className="flex-1">
            {/* Search, Sort, and Show All */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12 text-lg"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-full sm:w-auto text-lg"
              >
                <option value="rating">Highest Rating</option>
                <option value="title">Alphabetical</option>
                <option value="duration">Duration</option>
                <option value="level">Level</option>
              </select>
              <button
                className="btn-secondary w-full sm:w-auto"
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                  setPriceFilter(['Free (Community Funded)', 'Sponsored Programs'])
                  setLevelFilter(['Beginner', 'Intermediate', 'Advanced'])
                }}
              >
                Show All
              </button>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-lg text-gray-600">
                Showing {sortedCourses.length} of {courses.length} courses
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {sortedCourses.map((course) => (
                <motion.div 
                  key={course.id} 
                  className="group cursor-pointer"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="card hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-primary-200 overflow-hidden"
                    layout
                    onClick={() => toggleCardExpansion(course.id)}
                  >
                    {/* Compact Card View (Profile Card Style) */}
                    <motion.div 
                      className="relative"
                      layout
                    >
                      {/* Course Image */}
                      <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-6 flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300 overflow-hidden">
                        {course.videoUrl ? (
                          <video 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            autoPlay 
                            muted 
                            loop
                            poster={course.imageUrl}
                          >
                            <source src={course.videoUrl} type="video/mp4" />
                          </video>
                        ) : course.imageUrl ? (
                          <img 
                            src={course.imageUrl} 
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <BookOpen className="h-20 w-20 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                        )}
                      </div>
                      
                      {/* Action Icons */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <motion.div 
                          className="w-10 h-10 bg-[#7A3B3B] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#6A2B2B] transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            // Navigate to enrollment page
                            window.location.href = `/enroll/${course.id}`
                          }}
                        >
                          <Lightbulb className="h-5 w-5 text-white" />
                        </motion.div>
                        <motion.div 
                          className="w-10 h-10 bg-[#7A3B3B] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#6A2B2B] transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            // Navigate to course detail page
                            window.location.href = `/courses/${course.id}`
                          }}
                        >
                          <ExternalLink className="h-5 w-5 text-white" />
                        </motion.div>
                      </div>
                      
                      {/* Course Info */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full">
                            {course.category}
                          </span>
                          <span className="text-sm text-gray-500 font-medium">{course.level}</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#7A3B3B] transition-colors">{course.title}</h3>
                        <p className="text-gray-600 mb-2 leading-relaxed text-lg line-clamp-2">{course.description}</p>
                        {/* Hidden content that shows on expansion */}
                        <AnimatePresence>
                          {expandedCard === course.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-3 mb-6">
                                <div className="flex items-center text-gray-600">
                                  <Star className="h-5 w-5 text-yellow-400 mr-3" />
                                  <span className="font-medium">{course.rating}</span>
                                  <span className="ml-2">(community pilot)</span>
                                </div>
                                
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-5 w-5 text-primary-600 mr-3" />
                                  <span>{course.duration}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-600">
                                  <Users className="h-5 w-5 text-primary-600 mr-3" />
                                  <span>{course.instructor}</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                      </div>
                      
                      {/* Expand Button */}
                      <div className="flex items-center justify-end">
                        <motion.button
                          className="flex items-center text-[#7A3B3B] font-semibold group-hover:text-[#6A2B2B] transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => { e.stopPropagation(); toggleCardExpansion(course.id) }}
                        >
                          {expandedCard === course.id ? (
                            <>
                              <span>Show Less</span>
                              <ChevronUp className="h-5 w-5 ml-2" />
                            </>
                          ) : (
                            <>
                              <span>Show More Details</span>
                              <ChevronDown className="h-5 w-5 ml-2" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedCard === course.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-200 pt-6 mt-6">
                            {/* Additional Course Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Course Details</h4>
                                <div className="space-y-2 text-sm text-gray-600">
                                  <div><strong>Location:</strong> {course.location || 'TBD'}</div>
                                  <div><strong>Start Date:</strong> {course.startDate || 'TBD'}</div>
                                  <div><strong>End Date:</strong> {course.endDate || 'TBD'}</div>
                                  <div><strong>Class Time:</strong> {course.classTime || 'TBD'}</div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">What You'll Learn</h4>
                                <ul className="space-y-1 text-sm text-gray-600">
                                  <li>• Practical skills for real-world application</li>
                                  <li>• Community-focused learning approach</li>
                                  <li>• Hands-on experience and projects</li>
                                  <li>• Professional mentorship and guidance</li>
                                </ul>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                              {enrolledCourses.includes(course.id) ? (
                                <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg border border-green-200 flex-1">
                                  <CheckCircle className="h-5 w-5" />
                                  <span className="font-medium">Enrolled</span>
                                </div>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleEnroll(course.id)
                                  }}
                                  disabled={enrolling === course.id}
                                  className="btn-primary flex-1 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {enrolling === course.id ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
                                      Enrolling...
                                    </>
                                  ) : (
                                    'Enroll Now'
                                  )}
                                </button>
                              )}
                              <Link 
                                href={`/courses/${course.id}`}
                                className="btn-secondary flex-1 text-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Details
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {sortedCourses.length === 0 && (
              <div className="text-center py-20">
                <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No courses found</h3>
                <p className="text-lg text-gray-600 mb-8">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('All')
                    setSearchQuery('')
                    setPriceFilter(['Free (Community Funded)'])
                    setLevelFilter(['Beginner'])
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
      
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={4000}
      />
    </div>
  )
}
