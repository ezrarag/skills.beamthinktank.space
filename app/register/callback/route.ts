import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering for OAuth callback
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const userType = searchParams.get('type')

  if (!code) {
    return NextResponse.redirect(new URL('/register?error=no_code', baseUrl))
  }

  try {
    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(new URL('/register?error=auth_failed', baseUrl))
    }

    if (!data.user) {
      return NextResponse.redirect(new URL('/register?error=no_user', baseUrl))
    }

    // Redirect based on user type
    switch (userType) {
      case 'participant':
        // Check if user has existing BEAM participant data
        // For now, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', baseUrl))
      
      case 'partner':
        // Check if user has existing partnership
        const { data: partnership } = await supabase
          .from('partner_institutions')
          .select('*')
          .eq('user_id', data.user.id)
          .eq('status', 'approved')
          .single()

        if (partnership) {
          // User has approved partnership, redirect to institution dashboard
          return NextResponse.redirect(new URL('/institution-dashboard', baseUrl))
        } else {
          // No partnership or not approved, redirect to contact form
          return NextResponse.redirect(new URL('/contact', baseUrl))
        }
      
      case 'community':
        // New community member, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', baseUrl))
      
      default:
        // Default to dashboard
        return NextResponse.redirect(new URL('/dashboard', baseUrl))
    }

  } catch (error) {
    console.error('Error in OAuth callback:', error)
    return NextResponse.redirect(new URL('/register?error=callback_failed', baseUrl))
  }
}
