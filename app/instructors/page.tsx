'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, Star, BookOpen, Filter, Search, Award, Clock } from 'lucide-react'

const expertiseAreas = [
  'All',
  'Web Development',
  'Data Science',
  'Digital Marketing',
  'UI/UX Design',
  'Business Analytics',
  'Finance',
  'Healthcare',
  'Artificial Intelligence'
]

const instructors = [
  {
    id: 1,
    name: "Sarah Johnson",
    bio: "Senior Full-Stack Developer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture.",
    expertise: ["Web Development", "React", "Node.js", "Cloud Architecture"],
    avatar_url: "/avatars/sarah.jpg",
    rating: 4.9,
    total_students: 1247,
    courses_count: 12,
    experience_years: 8,
    company: "TechCorp Inc."
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    bio: "Data Scientist and Machine Learning Engineer with a PhD in Computer Science. Specializes in predictive analytics and AI applications.",
    expertise: ["Data Science", "Machine Learning", "Python", "Statistics"],
    avatar_url: "/avatars/michael.jpg",
    rating: 4.8,
    total_students: 892,
    courses_count: 8,
    experience_years: 12,
    company: "DataFlow Solutions"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    bio: "Digital Marketing Strategist with expertise in growth hacking, SEO, and social media marketing. Helped 100+ companies scale their online presence.",
    expertise: ["Digital Marketing", "SEO", "Social Media", "Growth Hacking"],
    avatar_url: "/avatars/emma.jpg",
    rating: 4.7,
    total_students: 1563,
    courses_count: 15,
    experience_years: 6,
    company: "Growth Marketing Pro"
  },
  {
    id: 4,
    name: "Alex Thompson",
    bio: "UX/UI Designer and Design Systems expert. Former designer at Google and Airbnb. Passionate about creating intuitive user experiences.",
    expertise: ["UI/UX Design", "Design Systems", "Figma", "User Research"],
    avatar_url: "/avatars/alex.jpg",
    rating: 4.6,
    total_students: 743,
    courses_count: 10,
    experience_years: 9,
    company: "Design Studio X"
  },
  {
    id: 5,
    name: "Lisa Wang",
    bio: "Business Intelligence Consultant with expertise in data visualization and strategic analytics. Helps companies make data-driven decisions.",
    expertise: ["Business Analytics", "Data Visualization", "SQL", "Tableau"],
    avatar_url: "/avatars/lisa.jpg",
    rating: 4.8,
    total_students: 567,
    courses_count: 7,
    experience_years: 10,
    company: "Analytics Partners"
  },
  {
    id: 6,
    name: "Robert Davis",
    bio: "Certified Financial Planner and investment advisor. Specializes in retirement planning and wealth management strategies.",
    expertise: ["Financial Planning", "Investment", "Retirement Planning", "Tax Strategy"],
    avatar_url: "/avatars/robert.jpg",
    rating: 4.5,
    total_students: 892,
    courses_count: 9,
    experience_years: 15,
    company: "Davis Financial Group"
  }
]

export default function InstructorsPage() {
  const [selectedExpertise, setSelectedExpertise] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  const filteredInstructors = instructors.filter(instructor => {
    const matchesExpertise = selectedExpertise === 'All' || 
                           instructor.expertise.includes(selectedExpertise)
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instructor.bio.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesExpertise && matchesSearch
  })

  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    switch (sortBy) {
      case 'students':
        return b.total_students - a.total_students
      case 'experience':
        return b.experience_years - a.experience_years
      case 'courses':
        return b.courses_count - a.courses_count
      default:
        return b.rating - a.rating
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Instructors</h1>
          <p className="text-lg text-gray-600">Learn from industry experts and certified professionals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Expertise Areas
              </h3>
              
              <div className="space-y-2">
                {expertiseAreas.map((expertise) => (
                  <label key={expertise} className="flex items-center">
                    <input
                      type="radio"
                      name="expertise"
                      value={expertise}
                      checked={selectedExpertise === expertise}
                      onChange={(e) => setSelectedExpertise(e.target.value)}
                      className="mr-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{expertise}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Experience Level</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 text-primary-600" />
                  <span className="text-sm text-gray-700">5+ years</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 text-primary-600" />
                  <span className="text-sm text-gray-700">10+ years</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 text-primary-600" />
                  <span className="text-sm text-gray-700">15+ years</span>
                </label>
              </div>
            </div>
          </div>

          {/* Instructor Listings */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search instructors..."
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
                <option value="rating">Highest Rated</option>
                <option value="students">Most Students</option>
                <option value="experience">Most Experienced</option>
                <option value="courses">Most Courses</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {sortedInstructors.length} of {instructors.length} instructors
              </p>
            </div>

            {/* Instructor Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedInstructors.map((instructor) => (
                <div key={instructor.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                        <Users className="h-10 w-10 text-primary-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{instructor.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{instructor.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{instructor.company}</p>
                      <p className="text-gray-700 mb-4 line-clamp-3">{instructor.bio}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {instructor.expertise.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="inline-block bg-secondary-100 text-secondary-700 text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {instructor.expertise.length > 3 && (
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                            +{instructor.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {instructor.courses_count} courses
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {instructor.total_students} students
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {instructor.experience_years} years
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Link href={`/instructors/${instructor.id}`} className="btn-primary flex-1 text-center">
                          View Profile
                        </Link>
                        <Link href={`/courses?instructor=${instructor.id}`} className="btn-secondary flex-1 text-center">
                          View Courses
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedInstructors.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No instructors found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
