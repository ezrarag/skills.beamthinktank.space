'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { 
  Brain, 
  MapPin, 
  ArrowLeft, 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Users, 
  Calendar, 
  BookOpen, 
  BarChart3, 
  Star, 
  CheckCircle, 
  TrendingUp, 
  Target,
  Edit,
  Settings,
  Bell,
  Plus
} from 'lucide-react'
import { useLocation } from '../components/LocationProvider'

export default function InstitutionDashboardPage() {
  const { city, isLocationEnabled } = useLocation()
  const [activeTab, setActiveTab] = useState('overview')
  const [partnership, setPartnership] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUserAndPartnership()
  }, [])

  const checkUserAndPartnership = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        // Redirect to login if not authenticated
        window.location.href = '/partner-login'
        return
      }

      setUser(user)

      // Get user's partnership
      const { data: partnershipData } = await supabase
        .from('partner_institutions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .single()

      if (!partnershipData) {
        // Redirect to contact if no approved partnership
        window.location.href = '/contact'
        return
      }

      setPartnership(partnershipData)
    } catch (error) {
      console.error('Error checking user and partnership:', error)
      window.location.href = '/partner-login'
    } finally {
      setLoading(false)
    }
  }

  // Use real partnership data or fallback to mock data
  const institutionData = partnership ? {
    name: partnership.institution_name,
    address: partnership.address,
    phone: partnership.phone || "Contact via email",
    email: partnership.email,
    website: partnership.website || "#",
    hours: "To be determined",
    description: `Partner institution offering selected courses. ${partnership.message || ''}`,
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    courses: partnership.selected_courses.map((course: string, index: number) => ({
      id: index + 1,
      title: course,
      instructor: "To be assigned",
      status: "Planning",
      enrolledStudents: 0,
      maxStudents: 20,
      nextSession: "TBD",
      nextSessionTime: "TBD",
      progress: 0
    })),
    upcomingEvents: [
      {
        id: 1,
        title: "Partnership Launch",
        date: "TBD",
        time: "TBD",
        attendees: 0,
        maxAttendees: 50
      }
    ],
    stats: {
      totalCourses: partnership.selected_courses.length,
      activeStudents: 0,
      totalSessions: 0,
      averageRating: 0,
      communityImpact: "New"
    }
  } : null

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#7A3B3B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!institutionData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No partnership found</h3>
          <p className="text-gray-600 mb-4">Please apply for partnership to access the dashboard.</p>
          <a 
            href="/contact"
            className="bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Apply for Partnership
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF] via-[#FAFAFA] to-[#FFFFFF]">
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
          
          <div className="flex items-start space-x-8">
            {/* Institution Image */}
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={institutionData.imageUrl}
                alt={institutionData.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Institution Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-[#7A3B3B] mb-4 font-satoshi">
                {institutionData.name}
              </h1>
              <p className="text-lg text-[#7A3B3B]/80 mb-6 max-w-3xl font-satoshi">
                {institutionData.description}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#7A3B3B]">{institutionData.stats.totalCourses}</div>
                  <div className="text-sm text-[#7A3B3B]/70">Active Courses</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#7A3B3B]">{institutionData.stats.activeStudents}</div>
                  <div className="text-sm text-[#7A3B3B]/70">Students</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#7A3B3B]">{institutionData.stats.averageRating}</div>
                  <div className="text-sm text-[#7A3B3B]/70">Rating</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#7A3B3B]">{institutionData.stats.communityImpact}</div>
                  <div className="text-sm text-[#7A3B3B]/70">Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#7A3B3B] text-[#7A3B3B]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-[#7A3B3B] mb-6 font-satoshi flex items-center space-x-2">
                <Building2 className="h-6 w-6" />
                <span>Contact Information</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-[#7A3B3B]" />
                    <span className="text-gray-700">{institutionData.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-[#7A3B3B]" />
                    <span className="text-gray-700">{institutionData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-[#7A3B3B]" />
                    <span className="text-gray-700">{institutionData.email}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-[#7A3B3B]" />
                    <a 
                      href={institutionData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7A3B3B] hover:text-[#6A2B2B] transition-colors duration-200"
                    >
                      Visit Website
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-[#7A3B3B]" />
                    <span className="text-gray-700">{institutionData.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-[#7A3B3B] mb-6 font-satoshi flex items-center space-x-2">
                <TrendingUp className="h-6 w-6" />
                <span>Recent Activity</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">New student enrolled in "Intro to Tech for All Ages"</span>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <span className="text-gray-700">Course "Planting & Houseplants" received 5-star rating</span>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Community Skills Fair scheduled for February 25th</span>
                  </div>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-[#7A3B3B] font-satoshi">Active Courses</h2>
              <button className="bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Course</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {institutionData.courses.map((course: any) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#7A3B3B] font-satoshi">{course.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Instructor:</span>
                      <span className="font-medium">{course.instructor}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Enrolled:</span>
                      <span className="font-medium">{course.enrolledStudents}/{course.maxStudents}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Next Session:</span>
                      <span className="font-medium">{course.nextSession} at {course.nextSessionTime}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#7A3B3B] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-[#7A3B3B]/10 text-[#7A3B3B] px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-[#7A3B3B]/20">
                      View Details
                    </button>
                    <button className="bg-[#7A3B3B] text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-[#6A2B2B]">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-[#7A3B3B] font-satoshi">Upcoming Events</h2>
              <button className="bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Event</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {institutionData.upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-[#7A3B3B] mb-4 font-satoshi">{event.title}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Date:</span>
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Time:</span>
                      <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Attendees:</span>
                      <span className="font-medium">{event.attendees}/{event.maxAttendees}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-[#7A3B3B]/10 text-[#7A3B3B] px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-[#7A3B3B]/20">
                      View Details
                    </button>
                    <button className="bg-[#7A3B3B] text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-[#6A2B2B]">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#7A3B3B] font-satoshi">Student Management</h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#7A3B3B]">{institutionData.stats.activeStudents}</div>
                  <div className="text-gray-600">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#7A3B3B]">85%</div>
                  <div className="text-gray-600">Retention Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#7A3B3B]">4.8</div>
                  <div className="text-gray-600">Average Satisfaction</div>
                </div>
              </div>
              
              <p className="text-gray-600 text-center">
                Student management features coming soon. This will include student profiles, 
                enrollment tracking, progress monitoring, and communication tools.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#7A3B3B] font-satoshi">Institution Settings</h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
                      <input 
                        type="text" 
                        value={institutionData.name}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        value={institutionData.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 text-[#7A3B3B] focus:ring-[#7A3B3B]" />
                      <span>Email notifications for new enrollments</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 text-[#7A3B3B] focus:ring-[#7A3B3B]" />
                      <span>Course completion alerts</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 text-[#7A3B3B] focus:ring-[#7A3B3B]" />
                      <span>Weekly activity reports</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white px-6 py-3 rounded-lg transition-colors duration-200">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
