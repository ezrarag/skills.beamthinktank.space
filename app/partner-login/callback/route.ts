import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Force dynamic rendering for OAuth callback
export const dynamic = 'force-dynamic'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'

const supabase = supabaseUrl.includes('placeholder') ? null : createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  if (!supabase) {
    return NextResponse.redirect(new URL('/partner-login?error=config', baseUrl))
  }
  
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    
    if (error) {
      return NextResponse.redirect(new URL(`/partner-login?error=${error}`, baseUrl))
    }

    if (!code) {
      return NextResponse.redirect(new URL('/partner-login?error=no_code', baseUrl))
    }

    // Exchange code for session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError)
      return NextResponse.redirect(new URL('/partner-login?error=exchange_failed', baseUrl))
    }

    if (!data.user) {
      return NextResponse.redirect(new URL('/partner-login?error=no_user', baseUrl))
    }

    // Check if user has an existing partnership
    const { data: partnership } = await supabase
      .from('partner_institutions')
      .select('*')
      .eq('user_id', data.user.id)
      .single()

    if (partnership) {
      if (partnership.status === 'approved') {
        // Redirect to dashboard if approved
        return NextResponse.redirect(new URL('/institution-dashboard', baseUrl))
      } else {
        // Redirect to pending status page
        return NextResponse.redirect(new URL('/partner-login?status=pending', baseUrl))
      }
    } else {
      // No partnership found, redirect to application
      return NextResponse.redirect(new URL('/contact', baseUrl))
    }

  } catch (error) {
    console.error('Error in OAuth callback:', error)
    return NextResponse.redirect(new URL('/partner-login?error=callback_failed', baseUrl))
  }
}
