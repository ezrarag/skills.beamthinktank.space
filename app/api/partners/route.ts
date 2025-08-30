import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// POST - Create new partnership application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      institutionName, 
      contactName, 
      email, 
      phone, 
      address, 
      website, 
      message, 
      selectedCourses 
    } = body

    // Validate required fields
    if (!institutionName || !contactName || !email || !address || !selectedCourses) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert new partnership application
    const { data, error } = await supabase
      .from('partner_institutions')
      .insert({
        institution_name: institutionName,
        contact_name: contactName,
        email,
        phone,
        address,
        website,
        message,
        selected_courses: selectedCourses,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating partnership:', error)
      return NextResponse.json(
        { error: 'Failed to create partnership application' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Partnership application submitted successfully',
        partnership: data 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error in POST /api/partners:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET - List partnerships (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get partnerships with status filter
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    
    let query = supabase
      .from('partner_institutions')
      .select(`
        *,
        partner_courses(count),
        partner_events(count)
      `)
      .order('created_at', { ascending: false })

    if (status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching partnerships:', error)
      return NextResponse.json(
        { error: 'Failed to fetch partnerships' },
        { status: 500 }
      )
    }

    return NextResponse.json({ partnerships: data })

  } catch (error) {
    console.error('Error in GET /api/partners:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
