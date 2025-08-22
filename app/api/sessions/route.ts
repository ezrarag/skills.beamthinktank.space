import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { MultiDeliveryService } from '@/lib/multi-delivery'

export async function POST(request: NextRequest) {
  try {
    const { courseId, sessionDate, startTime, endTime, deliveryMethod, courseName } = await request.json()

    // Validate required fields
    if (!courseId || !sessionDate || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create class session
    const session = await MultiDeliveryService.createClassSession(
      courseId,
      sessionDate,
      startTime,
      endTime,
      deliveryMethod || 'in-person',
      courseName
    )

    return NextResponse.json({
      success: true,
      session
    })

  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

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

    return NextResponse.json({
      success: true,
      sessions: data
    })

  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}
