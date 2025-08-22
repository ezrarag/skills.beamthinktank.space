import { supabase } from './supabase'

// Types for multi-delivery system
export interface AttendanceMode {
  mode: 'in-person' | 'jitsi' | 'discord'
  sessionId: number
  userId: string
}

export interface ClassSession {
  id: number
  courseId: number
  sessionDate: string
  startTime: string
  endTime: string
  jitsiRoomId?: string
  discordChannelId?: string
  discordInviteLink?: string
}

export interface SessionAttendance {
  id: number
  sessionId: number
  userId: string
  attendanceMode: 'in-person' | 'jitsi' | 'discord'
  joinedAt?: string
  leftAt?: string
  notes?: string
}

// Jitsi Meet integration
export class JitsiService {
  private static baseUrl = 'https://meet.jit.si'
  
  static generateRoomId(courseId: number, sessionDate: string): string {
    const dateStr = sessionDate.replace(/-/g, '')
    return `beam-course-${courseId}-${dateStr}`
  }
  
  static generateRoomUrl(roomId: string): string {
    return `${this.baseUrl}/${roomId}`
  }
  
  static async createSession(courseId: number, sessionDate: string, startTime: string, endTime: string): Promise<ClassSession> {
    const jitsiRoomId = this.generateRoomId(courseId, sessionDate)
    
    const { data, error } = await supabase
      .from('class_sessions')
      .insert({
        course_id: courseId,
        session_date: sessionDate,
        start_time: startTime,
        end_time: endTime,
        jitsi_room_id: jitsiRoomId
      })
      .select()
      .single()
    
    if (error) throw error
    return data as ClassSession
  }
}

// Discord integration
export class DiscordService {
  private static botToken = process.env.DISCORD_BOT_TOKEN
  private static guildId = process.env.DISCORD_GUILD_ID
  
  static async createVoiceChannel(courseName: string, sessionDate: string): Promise<{ channelId: string; inviteLink: string }> {
    // This is a stub - you'll need to implement actual Discord API calls
    const channelName = `📚 ${courseName} - ${sessionDate}`
    
    // Mock response for now
    const channelId = `mock-channel-${Date.now()}`
    const inviteLink = `https://discord.gg/mock-invite-${Date.now()}`
    
    console.log(`Created Discord channel: ${channelName} (${channelId})`)
    console.log(`Invite link: ${inviteLink}`)
    
    return { channelId, inviteLink }
  }
  
  static async createSession(courseId: number, sessionDate: string, startTime: string, endTime: string, courseName: string): Promise<ClassSession> {
    const { channelId, inviteLink } = await this.createVoiceChannel(courseName, sessionDate)
    
    const { data, error } = await supabase
      .from('class_sessions')
      .insert({
        course_id: courseId,
        session_date: sessionDate,
        start_time: startTime,
        end_time: endTime,
        discord_channel_id: channelId,
        discord_invite_link: inviteLink
      })
      .select()
      .single()
    
    if (error) throw error
    return data as ClassSession
  }
}

// Notification service
export class NotificationService {
  static async sendAttendanceModeConfirmation(
    userId: string,
    courseId: number,
    attendanceMode: 'in-person' | 'jitsi' | 'discord',
    sessionInfo: { date: string; time: string; link?: string }
  ): Promise<void> {
    let message = ''
    
    switch (attendanceMode) {
      case 'in-person':
        message = `You selected in-person attendance for ${sessionInfo.date} at ${sessionInfo.time}. Please arrive 10 minutes early.`
        break
      case 'jitsi':
        message = `You selected Jitsi Meet for ${sessionInfo.date} at ${sessionInfo.time}. Join here: ${sessionInfo.link}`
        break
      case 'discord':
        message = `You selected Discord for ${sessionInfo.date} at ${sessionInfo.time}. Join here: ${sessionInfo.link}`
        break
    }
    
    // Store notification in database
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        course_id: courseId,
        type: 'both', // Send both SMS and email
        message,
        status: 'pending'
      })
    
    // TODO: Implement actual SMS/email sending
    console.log(`Notification sent to user ${userId}: ${message}`)
  }
  
  static async sendSMS(phone: string, message: string): Promise<boolean> {
    // TODO: Implement Twilio SMS
    console.log(`SMS to ${phone}: ${message}`)
    return true
  }
  
  static async sendEmail(email: string, subject: string, message: string): Promise<boolean> {
    // TODO: Implement SendGrid email
    console.log(`Email to ${email}: ${subject} - ${message}`)
    return true
  }
}

// Main multi-delivery service
export class MultiDeliveryService {
  static async selectAttendanceMode(
    userId: string,
    sessionId: number,
    attendanceMode: 'in-person' | 'jitsi' | 'discord'
  ): Promise<void> {
    // Update or create session attendance record
    const { error } = await supabase
      .from('session_attendance')
      .upsert({
        session_id: sessionId,
        user_id: userId,
        attendance_mode: attendanceMode,
        joined_at: new Date().toISOString()
      })
    
    if (error) throw error
    
    // Get session and course info for notification
    const { data: session } = await supabase
      .from('class_sessions')
      .select(`
        *,
        courses (
          title
        )
      `)
      .eq('id', sessionId)
      .single()
    
    if (session) {
      const courseName = (session as any).courses?.title || 'Course'
      const sessionInfo = {
        date: session.session_date,
        time: session.start_time,
        link: attendanceMode === 'jitsi' 
          ? JitsiService.generateRoomUrl(session.jitsi_room_id!)
          : session.discord_invite_link
      }
      
      await NotificationService.sendAttendanceModeConfirmation(
        userId,
        session.course_id,
        attendanceMode,
        sessionInfo
      )
    }
  }
  
  static async getSessionAttendanceBreakdown(sessionId: number): Promise<{
    inPerson: number
    jitsi: number
    discord: number
    total: number
  }> {
    const { data, error } = await supabase
      .from('session_attendance')
      .select('attendance_mode')
      .eq('session_id', sessionId)
    
    if (error) throw error
    
    const breakdown = {
      inPerson: 0,
      jitsi: 0,
      discord: 0,
      total: 0
    }
    
    data?.forEach(attendance => {
      switch (attendance.attendance_mode) {
        case 'in-person':
          breakdown.inPerson++
          break
        case 'jitsi':
          breakdown.jitsi++
          break
        case 'discord':
          breakdown.discord++
          break
      }
      breakdown.total++
    })
    
    return breakdown
  }
  
  static async createClassSession(
    courseId: number,
    sessionDate: string,
    startTime: string,
    endTime: string,
    deliveryMethod: 'jitsi' | 'discord' | 'both',
    courseName?: string
  ): Promise<ClassSession> {
    if (deliveryMethod === 'jitsi' || deliveryMethod === 'both') {
      return await JitsiService.createSession(courseId, sessionDate, startTime, endTime)
    } else if (deliveryMethod === 'discord') {
      return await DiscordService.createSession(courseId, sessionDate, startTime, endTime, courseName || 'Course')
    } else {
      // In-person only
      const { data, error } = await supabase
        .from('class_sessions')
        .insert({
          course_id: courseId,
          session_date: sessionDate,
          start_time: startTime,
          end_time: endTime
        })
        .select()
        .single()
      
      if (error) throw error
      return data as ClassSession
    }
  }
}
