'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useLocation } from '../components/LocationProvider'
import { 
  Brain, 
  Users, 
  Building2, 
  ArrowLeft, 
  MapPin,
  ChevronDown,
  Hammer,
  BookOpen,
  Calendar,
  Award,
  BarChart3,
  LogIn,
  UserPlus,
  GraduationCap
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function RegisterPage() {
  const { city, isLocationEnabled } = useLocation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  const closeDropdown = () => setIsDropdownOpen(false)

  const handleGoogleLogin = async (userType: 'participant' | 'partner' | 'community') => {
    setLoading(userType)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/register/callback?type=${userType}`
        }
      })
      
      if (error) {
        console.error('Error signing in:', error)
        alert('Error signing in. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error signing in. Please try again.')
    } finally {
      setLoading(null)
    }
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
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-[#7A3B3B] font-satoshi">BEAM</span>
                {isLocationEnabled && city && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2 text-[#7A3B3B] font-medium"
                  >
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{city}</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right - Navigation Dropdown */}
            <div className="relative">
              <motion.button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-[#7A3B3B] hover:bg-white/30 transition-all duration-200 font-satoshi"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Hammer className="h-5 w-5" />
                <span className="font-satoshi">Menu</span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                      onClick={closeDropdown}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-2">
                        <Link
                          href="/"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={closeDropdown}
                        >
                          <Hammer className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Home</span>
                        </Link>
                        <Link
                          href="/courses"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={closeDropdown}
                        >
                          <BookOpen className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Courses</span>
                        </Link>
                        <Link
                          href="/instructors"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={closeDropdown}
                        >
                          <Users className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Instructors</span>
                        </Link>
                        <Link
                          href="/schedule"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={closeDropdown}
                        >
                          <Calendar className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Schedule</span>
                        </Link>
                        <Link
                          href="/certifications"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={closeDropdown}
                        >
                          <Award className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Certifications</span>
                        </Link>
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={closeDropdown}
                        >
                          <BarChart3 className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Dashboard</span>
                        </Link>
                        <Link
                          href="/qr"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={closeDropdown}
                        >
                          <Calendar className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Scan QR</span>
                        </Link>
                      </div>

                      <div className="border-t border-gray-200 my-2" />

                      <div className="px-4 py-2">
                        <Link
                          href="/partners"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={closeDropdown}
                        >
                          <Building2 className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Partners</span>
                        </Link>
                        <Link
                          href="/login"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={closeDropdown}
                        >
                          <LogIn className="h-5 w-5" />
                          <span className="font-satoshi font-medium">Sign In</span>
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

      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-[#7A3B3B]/10 to-[#6A2B2B]/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-8">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-[#7A3B3B] hover:text-[#6A2B2B] transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-satoshi font-medium">Back to Home</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-normal text-[#7A3B3B] mb-6 leading-tight font-satoshi">
              Join BEAM
            </h1>
            <p className="text-lg text-[#7A3B3B]/80 max-w-3xl mx-auto font-satoshi">
              Choose how you'd like to get involved with our community skill-building platform
            </p>
          </div>
        </div>
      </section>

      {/* Registration Options */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* BEAM Participants */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#7A3B3B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-8 w-8 text-[#7A3B3B]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#7A3B3B] mb-4 font-satoshi">
                  BEAM Participants
                </h3>
                <p className="text-gray-600 mb-6 font-satoshi">
                  Already enrolled in BEAM courses? Sign in to access your learning dashboard, track progress, and manage your skill development journey.
                </p>
                <motion.button
                  onClick={() => handleGoogleLogin('participant')}
                  disabled={loading === 'participant'}
                  className="w-full bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg font-satoshi disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading === 'participant' ? 1 : 1.02 }}
                  whileTap={{ scale: loading === 'participant' ? 1 : 0.98 }}
                >
                  {loading === 'participant' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In to Dashboard'
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Partner Institutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#7A3B3B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-[#7A3B3B]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#7A3B3B] mb-4 font-satoshi">
                  Partner Institutions
                </h3>
                <p className="text-gray-600 mb-6 font-satoshi">
                  Represent a library, community center, or educational institution? Apply to become a partner and host BEAM courses at your location.
                </p>
                <motion.button
                  onClick={() => handleGoogleLogin('partner')}
                  disabled={loading === 'partner'}
                  className="w-full bg-white border-2 border-[#7A3B3B] text-[#7A3B3B] hover:bg-[#7A3B3B] hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg font-satoshi disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading === 'partner' ? 1 : 1.02 }}
                  whileTap={{ scale: loading === 'partner' ? 1 : 0.98 }}
                >
                  {loading === 'partner' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-[#7A3B3B] border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Apply to Partner'
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Community Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#7A3B3B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserPlus className="h-8 w-8 text-[#7A3B3B]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#7A3B3B] mb-4 font-satoshi">
                  Community Members
                </h3>
                <p className="text-gray-600 mb-6 font-satoshi">
                  New to BEAM? Create an account to explore courses, track your learning progress, and join our community of skill builders.
                </p>
                <motion.button
                  onClick={() => handleGoogleLogin('community')}
                  disabled={loading === 'community'}
                  className="w-full bg-gradient-to-r from-[#7A3B3B] to-[#6A2B2B] hover:from-[#6A2B2B] hover:to-[#5A1B1B] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg font-satoshi disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading === 'community' ? 1 : 1.02 }}
                  whileTap={{ scale: loading === 'community' ? 1 : 0.98 }}
                >
                  {loading === 'community' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </div>
            </motion.div>

          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-[#7A3B3B]/5 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-[#7A3B3B] mb-4 font-satoshi">
                Why Choose Google Sign-In?
              </h3>
              <p className="text-gray-600 font-satoshi">
                We use Google authentication for secure, fast, and convenient access. Your account is protected with industry-standard security, 
                and you can sign in with just one click. No need to remember another password!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
