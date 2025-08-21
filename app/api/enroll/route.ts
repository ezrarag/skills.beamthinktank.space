import { NextRequest, NextResponse } from 'next/server'

// Only import Supabase if environment variables are available
let supabase: any = null
try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { supabase: supabaseClient } = require('@/lib/supabase')
    supabase = supabaseClient
  }
} catch (error) {
  console.warn('Supabase not configured, API will return mock responses')
}

// Free SMS via Email Gateway (works with most carriers)
async function sendSMSViaEmail(phone: string, message: string) {
  const carriers = {
    'att': '@txt.att.net',
    'verizon': '@vtext.com',
    'tmobile': '@tmomail.net',
    'sprint': '@messaging.sprintpcs.com',
    'virgin': '@vmobl.com',
    'boost': '@myboostmobile.com',
    'cricket': '@sms.cricketwireless.net',
    'metro': '@mymetropcs.com',
    'uscellular': '@email.uscc.net',
    'googlefi': '@msg.fi.google.com'
  }
  
  // Try to detect carrier from phone number or use default
  const carrier = 'att' // Default to AT&T
  const emailAddress = phone + carriers[carrier as keyof typeof carriers]
  
  // Use Supabase Edge Function or external email service
  console.log(`SMS via Email Gateway: ${emailAddress}`, message)
  
  // For now, just log. You can integrate with SendGrid, Mailgun, or Supabase Edge Functions
  return { success: true, method: 'email_gateway' }
}

// WhatsApp Business API (free tier available)
async function sendWhatsAppMessage(phone: string, message: string) {
  // You'll need to set up WhatsApp Business API
  console.log(`WhatsApp message to ${phone}:`, message)
  return { success: true, method: 'whatsapp' }
}

// Telegram Bot (completely free)
async function sendTelegramMessage(chatId: string, message: string) {
  // You'll need to create a Telegram bot and get chat IDs
  console.log(`Telegram message to ${chatId}:`, message)
  return { success: true, method: 'telegram' }
}

export async function POST(request: NextRequest) {
  try {
    // If Supabase is not configured, return mock response for development
    if (!supabase) {
      console.log('Mock enrollment response - Supabase not configured')
      return NextResponse.json({
        success: true,
        enrollment: { id: 1, status: 'confirmed' },
        message: 'Mock enrollment successful (Supabase not configured)'
      })
    }

    const body = await request.json()
    const { courseId, userData } = body

    // Get user from Supabase auth context
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Check if course exists and has available spots
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single()

    if (courseError || !course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    if (course.enrolled_students >= course.max_students) {
      return NextResponse.json({ error: 'Course is full' }, { status: 400 })
    }

    // Check if user is already enrolled
    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single()

    if (existingEnrollment) {
      return NextResponse.json({ error: 'Already enrolled in this course' }, { status: 400 })
    }

    // Update user profile with additional info
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        emergency_contact: userData.emergencyContact,
        emergency_phone: userData.emergencyPhone,
        special_needs: userData.specialNeeds,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (profileError) {
      console.error('Profile update error:', profileError)
    }

    // Create enrollment
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.id,
        course_id: courseId,
        status: 'confirmed'
      })
      .select()
      .single()

    if (enrollmentError) {
      return NextResponse.json({ error: 'Failed to create enrollment' }, { status: 500 })
    }

    // Send notification using multiple methods
    const notificationMessage = `🎉 Welcome to ${course.title}! Your enrollment is confirmed. Class starts ${course.start_date} at ${course.class_time}. Location: ${course.location}. We'll send reminders before each class.`
    
    let notificationResult = null
    
    try {
      // Try multiple notification methods
      if (process.env.ENABLE_SMS_EMAIL_GATEWAY === 'true') {
        // Free SMS via Email Gateway
        notificationResult = await sendSMSViaEmail(userData.phone, notificationMessage)
      } else if (process.env.WHATSAPP_BUSINESS_TOKEN) {
        // WhatsApp Business API
        notificationResult = await sendWhatsAppMessage(userData.phone, notificationMessage)
      } else if (process.env.TELEGRAM_BOT_TOKEN) {
        // Telegram Bot (you'd need to store chat_id in user profile)
        notificationResult = await sendTelegramMessage(user.id, notificationMessage)
      } else if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        // Fallback to Twilio if configured
        const twilio = require('twilio')
        const twilioClient = twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        )

        const message = await twilioClient.messages.create({
          body: notificationMessage,
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: userData.phone
        })
        
        notificationResult = { success: true, method: 'twilio', sid: message.sid }
      } else {
        // No SMS service configured, just log
        console.log('No SMS service configured. Message would be:', {
          to: userData.phone,
          message: notificationMessage
        })
        notificationResult = { success: true, method: 'console_log' }
      }

      // Store notification record
      await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          course_id: courseId,
          type: 'sms',
          message: `Welcome to ${course.title}! Enrollment confirmed.`,
          status: notificationResult?.success ? 'sent' : 'failed'
        })

    } catch (notificationError) {
      console.error('Notification sending failed:', notificationError)
      // Don't fail the enrollment if notification fails
    }

    return NextResponse.json({
      success: true,
      enrollment,
      notification: notificationResult,
      message: 'Successfully enrolled in course'
    })

  } catch (error) {
    console.error('Enrollment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
