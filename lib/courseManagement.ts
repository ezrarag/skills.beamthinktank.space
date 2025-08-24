import { supabase } from './supabase'

export interface CourseEnrollment {
  id: number
  course_id: number
  user_id: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

export interface Course {
  id: number
  title: string
  description: string
  category: string
  duration: string
  instructor: string
  price: string
  start_date: string
  schedule: string
  location: string
  max_students: number
  current_enrollment: number
}

/**
 * Remove a course enrollment for a user
 * This function ensures consistency across all pages
 */
export const removeCourseEnrollment = async (userId: string, courseId: number): Promise<boolean> => {
  try {
    // Remove enrollment from database
    const { error } = await supabase
      .from('enrollments')
      .delete()
      .eq('user_id', userId)
      .eq('course_id', courseId)

    if (error) {
      console.error('Error removing course enrollment:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to remove course enrollment:', error)
    return false
  }
}

/**
 * Get all enrolled courses for a user
 */
export const getUserEnrollments = async (userId: string): Promise<CourseEnrollment[]> => {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['pending', 'confirmed'])

    if (error) {
      console.error('Error fetching user enrollments:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Failed to fetch user enrollments:', error)
    return []
  }
}

/**
 * Get course details for enrolled courses
 */
export const getEnrolledCourseDetails = async (enrollmentIds: number[]): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .in('id', enrollmentIds)

    if (error) {
      console.error('Error fetching course details:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Failed to fetch course details:', error)
    return []
  }
}
