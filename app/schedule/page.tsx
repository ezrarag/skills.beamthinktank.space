'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Users, MapPin, Filter, ChevronLeft, ChevronRight } from 'lucide-react'

const scheduleData = [
  {
    id: 1,
    course: "Advanced Web Development",
    instructor: "Sarah Johnson",
    date: "2024-01-15",
    time: "10:00 AM - 12:00 PM",
    duration: 2,
    location: "Virtual Classroom A",
    maxStudents: 25,
    enrolledStudents: 18,
    category: "Technology",
    price: 299
  },
  {
    id: 2,
    course: "Data Science Fundamentals",
    instructor: "Dr. Michael Chen",
    date: "2024-01-16",
    time: "2:00 PM - 4:00 PM",
    duration: 2,
    location: "Virtual Classroom B",
    maxStudents: 20,
    enrolledStudents: 15,
    category: "Data",
    price: 399
  },
  {
    id: 3,
    course: "Digital Marketing Strategy",
    instructor: "Emma Rodriguez",
    date: "2024-01-17",
    time: "9:00 AM - 11:00 AM",
    duration: 2,
    location: "Virtual Classroom C",
    maxStudents: 30,
    enrolledStudents: 22,
    category: "Marketing",
    price: 199
  },
  {
    id: 4,
    course: "UI/UX Design Principles",
    instructor: "Alex Thompson",
    date: "2024-01-18",
    time: "1:00 PM - 3:00 PM",
    duration: 2,
    location: "Virtual Classroom A",
    maxStudents: 18,
    enrolledStudents: 12,
    category: "Design",
    price: 249
  },
  {
    id: 5,
    course: "Business Analytics",
    instructor: "Lisa Wang",
    date: "2024-01-19",
    time: "10:00 AM - 12:00 PM",
    duration: 2,
    location: "Virtual Classroom B",
    maxStudents: 22,
    enrolledStudents: 16,
    category: "Business",
    price: 349
  },
  {
    id: 6,
    course: "Financial Planning",
    instructor: "Robert Davis",
    date: "2024-01-20",
    time: "2:00 PM - 4:00 PM",
    duration: 2,
    location: "Virtual Classroom C",
    maxStudents: 25,
    enrolledStudents: 19,
    category: "Finance",
    price: 179
  }
]

const categories = ['All', 'Technology', 'Data', 'Marketing', 'Design', 'Business', 'Finance']

export default function SchedulePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDate, setSelectedDate] = useState('')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'calendar'

  const filteredSchedule = scheduleData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesDate = !selectedDate || item.date === selectedDate
    return matchesCategory && matchesDate
  })

  const sortedSchedule = [...filteredSchedule].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getDateDisplay = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getTimeDisplay = (timeString: string) => {
    return timeString.split(' - ')[0]
  }

  const getAvailabilityStatus = (enrolled: number, max: number) => {
    const percentage = (enrolled / max) * 100
    if (percentage >= 90) return { status: 'Almost Full', color: 'text-red-600' }
    if (percentage >= 70) return { status: 'Limited', color: 'text-yellow-600' }
    return { status: 'Available', color: 'text-green-600' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Schedule</h1>
          <p className="text-lg text-gray-600">View upcoming classes and enroll in your preferred sessions</p>
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

              {/* Date Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Date</h4>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-field"
                />
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate('')}
                    className="text-sm text-primary-600 hover:text-primary-700 mt-2"
                  >
                    Clear date filter
                  </button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">View Mode</h4>
                <div className="flex border rounded-lg">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-l-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-r-lg transition-colors ${
                      viewMode === 'calendar'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {sortedSchedule.length} of {scheduleData.length} scheduled classes
              </p>
            </div>

            {viewMode === 'list' ? (
              /* List View */
              <div className="space-y-4">
                {sortedSchedule.map((item) => {
                  const availability = getAvailabilityStatus(item.enrolledStudents, item.maxStudents)
                  return (
                    <div key={item.id} className="card hover:shadow-lg transition-shadow duration-200">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                            <Calendar className="h-8 w-8 text-primary-600" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.course}</h3>
                              <p className="text-sm text-gray-600 mb-2">with {item.instructor}</p>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {item.time}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {item.enrolledStudents}/{item.maxStudents}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {item.location}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 mt-3">
                            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                              {item.category}
                            </span>
                            <span className={`text-sm font-medium ${availability.color}`}>
                              {availability.status}
                            </span>
                            <span className="text-lg font-bold text-primary-600">${item.price}</span>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <Link href={`/courses/${item.id}/enroll`} className="btn-primary">
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              /* Calendar View */
              <div className="card">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Calendar View</h3>
                  <p className="text-sm text-gray-600">Calendar view coming soon...</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive calendar view will be implemented here</p>
                </div>
              </div>
            )}

            {sortedSchedule.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No classes scheduled</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later for new schedules.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
