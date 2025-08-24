/**
 * Google Calendar Integration Utilities
 * Handles adding course sessions to Google Calendar
 */

export interface CalendarEvent {
  title: string
  description: string
  startTime: string
  endTime: string
  location?: string
  instructor?: string
}

/**
 * Generate a Google Calendar event URL
 * This opens Google Calendar in a new tab with pre-filled event details
 */
export const generateGoogleCalendarUrl = (event: CalendarEvent): string => {
  const startDate = new Date(event.startTime)
  const endDate = new Date(event.endTime)
  
  // Format dates for Google Calendar
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }
  
  const start = formatDate(startDate)
  const end = formatDate(endDate)
  
  // Build the Google Calendar URL
  const baseUrl = 'https://calendar.google.com/calendar/render'
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: `${event.description}\n\nInstructor: ${event.instructor || 'TBD'}`,
    location: event.location || 'TBD',
    sf: 'true',
    output: 'xml'
  })
  
  return `${baseUrl}?${params.toString()}`
}

/**
 * Add a course session to Google Calendar
 * Opens Google Calendar in a new tab with pre-filled event details
 */
export const addToGoogleCalendar = (event: CalendarEvent): void => {
  const calendarUrl = generateGoogleCalendarUrl(event)
  window.open(calendarUrl, '_blank')
}

/**
 * Parse course schedule string to extract date and time
 * Example: "Tuesdays, 6:00 PM - 7:30 PM"
 */
export const parseScheduleString = (schedule: string): { startTime: string; endTime: string } | null => {
  try {
    // Extract time range from schedule string
    const timeMatch = schedule.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/)
    if (!timeMatch) return null
    
    const [, startHour, startMinute, startPeriod, endHour, endMinute, endPeriod] = timeMatch
    
    // Convert to 24-hour format
    const convertTo24Hour = (hour: string, period: string) => {
      let h = parseInt(hour)
      if (period === 'PM' && h !== 12) h += 12
      if (period === 'AM' && h === 12) h = 0
      return h
    }
    
    const startHour24 = convertTo24Hour(startHour, startPeriod)
    const endHour24 = convertTo24Hour(endHour, endPeriod)
    
    // Get next occurrence of the day
    const today = new Date()
    const nextTuesday = new Date(today)
    const daysUntilTuesday = (2 - today.getDay() + 7) % 7
    nextTuesday.setDate(today.getDate() + daysUntilTuesday)
    
    // Set the time
    const startTime = new Date(nextTuesday)
    startTime.setHours(startHour24, parseInt(startMinute), 0, 0)
    
    const endTime = new Date(nextTuesday)
    endTime.setHours(endHour24, parseInt(endMinute), 0, 0)
    
    return {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    }
  } catch (error) {
    console.error('Error parsing schedule string:', error)
    return null
  }
}

/**
 * Create a calendar event from course data
 */
export const createCourseCalendarEvent = (
  courseTitle: string,
  schedule: string,
  location: string = 'TBD',
  instructor: string = 'TBD',
  description: string = ''
): CalendarEvent | null => {
  const times = parseScheduleString(schedule)
  if (!times) return null
  
  return {
    title: courseTitle,
    description: description || `Course session for ${courseTitle}`,
    startTime: times.startTime,
    endTime: times.endTime,
    location,
    instructor
  }
}
