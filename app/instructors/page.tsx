'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, ChevronDown, ChevronUp, BookOpen, Calendar, Award, LogIn, UserPlus, Hammer, Filter, Star, ArrowRight, Search } from 'lucide-react'

const instructors = [
  {
    id: 1,
    name: "BEAM Skills Volunteer Team",
    specialty: "Technology & Digital Skills",
    bio: "Our dedicated volunteer team brings years of experience in technology education and digital literacy. We're passionate about making technology accessible to everyone.",
    rating: 4.9,
    courses: 1,
    students: 0,
    yearsExperience: 5,
    featured: true
  },
  {
    id: 2,
    name: "BEAM Skills Volunteer Mechanics",
    specialty: "Automotive & Transportation",
    bio: "Experienced mechanics and automotive professionals who love teaching others about car maintenance and repair. We believe everyone should have basic automotive knowledge.",
    rating: 4.8,
    courses: 1,
    students: 0,
    yearsExperience: 8,
    featured: true
  },
  {
    id: 3,
    name: "BEAM Skills Music Volunteers",
    specialty: "Music & Arts",
    bio: "Talented musicians and music educators dedicated to making orchestral music accessible to beginners. We believe everyone can find joy and confidence in making music together.",
    rating: 4.7,
    courses: 1,
    students: 0,
    yearsExperience: 6,
    featured: true
  }
]

const specialties = ['All', 'Technology', 'Transportation', 'Community Skills']

export default function InstructorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false)

  const toggleSkillsDropdown = () => {
    setIsSkillsDropdownOpen(!isSkillsDropdownOpen)
  }

  const closeSkillsDropdown = () => {
    setIsSkillsDropdownOpen(false)
  }

  const filteredInstructors = instructors.filter(instructor => {
    const matchesSpecialty = selectedSpecialty === 'All' || instructor.specialty.includes(selectedSpecialty)
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instructor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSpecialty && matchesSearch
  })

  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'experience':
        return b.yearsExperience - a.yearsExperience
      case 'courses':
        return b.courses - a.courses
      default:
        return b.rating - a.rating
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#7A3B3B] to-[#6A2B2B] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-0 mr-6 font-satoshi">Our Instructors</h1>
            
            {/* Skills Dropdown Button */}
            <div className="relative">
              <motion.button
                onClick={toggleSkillsDropdown}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Hammer className="h-5 w-5" />
                <span className="font-satoshi">Instructors</span>
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
                          <span className="text-[#7A3B3B] font-medium">Schedule</span>
                        </Link>
                        
                        <Link 
                          href="/certifications" 
                          className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-[#7A3B3B] hover:bg-[#7A3B3B]/10 rounded-xl transition-all duration-200"
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
            Learn from experienced professionals passionate about sharing their knowledge and helping others succeed
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
              
              {/* Specialty Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 mb-4">Specialty</h4>
                <div className="space-y-3">
                  {specialties.map((specialty) => (
                    <label key={specialty} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="specialty"
                        value={specialty}
                        checked={selectedSpecialty === specialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="mr-3 text-primary-600 focus:ring-primary-500 w-4 h-4"
                      />
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 mb-4">Experience Level</h4>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="mr-3 text-primary-600 w-4 h-4" defaultChecked />
                    <span className="text-gray-700 group-hover:text-primary-600 transition-colors">5+ years</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="mr-3 text-primary-600 w-4 h-4" defaultChecked />
                    <span className="text-gray-700 group-hover:text-primary-600 transition-colors">8+ years</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Listings */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search instructors..."
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
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="courses">Most Courses</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-8">
              <p className="text-lg text-gray-600">
                Showing {sortedInstructors.length} of {instructors.length} instructors
              </p>
            </div>

            {/* Instructor Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {sortedInstructors.map((instructor) => (
                <div key={instructor.id} className="group cursor-pointer">
                  <div className="card hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-primary-200">
                    {instructor.featured && (
                      <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                    
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                          <Users className="h-12 w-12 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{instructor.name}</h3>
                        <p className="text-lg text-primary-600 font-medium mb-4">{instructor.specialty}</p>
                        <p className="text-gray-600 mb-6 leading-relaxed">{instructor.bio}</p>
                        
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary-600">{instructor.courses}</div>
                            <div className="text-sm text-gray-600">Courses</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary-600">{instructor.students}</div>
                            <div className="text-sm text-gray-600">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary-600">{instructor.yearsExperience}+</div>
                            <div className="text-sm text-gray-600">Years</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 mr-2" />
                            <span className="font-medium text-gray-900">{instructor.rating}</span>
                            <span className="text-gray-600 ml-2">({instructor.students} students)</span>
                          </div>
                          <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                            View Profile
                            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedInstructors.length === 0 && (
              <div className="text-center py-20">
                <Users className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No instructors found</h3>
                <p className="text-lg text-gray-600 mb-8">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSelectedSpecialty('All')
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
