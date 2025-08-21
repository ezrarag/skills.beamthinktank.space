import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types for MVP
export interface Profile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  emergency_contact?: string
  emergency_phone?: string
  special_needs?: string
  created_at: string
  updated_at: string
}

export interface Course {
  id: number
  title: string
  description: string
  long_description: string
  category: string
  price: string
  duration: string
  total_hours: number
  instructor: string
  level: string
  featured: boolean
  location: string
  start_date: string
  end_date: string
  class_time: string
  max_students: number
  enrolled_students: number
  rating: number
  created_at: string
  updated_at: string
}

export interface CourseSchedule {
  id: number
  course_id: number
  week: number
  topic: string
  description: string
  created_at: string
}

export interface CourseRequirement {
  id: number
  course_id: number
  requirement: string
  type: 'requirement' | 'outcome'
  created_at: string
}

export interface Enrollment {
  id: number
  user_id: string
  course_id: number
  status: 'pending' | 'confirmed' | 'attended' | 'cancelled'
  enrolled_at: string
  attended_at?: string
  notes?: string
}

export interface Notification {
  id: number
  user_id: string
  course_id: number
  type: 'sms' | 'email' | 'both'
  message: string
  sent_at: string
  status: 'pending' | 'sent' | 'failed'
  twilio_sid?: string
  created_at: string
}
