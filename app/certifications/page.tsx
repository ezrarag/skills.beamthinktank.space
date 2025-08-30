'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ChevronDown, ChevronUp, BookOpen, Users, Calendar, LogIn, UserPlus, Hammer, CheckCircle, Star, Clock, Filter, Search, ArrowRight, MapPin } from 'lucide-react'
import { useLocation } from '../components/LocationProvider'

const certifications = [
  {
    id: 1,
    title: "Digital Literacy Certificate",
    course: "Intro to Tech for All Ages",
    issuedDate: "2024-01-15",
    expiryDate: "2027-01-15",
    status: "Active",
    skills: ["Computer Basics", "Internet Safety", "Email Communication", "Video Calls", "Mobile Apps"],
    instructor: "BEAM Skills Volunteer Team",
    featured: true
  },
  {
    id: 2,
    title: "Basic Automotive Maintenance Certificate",
    course: "Intro to Car Maintenance & Repair",
    issuedDate: "2024-01-20",
    expiryDate: "2027-01-20",
    status: "Active",
    skills: ["Engine Basics", "Oil Changes", "Brake Systems", "Tire Maintenance", "Safety Procedures"],
    instructor: "BEAM Skills Volunteer Mechanics",
    featured: true
  }
]

const statuses = ['All', 'Active', 'Expired', 'Pending']

export default function CertificationsPage() {
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false)
  const { city, isLocationEnabled } = useLocation()

  const toggleSkillsDropdown = () => {
    setIsSkillsDropdownOpen(!isSkillsDropdownOpen)
  }

  const closeSkillsDropdown = () => {
    setIsSkillsDropdownOpen(false)
  }

  const filteredCertifications = certifications.filter(cert => {
    const matchesStatus = selectedStatus === 'All' || cert.status === selectedStatus
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.course.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const sortedCertifications = [...filteredCertifications].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'status':
        return a.status.localeCompare(b.status)
      default:
        return new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Expired':
        return 'bg-red-100 text-red-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#7A3B3B] to-[#6A2B2B] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-0 font-satoshi">My Certifications</h1>
              {isLocationEnabled && city && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 text-white/90 font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="text-lg">{city}</span>
                </motion.div>
              )}
            </div>
            
            {/* Skills Dropdown Button */}
            <div className="relative">
              <motion.button
                onClick={toggleSkillsDropdown}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Hammer className="h-5 w-5" />
                <span className="font-satoshi">Certifications</span>
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
                          href="/partners" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
                          onClick={closeSkillsDropdown}
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
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-satoshi">
            Track your learning achievements and showcase your new skills with official certificates
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-primary-600 mb-2">{certifications.length}</div>
            <div className="text-gray-600">Total Certificates</div>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {certifications.filter(c => c.status === 'Active').length}
            </div>
            <div className="text-gray-600">Active</div>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {certifications.reduce((total, cert) => total + cert.skills.length, 0)}
            </div>
            <div className="text-gray-600">Skills Acquired</div>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.min(...certifications.map(c => getDaysUntilExpiry(c.expiryDate)))}
            </div>
            <div className="text-gray-600">Days to Expiry</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Filter className="h-5 w-5 text-primary-600" />
                Filters
              </h3>
              
              {/* Status Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 mb-4">Status</h4>
                <div className="space-y-3">
                  {statuses.map((status) => (
                    <label key={status} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={selectedStatus === status}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="mr-3 text-primary-600 focus:ring-primary-500 w-4 h-4"
                      />
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications List */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search certifications..."
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
                <option value="recent">Most Recent</option>
                <option value="title">Title A-Z</option>
                <option value="status">Status</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-lg text-gray-600">
                Showing {sortedCertifications.length} of {certifications.length} certifications
              </p>
            </div>

            {/* Certifications Grid */}
            <div className="space-y-6">
              {sortedCertifications.map((cert) => (
                <div key={cert.id} className="group cursor-pointer">
                  <div className="card hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-primary-200">
                    {cert.featured && (
                      <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                    
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                          <Award className="h-10 w-10 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{cert.title}</h3>
                            <p className="text-lg text-primary-600 font-medium">from {cert.course}</p>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cert.status)}`}>
                              {cert.status}
                            </span>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Expires in</div>
                              <div className="font-semibold text-gray-900">{getDaysUntilExpiry(cert.expiryDate)} days</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm text-gray-500 mb-2">Skills Acquired:</div>
                          <div className="flex flex-wrap gap-2">
                            {cert.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Instructor: {cert.instructor}</span>
                          <span>Issued: {new Date(cert.issuedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                          View Details
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedCertifications.length === 0 && (
              <div className="text-center py-20">
                <Award className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No certifications found</h3>
                <p className="text-lg text-gray-600 mb-8">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSelectedStatus('All')
                    setSearchQuery('')
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
