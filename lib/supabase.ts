import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Course {
  id: number
  title: string
  description: string
  category: string
  price: number
  duration: number
  instructor_id: number
  max_students: number
  current_students: number
  created_at: string
  updated_at: string
}

export interface Instructor {
  id: number
  name: string
  bio: string
  expertise: string[]
  avatar_url?: string
  rating: number
  total_students: number
  created_at: string
}

export interface Enrollment {
  id: number
  user_id: string
  course_id: number
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  enrolled_at: string
  completed_at?: string
}

export interface Certification {
  id: number
  user_id: string
  course_id: number
  issued_at: string
  certificate_url?: string
  valid_until?: string
}
