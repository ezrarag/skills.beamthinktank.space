'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Video, MessageCircle, BarChart3, ExternalLink, Calendar, Clock } from 'lucide-react'
import { MultiDeliveryService, ClassSession } from '@/lib/multi-delivery'
import { supabase } from '@/lib/supabase'

interface AdminDashboardProps {
  courseId?: number
}

export default function AdminDashboard({ courseId }: AdminDashboardProps) {
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [attendanceBreakdown, setAttendanceBreakdown] = useState<Record<number, any>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessions()
  }, [courseId])

  const fetchSessions = async () => {
    try {
      let query = supabase
        .from('class_sessions')
        .select(`
          *,
          courses (
            title,
            instructor
          )
        `)
        .order('session_date', { ascending: true })

      if (courseId) {
        query = query.eq('course_id', courseId)
      }

      const { data, error } = await query

      if (error) throw error

      setSessions(data || [])
      
      // Fetch attendance breakdown for each session
      const breakdowns: Record<number, any> = {}
      for (const session of data || []) {
        const breakdown = await MultiDeliveryService.getSessionAttendanceBreakdown(session.id)
        breakdowns[session.id] = breakdown
      }
      setAttendanceBreakdown(breakdowns)
      
    } catch (error) {
      console.error('Error fetching sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAttendanceModeIcon = (mode: string) => {
    switch (mode) {
      case 'in-person':
        return <Users className="h-4 w-4 text-blue-600" />
      case 'jitsi':
        return <Video className="h-4 w-4 text-green-600" />
      case 'discord':
        return <MessageCircle className="h-4 w-4 text-purple-600" />
      default:
        return null
    }
  }

  const getAttendanceModeColor = (mode: string) => {
    switch (mode) {
      case 'in-person':
        return 'bg-blue-100 text-blue-800'
      case 'jitsi':
        return 'bg-green-100 text-green-800'
      case 'discord':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Class Sessions Dashboard</h2>
          <p className="text-gray-600">Monitor attendance and manage online sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-primary-600" />
          <span className="text-sm font-medium text-gray-700">
            {sessions.length} sessions
          </span>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sessions.map((session) => {
          const breakdown = attendanceBreakdown[session.id]
          const course = (session as any).courses
          
          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Session Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {course?.title || 'Course'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course?.instructor || 'Instructor'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Session</div>
                  <div className="font-semibold text-gray-900">
                    {new Date(session.sessionDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Time Info */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{session.startTime} - {session.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(session.sessionDate).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                </div>
              </div>

              {/* Attendance Breakdown */}
              {breakdown && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Attendance Breakdown</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">In-Person</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{breakdown.inPerson}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Video className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Jitsi</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{breakdown.jitsi}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <MessageCircle className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">Discord</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">{breakdown.discord}</div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-2">
                    Total: {breakdown.total} students
                  </div>
                </div>
              )}

              {/* Online Session Links */}
              <div className="space-y-3">
                {session.jitsiRoomId && (
                  <a
                    href={`https://meet.jit.si/${session.jitsiRoomId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-800">Launch Jitsi Session</div>
                        <div className="text-sm text-green-600">Room: {session.jitsiRoomId}</div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-green-600" />
                  </a>
                )}

                {session.discordInviteLink && (
                  <a
                    href={session.discordInviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-purple-800">Join Discord Channel</div>
                        <div className="text-sm text-purple-600">Voice/Video chat</div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-purple-600" />
                  </a>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors">
                    Send Reminders
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {sessions.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No sessions scheduled</h3>
          <p className="text-gray-600">Create class sessions to start tracking attendance.</p>
        </div>
      )}
    </div>
  )
}
