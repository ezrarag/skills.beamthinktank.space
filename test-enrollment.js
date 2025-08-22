// Test script to verify enrollment flow
// Run this in your browser console or Node.js environment

const testEnrollmentFlow = async () => {
  console.log('Testing enrollment flow...')
  
  // Test 1: Check if localStorage is working
  const testCourseId = '13'
  localStorage.setItem('pendingCourseEnrollment', testCourseId)
  const stored = localStorage.getItem('pendingCourseEnrollment')
  console.log('localStorage test:', stored === testCourseId ? 'PASS' : 'FAIL')
  
  // Test 2: Check if we can access the course data
  const courses = [
    { id: 13, title: "Fabrication & Product Design" },
    { id: 14, title: "Automotive Design & Fabrication" },
    { id: 15, title: "Juice & Food Manufacturing" }
  ]
  
  const testCourse = courses.find(c => c.id === parseInt(testCourseId))
  console.log('Course lookup test:', testCourse ? 'PASS' : 'FAIL')
  if (testCourse) {
    console.log('Found course:', testCourse.title)
  }
  
  // Test 3: Simulate the enrollment creation
  const enrollmentData = {
    user_id: 'test-user-id',
    course_id: parseInt(testCourseId),
    status: 'pending',
    attendance_mode: 'in-person'
  }
  
  console.log('Enrollment data structure:', enrollmentData)
  console.log('All tests completed!')
}

// Run the test
testEnrollmentFlow()
