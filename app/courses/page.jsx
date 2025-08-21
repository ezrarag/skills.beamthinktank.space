'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Users, Star, Filter, Search, Heart, ArrowRight } from 'lucide-react'

const categories = [
  'All',
  'Technology',
  'Transportation',
  'Community Skills'
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
    featured: true
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
    featured: true
  },
  {
    id: 3,
    title: "Orchestra Repertoire for Beginners",
    description: "A welcoming introduction to orchestral music for beginners. Learn how to explore, prepare, and perform standard orchestra repertoire. Students will be guided through essential resources, performance history, technical lessons, and rehearsal prep skills to build a solid foundation in orchestral playing.",
    category: "Community Skills",
    price: "Free (unlocked through community donations)",
    duration: "16 weeks (1.5 hrs / session)",
    students: 0,
    rating: 4.7,
    instructor: "BEAM Skills Music Volunteers",
    level: "Beginner",
    featured: true
  }
]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [priceFilter, setPriceFilter] = useState(['Free (Community Funded)'])
  const [levelFilter, setLevelFilter] = useState(['Beginner'])

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Browse Courses</h1>
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
            {/* Search and Sort */}
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
                <div key={course.id} className="group cursor-pointer">
                  <div className="card hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-primary-200">
                    {course.featured && (
                      <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                    
                    <div className="h-56 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-6 flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                      <BookOpen className="h-20 w-20 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full">
                          {course.category}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">{course.level}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{course.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">{course.description}</p>
                      
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
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-600">{course.price}</div>
                      <Link href={`/courses/${course.id}`} className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                        View Course
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
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
    </div>
  )
}
