import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Create a comprehensive mock client for build time when env vars aren't set
const createMockClient = () => {
  const mockQuery: any = () => ({
    eq: mockQuery,
    neq: mockQuery,
    gt: mockQuery,
    gte: mockQuery,
    lt: mockQuery,
    lte: mockQuery,
    like: mockQuery,
    ilike: mockQuery,
    is: mockQuery,
    in: mockQuery,
    contains: mockQuery,
    containedBy: mockQuery,
    rangeGt: mockQuery,
    rangeGte: mockQuery,
    rangeLt: mockQuery,
    rangeLte: mockQuery,
    rangeAdjacent: mockQuery,
    overlaps: mockQuery,
    textSearch: mockQuery,
    filter: mockQuery,
    match: mockQuery,
    not: mockQuery,
    or: mockQuery,
    order: mockQuery,
    limit: mockQuery,
    range: mockQuery,
    single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    maybeSingle: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    then: (onFulfilled?: any) => Promise.resolve({ data: [], error: new Error('Supabase not configured') }).then(onFulfilled)
  })

  return {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase not configured') }),
      signInWithOAuth: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      exchangeCodeForSession: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
    },
    from: () => ({
      select: () => mockQuery(),
      insert: () => mockQuery(),
      update: () => mockQuery(),
      upsert: () => mockQuery(),
      delete: () => mockQuery()
    }),
    rpc: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        download: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  }
}

export const supabase = supabaseUrl.includes('placeholder') ? createMockClient() : createClient(supabaseUrl, supabaseAnonKey, {
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
