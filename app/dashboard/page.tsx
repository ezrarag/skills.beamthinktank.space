'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import SetupGuide from '../components/SetupGuide'
import { removeCourseEnrollment } from '@/lib/courseManagement'
import { addToGoogleCalendar, createCourseCalendarEvent } from '@/lib/calendarIntegration'
import { 
  Brain, 
  BookOpen, 
  Users, 
  Calendar, 
  Award, 
  LogIn, 
  UserPlus, 
  Hammer,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Target,
  CheckCircle,
  PlayCircle,
  BarChart3,
  FileText,
  Settings,
  User,
  Bell,
  Search,
  HelpCircle
} from 'lucide-react'
import { useLocation } from '../components/LocationProvider'

interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
  joinDate: string
  totalCourses: number
  completedCourses: number
  inProgressCourses: number
  totalHours: number
  certificationCount: number
  currentStreak: number
  totalPoints: number
}

interface Course {
  id: number
  title: string
  instructor: string
  progress: number
  nextSession: string
  nextSessionTime: string
  location: string
  category: string
  status: string
  lastAccessed: string
}

interface Session {
  id: number
  course: string
  date: string
  time: string
  location: string
  instructor: string
}

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: string
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([])
  const [activeTab, setActiveTab] = useState('overview')
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isSetupGuideOpen, setIsSetupGuideOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { city, isLocationEnabled } = useLocation()

  const fetchUserData = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

                // Check for pending course enrollment from before login
        const pendingCourseId = localStorage.getItem('pendingCourseEnrollment')
        console.log('🔍 DEBUG: Pending course ID from localStorage:', pendingCourseId)
        
        // Check for just enrolled course from current session
        const justEnrolledCourseId = sessionStorage.getItem('justEnrolled')
        console.log('🔍 DEBUG: Just enrolled course ID from sessionStorage:', justEnrolledCourseId)
        console.log('🔍 DEBUG: User ID:', user.id)

        // Handle just enrolled course (from current session)
        if (justEnrolledCourseId) {
          console.log('🔍 DEBUG: Found just enrolled course:', justEnrolledCourseId)
          // We'll handle this after fetching the full course data
          // For now, just clear the session storage
          sessionStorage.removeItem('justEnrolled')
        }

        if (pendingCourseId) {
          try {
            console.log('🔍 DEBUG: Attempting to create enrollment for course:', pendingCourseId)
            console.log('🔍 DEBUG: Course ID type:', typeof pendingCourseId, 'Value:', pendingCourseId)
            
            // First, ensure user profile exists
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert({
                id: user.id,
                email: user.email,
                first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
                last_name: user.user_metadata?.full_name?.split(' ')[1] || '',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }, { onConflict: 'id' })

            if (profileError) {
              console.error('❌ ERROR: Profile creation failed:', profileError)
              throw profileError
            }

            // Create enrollment for the course that was selected before login
            const { data: enrollment, error: enrollError } = await supabase
              .from('enrollments')
              .insert({
                user_id: user.id,
                course_id: parseInt(pendingCourseId),
                status: 'pending'
              })
              .select()
              .single()
            
            if (enrollError) {
              console.error('❌ ERROR: Enrollment creation failed:', enrollError)
              console.error('❌ ERROR: Error details:', enrollError.message, enrollError.details, enrollError.hint)
              
              // Enhanced error handling: Check if course exists
              if (enrollError.code === '23503') { // Foreign key constraint violation
                console.error('❌ ERROR: Course ID does not exist in database:', pendingCourseId)
                // Clear invalid pending enrollment
                localStorage.removeItem('pendingCourseEnrollment')
              }
            } else if (enrollment) {
              console.log('✅ SUCCESS: Enrollment created successfully:', enrollment)
              console.log('✅ SUCCESS: Enrollment data:', enrollment)
              // Clear the pending enrollment from localStorage
              localStorage.removeItem('pendingCourseEnrollment')
              
              // Force refresh of enrollments after successful creation
              console.log('🔄 REFRESH: Forcing refresh of enrollments after successful creation...')
              // Immediately refresh enrollments to show the new course
              setTimeout(() => {
                refreshEnrollments()
              }, 1000) // Small delay to ensure database transaction is complete
            }
          } catch (enrollError) {
            console.error('❌ ERROR: Exception during enrollment creation:', enrollError)
          }
        }

        // Fetch all enrollments
        console.log('🔍 DEBUG: Fetching enrollments for user:', user.id)
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select(`
            *,
            courses (
              id,
              title,
              instructor,
              duration,
              category,
              location,
              start_date,
              end_date,
              class_time
            )
          `)
          .eq('user_id', user.id)
          .in('status', ['confirmed', 'pending'])
        
        if (enrollmentsError) {
          console.error('❌ ERROR: Failed to fetch enrollments:', enrollmentsError)
          console.error('❌ ERROR: Error details:', enrollmentsError.message, enrollmentsError.details, enrollmentsError.hint)
        } else {
          console.log('✅ SUCCESS: Fetched enrollments:', enrollments)
          console.log('🔍 DEBUG: Number of enrollments:', enrollments?.length || 0)
        }

        if (enrollments) {
          console.log('🔍 DEBUG: Processing enrollments:', enrollments)
          console.log('🔍 DEBUG: Number of enrollments:', enrollments.length)
          
          const courses = enrollments.map(enrollment => {
            const course = enrollment.courses
            console.log('🔍 DEBUG: Processing course from enrollment:', enrollment)
            console.log('🔍 DEBUG: Course data:', course)
            
            if (!course) {
              console.error('❌ ERROR: No course data in enrollment:', enrollment)
              return null
            }
            
            return {
              id: course.id,
              title: course.title,
              instructor: course.instructor,
              progress: Math.floor(Math.random() * 100), // Mock progress for now
              nextSession: course.start_date,
              nextSessionTime: course.class_time,
              location: course.location,
              category: course.category,
              status: 'in-progress',
              lastAccessed: new Date().toISOString().split('T')[0]
            }
          }).filter((course): course is Course => course !== null) // Remove null entries with proper typing
          
          console.log('✅ SUCCESS: Processed courses:', courses)
          console.log('✅ SUCCESS: Setting enrolledCourses state:', courses)
          setEnrolledCourses(courses)
          
          // Generate upcoming sessions
          const sessions = courses.map(course => ({
            id: course.id,
            course: course.title,
            date: course.nextSession,
            time: course.nextSessionTime,
            location: course.location,
            instructor: course.instructor
          }))
          setUpcomingSessions(sessions)
        } else {
          console.log('⚠️ WARNING: No enrollments found after processing')
        }

        // Set user data
        setUserData({
          id: user.id,
          name: profile?.first_name && profile?.last_name 
            ? `${profile.first_name} ${profile.last_name}` 
            : user.email?.split('@')[0] || 'User',
          email: user.email || '',
          avatar: profile?.avatar_url,
          joinDate: user.created_at,
          totalCourses: enrollments?.length || 0,
          completedCourses: 0, // TODO: Implement completion logic
          inProgressCourses: enrollments?.length || 0,
          totalHours: (enrollments?.length || 0) * 2, // Rough estimate
          certificationCount: 0, // TODO: Implement certification logic
          currentStreak: Math.floor(Math.random() * 10) + 1, // Mock for now
          totalPoints: (enrollments?.length || 0) * 150 // Mock points
        })
        
        console.log('User data set:', {
          totalCourses: enrollments?.length || 0,
          enrolledCourses: enrollments
        })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSettingsOpen) {
        setIsSettingsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSettingsOpen])

  const toggleSkillsDropdown = () => {
    setIsSkillsDropdownOpen(!isSkillsDropdownOpen)
  }

  const closeSkillsDropdown = () => {
    setIsSkillsDropdownOpen(false)
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 60) return 'text-yellow-600'
    if (progress >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-yellow-500'
    if (progress >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getSetupProgress = () => {
    if (!userData) return 0
    
    let completed = 0
    let total = 5 // Total setup tasks
    
    // Check profile completion (has real name, not just email)
    if (userData.name && userData.name !== userData.email?.split('@')[0]) completed++
    
    // Check phone number (we'll need to get this from profile)
    // For now, assume not completed
    
    // Check emergency contact (we'll need to get this from profile)
    // For now, assume not completed
    
    // Check course enrollment
    if (enrolledCourses.length > 0) completed++
    
    // Check attendance mode (has non-default attendance mode)
    // For now, assume not completed since we don't have attendance mode in Course interface
    const hasCustomAttendanceMode = false
    if (hasCustomAttendanceMode) completed++
    
    return Math.round((completed / total) * 100)
  }

  // Function to verify enrollments exist in database
  const verifyEnrollments = async () => {
    if (!userData) return
    
    try {
      console.log('🔍 VERIFY: Checking enrollments in database...')
      const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userData.id)
        .in('status', ['confirmed', 'pending'])
      
      if (error) {
        console.error('❌ VERIFY: Error checking enrollments:', error)
        return
      }
      
      console.log('✅ VERIFY: Database enrollments:', enrollments)
      console.log('✅ VERIFY: Local enrolledCourses:', enrolledCourses)
      
      // Check for mismatches
      const dbCourseIds = enrollments?.map(e => e.course_id) || []
      const localCourseIds = enrolledCourses.map(c => c.id)
      
      if (dbCourseIds.length !== localCourseIds.length) {
        console.warn('⚠️ VERIFY: Mismatch between database and local state')
        console.warn('⚠️ VERIFY: Database has', dbCourseIds.length, 'enrollments')
        console.warn('⚠️ VERIFY: Local state has', localCourseIds.length, 'courses')
      }
    } catch (error) {
      console.error('❌ VERIFY: Exception during verification:', error)
    }
  }

  // Function to refresh just the enrollments data
  const refreshEnrollments = async () => {
    if (!userData) return
    
    try {
      console.log('🔄 REFRESH: Fetching fresh enrollments...')
      const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (
            id,
            title,
            instructor,
            duration,
            category,
            location,
            start_date,
            end_date,
            class_time
          )
        `)
        .eq('user_id', userData.id)
        .in('status', ['confirmed', 'pending'])
      
      if (error) {
        console.error('❌ REFRESH: Error fetching enrollments:', error)
        return
      }
      
      console.log('✅ REFRESH: Fresh enrollments fetched:', enrollments)
      
      if (enrollments) {
        const courses = enrollments.map(enrollment => {
          const course = enrollment.courses
          if (!course) return null
          
          return {
            id: course.id,
            title: course.title,
            instructor: course.instructor,
            progress: Math.floor(Math.random() * 100),
            nextSession: course.start_date,
            nextSessionTime: course.class_time,
            location: course.location,
            category: course.category,
            status: 'in-progress',
            lastAccessed: new Date().toISOString().split('T')[0]
          }
        }).filter((course): course is Course => course !== null)
        
        console.log('✅ REFRESH: Setting new enrolledCourses:', courses)
        setEnrolledCourses(courses)
        
        // Update upcoming sessions
        const sessions = courses.map(course => ({
          id: course.id,
          course: course.title,
          date: course.nextSession,
          time: course.nextSessionTime,
          location: course.location,
          instructor: course.instructor
        }))
        setUpcomingSessions(sessions)
      }
    } catch (error) {
      console.error('❌ REFRESH: Exception during refresh:', error)
    }
  }

  const handleRemoveCourse = async (courseId: number) => {
    if (!userData) return
    
    try {
      console.log('🗑️ REMOVE: Removing course:', courseId)
      
      // Use the unified course management utility
      const success = await removeCourseEnrollment(userData.id, courseId)
      
      if (!success) {
        throw new Error('Failed to remove course enrollment')
      }

      // Update local state - remove the course from enrolledCourses
      setEnrolledCourses(prev => prev.filter(course => course.id !== courseId))
      
      // Update user data stats - ensure we don't go negative
      setUserData(prev => prev ? {
        ...prev,
        totalCourses: Math.max(0, prev.totalCourses - 1),
        inProgressCourses: Math.max(0, prev.inProgressCourses - 1),
        totalHours: Math.max(0, prev.totalHours - 2) // Rough estimate
      } : null)

      console.log('✅ REMOVE: Course removed successfully')
      
      // Force a complete refresh to ensure UI is in sync
      setTimeout(() => {
        fetchUserData()
      }, 100)
      
    } catch (error) {
      console.error('❌ REMOVE: Failed to remove course:', error)
      // You can add error handling here
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not signed in</h2>
          <p className="text-gray-600 mb-6">Please sign in to access your dashboard.</p>
          <Link href="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "First Course",
      description: "Complete your first course",
      icon: "🎓",
      unlocked: enrolledCourses.length > 0,
      unlockedDate: enrolledCourses.length > 0 ? new Date().toISOString() : undefined
    },
    {
      id: 2,
      title: "Learning Streak",
      description: "Maintain a 7-day learning streak",
      icon: "🔥",
      unlocked: userData.currentStreak >= 7,
      unlockedDate: userData.currentStreak >= 7 ? new Date().toISOString() : undefined
    },
    {
      id: 3,
      title: "Course Explorer",
      description: "Enroll in 3 different course categories",
      icon: "🗺️",
      unlocked: new Set(enrolledCourses.map(c => c.category)).size >= 3,
      unlockedDate: new Set(enrolledCourses.map(c => c.category)).size >= 3 ? new Date().toISOString() : undefined
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">BEAM Skills</span>
              {isLocationEnabled && city && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full"
                >
                  <MapPin className="h-3 w-3" />
                  <span className="text-sm">{city}</span>
                </motion.div>
              )}
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
                Courses
              </Link>
              <Link href="/instructors" className="text-gray-600 hover:text-gray-900 transition-colors">
                Instructors
              </Link>
              <Link href="/schedule" className="text-gray-600 hover:text-gray-900 transition-colors">
                Schedule
              </Link>
              <Link href="/certifications" className="text-gray-600 hover:text-gray-900 transition-colors">
                Certifications
              </Link>
              <Link href="/partners" className="text-gray-600 hover:text-gray-900 transition-colors">
                Partners
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Setup Guide Button */}
              {!isSetupGuideOpen && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setIsSetupGuideOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-200 font-medium"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Setup Guide</span>
                  <div className="relative w-6 h-6">
                    <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-300"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-primary-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="100, 100"
                        strokeDashoffset={100 - (getSetupProgress() * 100) / 100}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                  </div>
                </motion.button>
              )}
              


              {/* Notifications */}
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{userData.name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isSettingsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                        <p className="text-xs text-gray-500">{userData.email}</p>
                      </div>
                      
                      <div className="py-1">
                        <button
                          onClick={async () => {
                            await supabase.auth.signOut()
                            window.location.href = '/'
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userData.name}! 👋
          </h1>
          <p className="text-gray-600">
            Continue your learning journey and track your progress
          </p>
          
          {/* Enrollment Status Indicator */}
          {localStorage.getItem('pendingCourseEnrollment') && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-yellow-700">
                  Course enrollment pending... Click "Quick Refresh" to complete
                </span>
              </div>
            </div>
          )}
          
          {/* Debug Panel */}
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Debug Info:</span>
                <span>Pending: {localStorage.getItem('pendingCourseEnrollment') || 'None'}</span>
                <span>Enrolled: {enrolledCourses.length} courses</span>
              </div>
              <div className="text-xs">
                {enrolledCourses.length > 0 ? (
                  <span>Courses: {enrolledCourses.map(c => c.title).join(', ')}</span>
                ) : (
                  <span>No courses loaded</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{userData.totalCourses}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{userData.completedCourses}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">{userData.totalHours}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Certifications</p>
                <p className="text-2xl font-bold text-gray-900">{userData.certificationCount}</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'courses', label: 'My Courses', icon: BookOpen },
                { id: 'sessions', label: 'Upcoming Sessions', icon: Calendar },
                { id: 'achievements', label: 'Achievements', icon: Award }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                
                {/* Learning Progress */}
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h4>
                  <div className="space-y-4">
                    {enrolledCourses.slice(0, 3).map((course) => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{course.title}</p>
                          <p className="text-sm text-gray-600">{course.instructor}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(course.progress)}`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${getProgressColor(course.progress)}`}>
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link 
                    href="/courses" 
                    className="flex items-center justify-center space-x-2 p-4 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition-colors"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span className="font-medium">Browse Courses</span>
                  </Link>
                  <Link 
                    href="/schedule" 
                    className="flex items-center justify-center space-x-2 p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">View Schedule</span>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h3>
                
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{course.title}</h4>
                            <p className="text-gray-600">{course.instructor}</p>
                          </div>
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                            {course.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{course.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{course.nextSession}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{course.nextSessionTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(course.progress)}`}
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                                                  <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-600">
                            Not Started Yet
                          </span>
                          <button
                            onClick={() => handleRemoveCourse(course.id)}
                            className="px-3 py-1 text-xs text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                            title="Remove course"
                          >
                            Remove
                          </button>
                        </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h4>
                    <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course</p>
                    <Link href="/courses" className="btn-primary">
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sessions' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
                
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{session.course}</h4>
                            <div className="flex items-center space-x-6 text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-primary-600 mr-2" />
                                <span>{new Date(session.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 text-primary-600 mr-2" />
                                <span>{session.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-5 w-5 text-primary-600 mr-2" />
                                <span>{session.location}</span>
                              </div>
                            </div>
                            <p className="text-gray-600 mt-2">Instructor: {session.instructor}</p>
                          </div>
                          <div className="flex flex-col space-y-3">
                            <button className="btn-primary">
                              Join Session
                            </button>
                            <button 
                              onClick={() => {
                                const event = createCourseCalendarEvent(
                                  session.course,
                                  session.time,
                                  session.location,
                                  session.instructor
                                )
                                if (event) {
                                  addToGoogleCalendar(event)
                                }
                              }}
                              className="btn-secondary"
                            >
                              Add to Calendar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">No upcoming sessions</h4>
                    <p className="text-gray-600 mb-6">You don't have any upcoming sessions scheduled.</p>
                    <Link href="/courses" className="btn-primary">
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`border-2 rounded-2xl p-6 text-center transition-all duration-300 ${
                        achievement.unlocked 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className={`text-4xl mb-4 ${achievement.unlocked ? 'opacity-100' : 'opacity-30'}`}>
                        {achievement.icon}
                      </div>
                      <h4 className={`text-lg font-bold mb-2 ${
                        achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm mb-3 ${
                        achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked ? (
                        <div className="text-xs text-green-600 font-medium">
                          Unlocked {achievement.unlockedDate && new Date(achievement.unlockedDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400">
                          Locked
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Setup Guide */}
      <SetupGuide
        isOpen={isSetupGuideOpen}
        onClose={() => setIsSetupGuideOpen(false)}
        userId={userData?.id || ''}
        onDataUpdate={() => {
          // Refresh user data when setup guide updates something
          fetchUserData()
        }}
      />
    </div>
  )
}
