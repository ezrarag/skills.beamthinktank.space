'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, ChevronDown, ChevronUp, Phone, User, Mail, MapPin, Calendar, Edit3, Save } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface SetupTask {
  id: string
  title: string
  description: string
  icon: any
  completed: boolean
  required: boolean
}

interface SetupGuideProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  onDataUpdate?: () => void
}

export default function SetupGuide({ isOpen, onClose, userId, onDataUpdate }: SetupGuideProps) {
  const [tasks, setTasks] = useState<SetupTask[]>([])
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: ''
  })
  const [saving, setSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserData()
    }
  }, [isOpen, userId])

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      // Fetch enrollments
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)

      // Create tasks based on user data
      const setupTasks: SetupTask[] = [
        {
          id: 'phone',
          title: 'Add Phone Number',
          description: 'Enter your phone number to receive SMS notifications about your courses',
          icon: Phone,
          completed: !!profile?.phone,
          required: true
        },
        {
          id: 'profile',
          title: 'Complete Profile',
          description: 'Add your first and last name for a personalized experience',
          icon: User,
          completed: !!(profile?.first_name && profile?.last_name),
          required: true
        },
        {
          id: 'emergency',
          title: 'Emergency Contact',
          description: 'Add an emergency contact for safety during in-person classes',
          icon: User,
          completed: !!(profile?.emergency_contact && profile?.emergency_phone),
          required: false
        },
        {
          id: 'enrollment',
          title: 'Enroll in a Course',
          description: 'Choose and enroll in your first course to get started',
          icon: Calendar,
          completed: (enrollments?.length || 0) > 0,
          required: true
        },
        {
          id: 'attendance',
          title: 'Select Attendance Mode',
          description: 'Choose how you want to attend your enrolled courses',
          icon: MapPin,
          completed: false, // This will be checked dynamically
          required: false
        }
      ]

      // Check attendance mode for enrolled courses
      if (enrollments && enrollments.length > 0) {
        const hasAttendanceMode = enrollments.some((enrollment: any) => 
          enrollment.attendance_mode && enrollment.attendance_mode !== 'in-person'
        )
        setupTasks.find(task => task.id === 'attendance')!.completed = hasAttendanceMode
      }

      setTasks(setupTasks)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error)
      setLoading(false)
    }
  }

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId)
    } else {
      newExpanded.add(taskId)
    }
    setExpandedTasks(newExpanded)
  }

  const getProgressPercentage = () => {
    const completed = tasks.filter(task => task.completed).length
    return Math.round((completed / tasks.length) * 100)
  }

  const handleEditTask = (taskId: string) => {
    setEditingTask(taskId)
    // Pre-fill form with existing data if available
    if (taskId === 'profile' && tasks.find(t => t.id === 'profile')?.completed) {
      // Extract name from existing data
      const nameParts = tasks.find(t => t.id === 'profile')?.title.split(' ') || []
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts[1] || ''
      }))
    }
  }

  const handleSaveTask = async (taskId: string) => {
    setSaving(true)
    try {
      let updateData: any = {}
      
      switch (taskId) {
        case 'profile':
          updateData = {
            first_name: formData.firstName,
            last_name: formData.lastName
          }
          break
        case 'phone':
          updateData = { phone: formData.phone }
          break
        case 'emergency':
          updateData = {
            emergency_contact: formData.emergencyContact,
            emergency_phone: formData.emergencyPhone
          }
          break
      }

      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)

      if (error) throw error

      // Refresh tasks to update completion status
      await fetchUserData()
      setEditingTask(null)
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        emergencyContact: '',
        emergencyPhone: ''
      })
      
      // Notify parent component to refresh data
      if (onDataUpdate) {
        onDataUpdate()
      }
      
      // Show success message
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)

    } catch (error) {
      console.error('Error saving task:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Setup Guide</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <p className="text-sm text-white/90">
            {getProgressPercentage()}% Complete
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading setup tasks...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => {
                const Icon = task.icon
                const isExpanded = expandedTasks.has(task.id)
                
                return (
                  <div
                    key={task.id}
                    className={`border rounded-xl transition-all duration-200 ${
                      task.completed 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <button
                      onClick={() => toggleTaskExpansion(task.id)}
                      className="w-full p-4 text-left flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          task.completed 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {task.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Icon className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h3 className={`font-medium ${
                            task.completed ? 'text-green-800' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h3>
                          <p className={`text-sm ${
                            task.completed ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {task.required ? 'Required' : 'Optional'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {task.completed && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Complete
                          </span>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 border-t border-gray-100"
                      >
                        <p className="text-sm text-gray-600 mt-3 mb-3">
                          {task.description}
                        </p>
                        {!task.completed && (
                          <div className="space-y-3">
                            {task.id === 'phone' && (
                              <div className="space-y-2">
                                <input
                                  type="tel"
                                  placeholder="Enter phone number"
                                  value={formData.phone}
                                  onChange={(e) => handleInputChange('phone', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <button
                                  onClick={() => handleSaveTask('phone')}
                                  disabled={saving || !formData.phone}
                                  className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                  {saving ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                      Saving...
                                    </>
                                  ) : (
                                    <>
                                      <Save className="h-4 w-4" />
                                      Save Phone
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                            
                            {task.id === 'profile' && (
                              <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                </div>
                                <button
                                  onClick={() => handleSaveTask('profile')}
                                  disabled={saving || !formData.firstName || !formData.lastName}
                                  className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                  {saving ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                      Saving...
                                    </>
                                  ) : (
                                    <>
                                      <Save className="h-4 w-4" />
                                      Save Profile
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                            
                            {task.id === 'emergency' && (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  placeholder="Emergency contact name"
                                  value={formData.emergencyContact}
                                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <input
                                  type="tel"
                                  placeholder="Emergency contact phone"
                                  value={formData.emergencyPhone}
                                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <button
                                  onClick={() => handleSaveTask('emergency')}
                                  disabled={saving || !formData.emergencyContact || !formData.emergencyPhone}
                                  className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                  {saving ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                      Saving...
                                    </>
                                  ) : (
                                    <>
                                      <Save className="h-4 w-4" />
                                      Save Emergency Contact
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                            
                            {task.id === 'enrollment' && (
                              <button
                                onClick={() => window.open('/courses', '_blank')}
                                className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2"
                              >
                                <Calendar className="h-4 w-4" />
                                Browse Courses
                              </button>
                            )}
                            
                            {task.id === 'attendance' && (
                              <button
                                onClick={() => window.open('/schedule', '_blank')}
                                className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2"
                              >
                                <MapPin className="h-4 w-4" />
                                Select Attendance Mode
                              </button>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <p className="text-xs text-gray-500 text-center">
            Complete these tasks to get the most out of your BEAM Skills experience
          </p>
        </div>
        
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Task completed successfully!</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
