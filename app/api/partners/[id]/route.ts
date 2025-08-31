import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'

const supabase = supabaseUrl.includes('placeholder') ? null : createClient(supabaseUrl, supabaseServiceKey)

// GET - Get specific partnership details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }
  
  try {
    const { id } = params

    const { data, error } = await supabase
      .from('partner_institutions')
      .select(`
        *,
        partner_courses(*),
        partner_events(*),
        partner_students(*)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching partnership:', error)
      return NextResponse.json(
        { error: 'Partnership not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ partnership: data })

  } catch (error) {
    console.error('Error in GET /api/partners/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update partnership status (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }
  
  try {
    const { id } = params
    const body = await request.json()
    const { status, approvedBy } = body

    // Validate status
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const updateData: any = { status }
    
    if (status === 'approved') {
      updateData.approved_at = new Date().toISOString()
      updateData.approved_by = approvedBy
    }

    const { data, error } = await supabase
      .from('partner_institutions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating partnership:', error)
      return NextResponse.json(
        { error: 'Failed to update partnership' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Partnership updated successfully',
      partnership: data 
    })

  } catch (error) {
    console.error('Error in PUT /api/partners/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete partnership (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }
  
  try {
    const { id } = params

    const { error } = await supabase
      .from('partner_institutions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting partnership:', error)
      return NextResponse.json(
        { error: 'Failed to delete partnership' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Partnership deleted successfully' 
    })

  } catch (error) {
    console.error('Error in DELETE /api/partners/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
