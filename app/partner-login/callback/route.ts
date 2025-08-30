import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/partner-login?error=${error}`)
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/partner-login?error=no_code`)
    }

    // Exchange code for session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/partner-login?error=exchange_failed`)
    }

    if (!data.user) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/partner-login?error=no_user`)
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
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/institution-dashboard`)
      } else {
        // Redirect to pending status page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/partner-login?status=pending`)
      }
    } else {
      // No partnership found, redirect to application
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/contact`)
    }

  } catch (error) {
    console.error('Error in OAuth callback:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/partner-login?error=callback_failed`)
  }
}
