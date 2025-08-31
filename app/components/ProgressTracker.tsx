'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle, Clock, MapPin, Calendar } from 'lucide-react'

interface AttendanceRecord {
  id: number
  session_id: number
  user_id: string
  attendance_mode: 'in-person' | 'jitsi' | 'discord'
  joined_at: string
  left_at: string
  location_verified?: boolean
  gps_coordinates?: string
}

interface SessionData {
  id: number
  course_id: number
  session_date: string
  start_time: string
  end_time: string
  topic: string
  duration_hours: number
}

interface CourseProgress {
  courseId: number
  courseTitle: string
  totalSessions: number
  attendedSessions: number
  totalHours: number
  completedHours: number
  progressPercentage: number
  lastAttendance: string | null
  nextSession: string | null
  attendanceStreak: number
}

interface ProgressTrackerProps {
  userId: string
  courseId?: number // Optional: if provided, show progress for specific course
}

export default function ProgressTracker({ userId, courseId }: ProgressTrackerProps) {
  const [progress, setProgress] = useState<CourseProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgress()
  }, [userId, courseId])

  const fetchProgress = async () => {
    try {
      setLoading(true)
      
      // Get user's enrolled courses
      const { data: enrollments, error: enrollError } = await supabase
        .from('enrollments')
        .select(`
          course_id,
          courses (
            id,
            title,
            total_sessions,
            duration
          )
        `)
        .eq('user_id', userId)
        .in('status', ['confirmed', 'pending'])

      if (enrollError) throw enrollError

      if (!enrollments) return

      const progressData: CourseProgress[] = []

      for (const enrollment of enrollments) {
        const course = enrollment.courses
        if (!course || !Array.isArray(course) || course.length === 0) continue

        // Filter by specific course if provided
        if (courseId && course[0].id !== courseId) continue

        // Get all sessions for this course
        const { data: sessions, error: sessionsError } = await supabase
          .from('course_schedule')
          .select('*')
          .eq('course_id', course[0].id)
          .order('week', { ascending: true })

        if (sessionsError) continue

        // Get attendance records for this course
        const { data: attendance, error: attendanceError } = await supabase
          .from('session_attendance')
          .select(`
            *,
            class_sessions!inner(course_id)
          `)
          .eq('user_id', userId)
          .eq('class_sessions.course_id', course[0].id)

        if (attendanceError) continue

        // Calculate progress metrics
        const totalSessions = sessions?.length || 0
        const attendedSessions = attendance?.length || 0
        
        // Calculate total hours (from course duration)
        const durationMatch = course[0].duration?.match(/(\d+)\s*weeks?\s*\((\d+(?:\.\d+)?)\s*hrs?\s*\/\s*session\)/)
        const totalHours = durationMatch ? 
          parseInt(durationMatch[1]) * parseFloat(durationMatch[2]) : 
          totalSessions * 2 // Default 2 hours per session
        
        const completedHours = attendedSessions * 2 // Assume 2 hours per session
        const progressPercentage = totalSessions > 0 ? 
          Math.round((attendedSessions / totalSessions) * 100) : 0

        // Calculate attendance streak
        let attendanceStreak = 0
        if (attendance && attendance.length > 0) {
          const sortedAttendance = attendance
            .sort((a: any, b: any) => new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime())
          
          let currentStreak = 0
          for (let i = 0; i < sortedAttendance.length - 1; i++) {
            const currentDate = new Date(sortedAttendance[i].joined_at)
            const nextDate = new Date(sortedAttendance[i + 1].joined_at)
            const daysDiff = Math.abs(currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
            
            if (daysDiff <= 7) { // Within a week
              currentStreak++
            } else {
              break
            }
          }
          attendanceStreak = currentStreak + 1
        }

        // Get next session
        const nextSession = sessions?.find((s: any) => 
          new Date(s.session_date) > new Date()
        )?.session_date || null

        // Get last attendance
        const lastAttendance = attendance && attendance.length > 0 ? 
          attendance.sort((a: any, b: any) => new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime())[0].joined_at : 
          null

        progressData.push({
          courseId: course[0].id,
          courseTitle: course[0].title,
          totalSessions,
          attendedSessions,
          totalHours,
          completedHours,
          progressPercentage,
          lastAttendance,
          nextSession,
          attendanceStreak
        })
      }

      setProgress(progressData)
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    if (percentage >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    if (percentage >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (progress.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No progress data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {courseId ? 'Course Progress' : 'Learning Progress'}
      </h3>
      
      {progress.map((course) => (
        <div key={course.courseId} className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{course.courseTitle}</h4>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{course.attendedSessions}/{course.totalSessions} sessions</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.completedHours}/{course.totalHours} hours</span>
                </div>
                {course.attendanceStreak > 0 && (
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                    <span>{course.attendanceStreak} week streak</span>
                  </div>
                )}
              </div>
            </div>
            <span className={`text-2xl font-bold ${getProgressColor(course.progressPercentage)}`}>
              {course.progressPercentage}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(course.progressPercentage)}`}
              style={{ width: `${course.progressPercentage}%` }}
            ></div>
          </div>
          
          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            {course.lastAttendance && (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span>Last attended: {new Date(course.lastAttendance).toLocaleDateString()}</span>
              </div>
            )}
            {course.nextSession && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                <span>Next session: {new Date(course.nextSession).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
