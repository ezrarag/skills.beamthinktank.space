import Link from 'next/link'
import { BookOpen, Brain } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-gray-200/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary-600" />
              <span className="ml-3 text-2xl font-bold text-gray-900 font-heading">SkillCraft</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <Link href="/courses" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Courses</Link>
              <Link href="/instructors" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Instructors</Link>
              <Link href="/schedule" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Schedule</Link>
              <Link href="/certifications" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">Certifications</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-4 py-2">Sign In</Link>
              <Link href="/register" className="btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full">
                  PROFESSIONAL SKILLS TRAINING
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Trade Skills..
                <span className="block text-primary-600">Find yourself.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                Free training across technology, trades, arts, and civic skills.
                From coding to car repair, from orchestra performance to understanding legislation — every course builds knowledge, confidence, and real-world pathways to certification.
                Certified participants can apply their skills in BEAM projects, products, and services that strengthen the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/courses" className="btn-primary text-lg px-8 py-4">
                  Browse Courses
                </Link>
                <Link href="/schedule" className="btn-secondary text-lg px-8 py-4">
                  View Schedule
                </Link>
              </div>
            </div>
            
            {/* Right Column - Image with Overlays */}
            <div className="relative">
              <div className="relative rounded-3xl h-96 overflow-hidden">
                <img 
                  src="https://sdyyvwazlkcihsrivnff.supabase.co/storage/v1/object/public/home/pexels-kampus-7983573.jpg"
                  alt="Students learning together in a supportive environment"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Labels */}
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                  <span className="text-primary-700 font-semibold">Convenient</span>
                </div>
                <div className="absolute top-20 right-8 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                  <span className="text-primary-700 font-semibold">Caring</span>
                </div>
                <div className="absolute bottom-20 left-12 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                  <span className="text-primary-700 font-semibold">Confidential</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
