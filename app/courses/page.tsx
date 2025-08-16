'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Users, Star, Filter, Search } from 'lucide-react'

const categories = [
  'All',
  'Technology',
  'Data',
  'Marketing',
  'Business',
  'Design',
  'Finance',
  'Healthcare'
]

const courses = [
  {
    id: 1,
    title: "Advanced Web Development",
    description: "Master modern web technologies including React, Node.js, and cloud deployment.",
    category: "Technology",
    price: 299,
    duration: 40,
    students: 1247,
    rating: 4.8,
    instructor: "Sarah Johnson",
    level: "Advanced"
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description: "Learn data analysis, visualization, and machine learning basics.",
    category: "Data",
    price: 399,
    duration: 50,
    students: 892,
    rating: 4.9,
    instructor: "Dr. Michael Chen",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Digital Marketing Strategy",
    description: "Develop comprehensive marketing campaigns across all digital channels.",
    category: "Marketing",
    price: 199,
    duration: 30,
    students: 1563,
    rating: 4.7,
    instructor: "Emma Rodriguez",
    level: "Beginner"
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    description: "Create intuitive and beautiful user interfaces with modern design tools.",
    category: "Design",
    price: 249,
    duration: 35,
    students: 743,
    rating: 4.6,
    instructor: "Alex Thompson",
    level: "Intermediate"
  },
  {
    id: 5,
    title: "Business Analytics",
    description: "Transform data into actionable business insights and strategic decisions.",
    category: "Business",
    price: 349,
    duration: 45,
    students: 567,
    rating: 4.8,
    instructor: "Lisa Wang",
    level: "Advanced"
  },
  {
    id: 6,
    title: "Financial Planning",
    description: "Master personal and business financial planning strategies.",
    category: "Finance",
    price: 179,
    duration: 25,
    students: 892,
    rating: 4.5,
    instructor: "Robert Davis",
    level: "Beginner"
  }
]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popularity')

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'duration':
        return a.duration - b.duration
      default:
        return b.students - a.students
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Courses</h1>
          <p className="text-lg text-gray-600">Find the perfect course to advance your skills</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 text-primary-600" />
                    <span className="text-sm text-gray-700">Free</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 text-primary-600" />
                    <span className="text-sm text-gray-700">$0 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 text-primary-600" />
                    <span className="text-sm text-gray-700">$100 - $300</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 text-primary-600" />
                    <span className="text-sm text-gray-700">$300+</span>
                  </label>
                </div>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Level</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 text-primary-600" />
                    <span className="text-sm text-gray-700">Beginner</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 text-primary-600" />
                    <span className="text-sm text-gray-700">Intermediate</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 text-primary-600" />
                    <span className="text-sm text-gray-700">Advanced</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Course Listings */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-full sm:w-auto"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration: Short to Long</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {sortedCourses.length} of {courses.length} courses
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedCourses.map((course) => (
                <div key={course.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary-600" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                      <span className="text-sm text-gray-500">{course.level}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {course.rating} ({course.students} students)
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration} hours
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Users className="h-4 w-4 mr-1" />
                      {course.instructor}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary-600">${course.price}</div>
                    <Link href={`/courses/${course.id}`} className="btn-primary">
                      View Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {sortedCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
