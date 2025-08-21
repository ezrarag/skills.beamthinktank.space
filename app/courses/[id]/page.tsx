'use client'

import Link from 'next/link'
import { BookOpen, Clock, Users, Star, MapPin, Calendar, Heart, ArrowRight, Brain } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: "Intro to Tech for All Ages",
    description: "Learn the basics of computers, phones, and the internet. Build confidence using email, Zoom, and everyday apps safely.",
    longDescription: "This comprehensive course is designed for learners of all ages who want to build confidence with modern technology. Whether you're a senior looking to stay connected with family, a parent wanting to help your children with homework, or anyone who feels left behind by the digital world, this course will give you the skills you need to thrive in today's connected society.",
    category: "Technology",
    price: "Free (unlocked through community donations)",
    duration: "6 weeks (1.5 hrs / session)",
    totalHours: 9,
    students: 0,
    rating: 4.9,
    instructor: "BEAM Skills Volunteer Team",
    level: "Beginner",
    featured: true,
    schedule: [
      { week: 1, topic: "Computer Basics & Safety", description: "Introduction to computers, basic operations, and internet safety" },
      { week: 2, topic: "Email & Communication", description: "Setting up email, sending messages, and using communication apps" },
      { week: 3, topic: "Internet & Search", description: "Safe web browsing, search engines, and finding reliable information" },
      { week: 4, topic: "Video Calls & Zoom", description: "Making video calls, using Zoom, and staying connected virtually" },
      { week: 5, topic: "Mobile Devices", description: "Smartphone basics, apps, and mobile internet safety" },
      { week: 6, topic: "Digital Security", description: "Password management, privacy settings, and protecting your information" }
    ],
    requirements: [
      "No prior computer experience required",
      "Access to a computer or smartphone (we can help arrange if needed)",
      "Willingness to learn and ask questions",
      "Basic reading and writing skills"
    ],
    outcomes: [
      "Confidently use computers and mobile devices",
      "Send emails and make video calls",
      "Safely browse the internet",
      "Use common apps and software",
      "Protect your personal information online"
    ],
    location: "Community Center - Room A",
    startDate: "February 15, 2024",
    endDate: "March 28, 2024",
    classTime: "Thursdays, 10:00 AM - 11:30 AM"
  },
  {
    id: 2,
    title: "Intro to Car Maintenance & Repair",
    description: "Hands-on introduction to car systems, safety checks, and basic repair skills. Includes community service car clinic.",
    longDescription: "Get hands-on experience with car maintenance and repair in this practical course designed for beginners. Learn essential skills that will save you money and keep your vehicle running safely. The course includes both classroom learning and hands-on practice in our fully equipped auto shop. Plus, you'll have the opportunity to participate in our community service car clinic, helping others while practicing your new skills.",
    category: "Transportation",
    price: "Free (unlocked through community donations)",
    duration: "8 weeks (2 hrs / session)",
    totalHours: 16,
    students: 0,
    rating: 4.8,
    instructor: "BEAM Skills Volunteer Mechanics",
    level: "Beginner",
    featured: true,
    schedule: [
      { week: 1, topic: "Car Safety & Tools", description: "Safety procedures, basic tools, and workshop orientation" },
      { week: 2, topic: "Engine Basics", description: "Understanding how engines work and basic engine maintenance" },
      { week: 3, topic: "Oil & Fluids", description: "Checking and changing oil, coolant, and other essential fluids" },
      { week: 4, topic: "Brake Systems", description: "Brake inspection, maintenance, and basic repairs" },
      { week: 5, topic: "Tires & Wheels", description: "Tire safety, rotation, and basic wheel maintenance" },
      { week: 6, topic: "Electrical Systems", description: "Battery maintenance, lights, and basic electrical troubleshooting" },
      { week: 7, topic: "Preventive Maintenance", description: "Regular maintenance schedules and DIY service tasks" },
      { week: 8, topic: "Community Service Clinic", description: "Practice skills by helping others with their vehicles" }
    ],
    requirements: [
      "No prior automotive experience required",
      "Comfortable working with tools and getting hands dirty",
      "Closed-toe shoes and appropriate work clothing",
      "Basic math and reading skills"
    ],
    outcomes: [
      "Perform basic car maintenance and safety checks",
      "Change oil and other fluids",
      "Inspect and maintain brake systems",
      "Rotate tires and perform basic wheel maintenance",
      "Troubleshoot common car problems",
      "Understand when to seek professional help"
    ],
    location: "Auto Shop - Bay 3",
    startDate: "February 16, 2024",
    endDate: "April 5, 2024",
    classTime: "Fridays, 2:00 PM - 4:00 PM"
  },
  {
    id: 3,
    title: "Orchestra Repertoire for Beginners",
    description: "A welcoming introduction to orchestral music for beginners. Learn how to explore, prepare, and perform standard orchestra repertoire. Students will be guided through essential resources, performance history, technical lessons, and rehearsal prep skills to build a solid foundation in orchestral playing.",
    longDescription: "Discover the joy of orchestral music in this welcoming course designed for beginners. Whether you're a complete newcomer to classical music or have some musical background, you'll learn how to explore, prepare, and appreciate standard orchestra repertoire. Our experienced music volunteers will guide you through essential resources, performance history, technical lessons, and rehearsal preparation skills to build a solid foundation in orchestral playing.",
    category: "Community Skills",
    price: "Free (unlocked through community donations)",
    duration: "16 weeks (1.5 hrs / session)",
    totalHours: 24,
    students: 0,
    rating: 4.7,
    instructor: "BEAM Skills Music Volunteers",
    level: "Beginner",
    featured: true,
    schedule: [
      { week: 1, topic: "Introduction to Orchestra", description: "What is an orchestra, different sections, and basic terminology" },
      { week: 2, topic: "Finding & Reading Scores", description: "How to locate and understand orchestral sheet music" },
      { week: 3, topic: "Performance History", description: "Major orchestral works and their cultural significance" },
      { week: 4, topic: "String Family Basics", description: "Violin, viola, cello, and double bass fundamentals" },
      { week: 5, topic: "Woodwind Family", description: "Flute, clarinet, oboe, and bassoon basics" },
      { week: 6, topic: "Brass Family", description: "Trumpet, trombone, French horn, and tuba fundamentals" },
      { week: 7, topic: "Percussion Section", description: "Drums, cymbals, and other percussion instruments" },
      { week: 8, topic: "Rehearsal Techniques", description: "How to prepare for and participate in ensemble rehearsals" },
      { week: 9, topic: "Score Analysis", description: "Understanding musical structure and conductor cues" },
      { week: 10, topic: "Performance Preparation", description: "Mental and physical preparation for performances" },
      { week: 11, topic: "Ensemble Skills", description: "Playing together, listening, and blending with other musicians" },
      { week: 12, topic: "Classical Period", description: "Haydn, Mozart, and early orchestral music" },
      { week: 13, topic: "Romantic Period", description: "Beethoven, Brahms, and 19th century orchestral works" },
      { week: 14, topic: "Modern Era", description: "20th and 21st century orchestral compositions" },
      { week: 15, topic: "Performance Practice", description: "Historical performance techniques and modern interpretations" },
      { week: 16, topic: "Final Performance", description: "Showcase your learning in a group performance" }
    ],
    requirements: [
      "No prior orchestral experience required",
      "Basic reading skills (musical notation helpful but not required)",
      "Interest in classical and orchestral music",
      "Willingness to participate in group activities",
      "Bring your instrument if you have one (we can help arrange if needed)"
    ],
    outcomes: [
      "Understand orchestral music structure and history",
      "Read and interpret orchestral scores",
      "Recognize different instrument families and their roles",
      "Prepare for and participate in ensemble rehearsals",
      "Appreciate classical music from different periods",
      "Build confidence as a new orchestral musician"
    ],
    location: "Library - Music Room",
    startDate: "February 17, 2024",
    endDate: "June 8, 2024",
    classTime: "Sundays, 1:00 PM - 2:30 PM"
  }
]

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find(c => c.id === parseInt(params.id))
  
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link href="/courses" className="btn-primary">
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
              {course.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{course.title}</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            {course.description}
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Course Overview */}
            <div className="card">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {course.longDescription}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{course.totalHours}</div>
                  <div className="text-sm text-gray-600">Total Hours</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{course.duration.split(' ')[0]}</div>
                  <div className="text-sm text-gray-600">Weeks</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{course.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{course.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Course Schedule */}
            <div className="card">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Schedule</h2>
              <div className="space-y-4">
                {course.schedule.map((week) => (
                  <div key={week.week} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {week.week}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{week.topic}</h4>
                      <p className="text-gray-600">{week.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements & Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Need</h3>
                <ul className="space-y-3">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="card">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  {course.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sticky top-24 space-y-8 self-start">
            {/* Enrollment Card */}
            <div className="card">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">{course.price}</div>
                <p className="text-gray-600">Community funded program</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{course.startDate} - {course.endDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{course.classTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 text-primary-600 mr-3" />
                  <span>Instructor: {course.instructor}</span>
                </div>
              </div>
              
              <Link href={`/enroll/${course.id}`} className="btn-primary w-full text-center text-lg py-4">
                Enroll Now
              </Link>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                Limited spots available • First come, first served
              </p>
            </div>

            {/* Instructor Info */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About the Instructor</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{course.instructor}</div>
                  <div className="text-sm text-gray-600">Volunteer Team</div>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                Our volunteer instructors are experienced professionals passionate about sharing their knowledge and helping others succeed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
