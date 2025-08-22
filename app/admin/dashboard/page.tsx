'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { BookOpen, Users, Calendar, MapPin, Clock, Edit3, Save, X } from 'lucide-react'

interface Course {
  id: number
  title: string
  description: string
  start_date: string
  category: string
  instructor: string
  max_students: number
  enrolled_students: number
  duration: string
  class_time: string
  location: string
}

interface Enrollment {
  id: number
  user_id: string
  course_id: number
  status: string
  attendance_mode: string
  enrolled_at: string
  user_email?: string
  course_title?: string
}

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCourse, setEditingCourse] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    start_date: '',
    class_time: '',
    location: '',
    max_students: 0
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('start_date', { ascending: true })

      if (coursesError) throw coursesError

      // Fetch enrollments with user and course info
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select(`
          *,
          profiles (email),
          courses (title)
        `)
        .order('enrolled_at', { ascending: false })

      if (enrollmentsError) throw enrollmentsError

      // Process enrollments data
      const processedEnrollments = enrollmentsData?.map(enrollment => ({
        ...enrollment,
        user_email: (enrollment as any).profiles?.email || 'Unknown',
        course_title: (enrollment as any).courses?.title || 'Unknown Course'
      })) || []

      setCourses(coursesData || [])
      setEnrollments(processedEnrollments)
      
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDeliveryModes = (course: Course) => {
    // For now, all courses support all delivery modes
    // This could be made dynamic later
    return 'In-person, Jitsi, Discord'
  }

  const getNumberOfSessions = (course: Course) => {
    // Calculate based on duration - this is a rough estimate
    const duration = course.duration || ''
    if (duration.includes('6 weeks')) return 6
    if (duration.includes('8 weeks')) return 8
    if (duration.includes('12 weeks')) return 12
    if (duration.includes('14 weeks')) return 14
    if (duration.includes('16 weeks')) return 16
    return 'TBD'
  }

  const startEditing = (course: Course) => {
    setEditingCourse(course.id)
    setEditForm({
      title: course.title,
      description: course.description,
      start_date: course.start_date,
      class_time: course.class_time,
      location: course.location,
      max_students: course.max_students
    })
  }

  const cancelEditing = () => {
    setEditingCourse(null)
    setEditForm({
      title: '',
      description: '',
      start_date: '',
      class_time: '',
      location: '',
      max_students: 0
    })
  }

  const saveCourse = async (courseId: number) => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('courses')
        .update({
          title: editForm.title,
          description: editForm.description,
          start_date: editForm.start_date,
          class_time: editForm.class_time,
          location: editForm.location,
          max_students: editForm.max_students,
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId)

      if (error) throw error

      // Refresh courses data
      await fetchData()
      setEditingCourse(null)
      setEditForm({
        title: '',
        description: '',
        start_date: '',
        class_time: '',
        location: '',
        max_students: 0
      })
    } catch (error) {
      console.error('Error updating course:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of courses and enrollments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {enrollments.filter(e => e.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Available Courses</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sessions
                    </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery Modes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingCourse === course.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <div className="text-sm text-gray-500">{course.instructor}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.instructor}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingCourse === course.id ? (
                        <textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          rows={2}
                        />
                      ) : (
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {course.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingCourse === course.id ? (
                        <input
                          type="date"
                          value={editForm.start_date}
                          onChange={(e) => setEditForm(prev => ({ ...prev, start_date: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {new Date(course.start_date).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingCourse === course.id ? (
                        <input
                          type="text"
                          value={editForm.class_time}
                          onChange={(e) => setEditForm(prev => ({ ...prev, class_time: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="e.g., Mondays, 6:00 PM - 8:00 PM"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {course.class_time || 'TBD'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingCourse === course.id ? (
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {course.location || 'TBD'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getNumberOfSessions(course)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getDeliveryModes(course)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingCourse === course.id ? (
                        <div className="space-y-2">
                          <input
                            type="number"
                            value={editForm.max_students}
                            onChange={(e) => setEditForm(prev => ({ ...prev, max_students: parseInt(e.target.value) }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            min="1"
                          />
                          <div className="text-sm text-gray-500">
                            Current: {course.enrolled_students} enrolled
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm text-gray-900">
                            {course.enrolled_students}/{course.max_students}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary-600 h-2 rounded-full" 
                              style={{ width: `${(course.enrolled_students / course.max_students) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingCourse === course.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => saveCourse(course.id)}
                            disabled={saving}
                            className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(course)}
                          className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Student Enrollments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance Mode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{enrollment.user_email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{enrollment.course_title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        enrollment.attendance_mode === 'in-person' ? 'bg-blue-100 text-blue-800' :
                        enrollment.attendance_mode === 'jitsi' ? 'bg-green-100 text-green-800' :
                        enrollment.attendance_mode === 'discord' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {enrollment.attendance_mode || 'Not selected'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        enrollment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        enrollment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(enrollment.enrolled_at).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {enrollments.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No enrollments yet</h3>
            <p className="text-gray-600">Students will appear here once they enroll in courses.</p>
          </div>
        )}
      </div>
    </div>
  )
}
