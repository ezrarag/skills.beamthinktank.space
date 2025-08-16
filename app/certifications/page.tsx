'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Award, Download, Eye, Filter, Search, CheckCircle, Clock, Star } from 'lucide-react'

const certifications = [
  {
    id: 1,
    course: "Advanced Web Development",
    instructor: "Sarah Johnson",
    issuedDate: "2024-01-10",
    expiryDate: "2027-01-10",
    status: "active",
    score: 95,
    certificateUrl: "/certificates/web-dev-cert.pdf",
    category: "Technology",
    hoursCompleted: 40,
    skills: ["React", "Node.js", "Cloud Architecture", "API Design"]
  },
  {
    id: 2,
    course: "Data Science Fundamentals",
    instructor: "Dr. Michael Chen",
    issuedDate: "2023-12-15",
    expiryDate: "2026-12-15",
    status: "active",
    score: 92,
    certificateUrl: "/certificates/data-science-cert.pdf",
    category: "Data",
    hoursCompleted: 50,
    skills: ["Python", "Machine Learning", "Data Analysis", "Statistics"]
  },
  {
    id: 3,
    course: "Digital Marketing Strategy",
    instructor: "Emma Rodriguez",
    issuedDate: "2023-11-20",
    expiryDate: "2026-11-20",
    status: "active",
    score: 88,
    certificateUrl: "/certificates/marketing-cert.pdf",
    category: "Marketing",
    hoursCompleted: 30,
    skills: ["SEO", "Social Media", "Content Strategy", "Analytics"]
  },
  {
    id: 4,
    course: "UI/UX Design Principles",
    instructor: "Alex Thompson",
    issuedDate: "2023-10-05",
    expiryDate: "2026-10-05",
    status: "expired",
    score: 91,
    certificateUrl: "/certificates/design-cert.pdf",
    category: "Design",
    hoursCompleted: 35,
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"]
  },
  {
    id: 5,
    course: "Business Analytics",
    instructor: "Lisa Wang",
    issuedDate: "2023-09-12",
    expiryDate: "2026-09-12",
    status: "active",
    score: 89,
    certificateUrl: "/certificates/analytics-cert.pdf",
    category: "Business",
    hoursCompleted: 45,
    skills: ["SQL", "Data Visualization", "Tableau", "Strategic Analysis"]
  }
]

const categories = ['All', 'Technology', 'Data', 'Marketing', 'Design', 'Business', 'Finance']
const statuses = ['All', 'active', 'expired', 'pending']

export default function CertificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  const filteredCertifications = certifications.filter(cert => {
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || cert.status === selectedStatus
    const matchesSearch = cert.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const sortedCertifications = [...filteredCertifications].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.score - a.score
      case 'oldest':
        return new Date(a.issuedDate).getTime() - new Date(b.issuedDate).getTime()
      case 'expiring':
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
      default:
        return new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
    }
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </span>
      case 'expired':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <Clock className="h-3 w-3 mr-1" />
          Expired
        </span>
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </span>
      default:
        return null
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const now = new Date()
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certifications</h1>
          <p className="text-lg text-gray-600">Track your learning achievements and professional certifications</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Status</h4>
                <div className="space-y-2">
                  {statuses.map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={selectedStatus === status}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="mr-2 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Certificates</span>
                  <span className="text-sm font-medium">{certifications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active</span>
                  <span className="text-sm font-medium text-green-600">
                    {certifications.filter(c => c.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expired</span>
                  <span className="text-sm font-medium text-red-600">
                    {certifications.filter(c => c.status === 'expired').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Score</span>
                  <span className="text-sm font-medium">
                    {Math.round(certifications.reduce((acc, c) => acc + c.score, 0) / certifications.length)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search certifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-full sm:w-auto"
              >
                <option value="recent">Most Recent</option>
                <option value="score">Highest Score</option>
                <option value="oldest">Oldest First</option>
                <option value="expiring">Expiring Soon</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {sortedCertifications.length} of {certifications.length} certifications
              </p>
            </div>

            {/* Certifications Grid */}
            <div className="space-y-4">
              {sortedCertifications.map((cert) => (
                <div key={cert.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                        <Award className="h-8 w-8 text-primary-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{cert.course}</h3>
                          <p className="text-sm text-gray-600">with {cert.instructor}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(cert.status)}
                          <div className={`text-lg font-bold ${getScoreColor(cert.score)}`}>
                            {cert.score}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                          {cert.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {cert.hoursCompleted} hours completed
                        </span>
                        {isExpiringSoon(cert.expiryDate) && (
                          <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded-full">
                            Expires soon
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Issued:</span> {formatDate(cert.issuedDate)}
                        </div>
                        <div>
                          <span className="font-medium">Expires:</span> {formatDate(cert.expiryDate)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 flex space-x-2">
                      <Link href={cert.certificateUrl} className="btn-secondary flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Link>
                      <Link href={`/certifications/${cert.id}`} className="btn-primary flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedCertifications.length === 0 && (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications found</h3>
                <p className="text-gray-600">Try adjusting your filters or enroll in courses to earn certifications.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
