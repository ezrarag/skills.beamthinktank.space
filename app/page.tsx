'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ChevronDown, ChevronUp, BookOpen, Users, Calendar, Award, LogIn, UserPlus, X, Hammer, BarChart3, MapPin, MapPinOff } from 'lucide-react'
import { useLocation } from './components/LocationProvider'

export default function HomePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { city, isLocationEnabled, enableLocation, disableLocation } = useLocation()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF] via-[#FAFAFA] to-[#FFFFFF]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left - Skill Icon and City */}
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-[#7A3B3B]" />
              {isLocationEnabled && city && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 text-[#7A3B3B] font-medium"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{city}</span>
                </motion.div>
              )}
            </div>
            
            {/* Right - Dropdown Button */}
            <div className="relative">
              <motion.button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Hammer className="h-5 w-5" />
                <span className="font-satoshi">Home</span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={closeDropdown}
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
                          onClick={closeDropdown}
                        >
                          <BookOpen className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Courses</span>
                        </Link>
                        
                        <Link 
                          href="/instructors" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeDropdown}
                        >
                          <Users className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Instructors</span>
                        </Link>
                        
                        <Link 
                          href="/schedule" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeDropdown}
                        >
                          <Calendar className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Schedule</span>
                        </Link>
                        
                        <Link 
                          href="/certifications" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeDropdown}
                        >
                          <Award className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Certifications</span>
                        </Link>
                        
                        <Link 
                          href="/dashboard" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B] hover:text-white rounded-xl transition-all duration-200"
                          onClick={closeDropdown}
                        >
                          <BarChart3 className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Dashboard</span>
                        </Link>
                        <Link 
                          href="/qr" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B] hover:text-white rounded-xl transition-all duration-200"
                          onClick={closeDropdown}
                        >
                          <Calendar className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Scan QR</span>
                        </Link>
                        <Link 
                          href="/partners" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B] hover:text-white rounded-xl transition-all duration-200"
                          onClick={closeDropdown}
                        >
                          <Users className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Partners</span>
                        </Link>
                      </div>
                      
                      {/* Divider */}
                      <div className="border-t border-gray-200 my-2" />
                      
                      {/* Auth Links */}
                      <div className="px-4 py-2">
                        <Link 
                          href="/login" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B] hover:text-white rounded-xl transition-all duration-200"
                          onClick={closeDropdown}
                        >
                          <LogIn className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Sign In</span>
                        </Link>
                        
                        <Link 
                          href="/register" 
                          className="flex items-center space-x-3 px-3 py-3 text-[#7A3B3B] hover:text-[#6A2B2B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeDropdown}
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block bg-[#7A3B3B]/20 text-[#7A3B3B] text-sm font-medium px-4 py-2 rounded-full font-satoshi backdrop-blur-sm">
                  PROFESSIONAL SKILLS TRAINING
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-normal text-[#7A3B3B] mb-8 leading-tight font-satoshi">
                Trade Skills..
                <span className="block text-[#6A2B2B]">Find yourself.</span>
              </h1>
              <p className="text-12 text-[#7A3B3B]/80 mb-10 leading-relaxed max-w-2xl font-satoshi">
                Free training across technology, trades, arts, and civic skills.
                From coding to car repair, from orchestra performance to understanding legislation — every course builds knowledge, confidence, and real-world pathways to certification.
                Certified participants can apply their skills in BEAM projects, products, and services that strengthen the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/courses" className="bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg font-satoshi">
                  Browse Courses
                </Link>
                
                {/* Location Button */}
                {!isLocationEnabled ? (
                  <motion.button
                    onClick={enableLocation}
                    className="relative bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg font-satoshi flex items-center space-x-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#9A5B5B] rounded-full p-1"></div>
                      <MapPin className="h-6 w-6 relative z-10" />
                    </div>
                    <span>Enable Location</span>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={disableLocation}
                    className="relative bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg font-satoshi flex items-center space-x-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#9A5B5B] rounded-full p-1"></div>
                      <MapPinOff className="h-6 w-6 relative z-10" />
                    </div>
                    <span>Disable Location</span>
                  </motion.button>
                )}
              </div>
            </div>
            
            {/* Right Column - Image with Overlays */}
            <div className="relative">
              <div className="relative rounded-3xl h-96 overflow-hidden">
                <img 
                  src="https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/Courses/Static%20Card%20assets/pexels-kampus-7983552.jpg"
                  alt="Students learning together in a supportive environment"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Labels */}
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                  <span className="text-[#7A3B3B] font-medium font-satoshi">Community</span>
                </div>
                <div className="absolute top-20 right-8 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                  <span className="text-[#7A3B3B] font-medium font-satoshi">Learn</span>
                </div>
                <div className="absolute bottom-20 left-12 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                  <span className="text-[#7A3B3B] font-medium font-satoshi">Earn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
