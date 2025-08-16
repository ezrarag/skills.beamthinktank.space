import Link from 'next/link'
import { Calendar, Users, Award, BookOpen, Filter, Search } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SkillCraft</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/courses" className="text-gray-700 hover:text-primary-600">Courses</Link>
              <Link href="/instructors" className="text-gray-700 hover:text-primary-600">Instructors</Link>
              <Link href="/schedule" className="text-gray-700 hover:text-primary-600">Schedule</Link>
              <Link href="/certifications" className="text-gray-700 hover:text-primary-600">Certifications</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn-secondary">Sign In</Link>
              <Link href="/register" className="btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master New Skills
            <span className="block text-primary-200">Advance Your Career</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals learning from expert instructors. 
            Get certified and unlock new opportunities in your field.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
              Browse Courses
            </Link>
            <Link href="/schedule" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary-700">
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for courses, skills, or instructors..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-lg text-gray-600">Start with our most popular skill-building programs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary-600" />
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full mb-2">
                    {course.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students} students
                  </div>
                  <div className="text-2xl font-bold text-primary-600">${course.price}</div>
                </div>
                <Link href={`/courses/${course.id}`} className="btn-primary w-full mt-4 text-center">
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">SkillCraft</span>
              </div>
              <p className="text-gray-400">Empowering professionals with world-class skills training.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link href="/instructors" className="hover:text-white">Instructors</Link></li>
                <li><Link href="/schedule" className="hover:text-white">Schedule</Link></li>
                <li><Link href="/certifications" className="hover:text-white">Certifications</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkillCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const featuredCourses = [
  {
    id: 1,
    title: "Advanced Web Development",
    description: "Master modern web technologies including React, Node.js, and cloud deployment.",
    category: "Technology",
    students: 1247,
    price: 299
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description: "Learn data analysis, visualization, and machine learning basics.",
    category: "Data",
    students: 892,
    price: 399
  },
  {
    id: 3,
    title: "Digital Marketing Strategy",
    description: "Develop comprehensive marketing campaigns across all digital channels.",
    category: "Marketing",
    students: 1563,
    price: 199
  }
]
