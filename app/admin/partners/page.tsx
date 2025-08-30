'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit, 
  Trash2,
  Filter,
  Search,
  Plus,
  Users,
  Calendar,
  BookOpen
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Partnership {
  id: string
  institution_name: string
  contact_name: string
  email: string
  phone: string
  address: string
  website: string
  message: string
  selected_courses: string[]
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  approved_at?: string
  approved_by?: string
}

export default function AdminPartnersPage() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchPartnerships()
  }, [filter])

  const fetchPartnerships = async () => {
    try {
      setLoading(true)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('Not authenticated')
      }

      // Get partnerships with status filter
      let query = supabase
        .from('partner_institutions')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) throw error

      setPartnerships(data || [])
    } catch (error) {
      console.error('Error fetching partnerships:', error)
    } finally {
      setLoading(false)
    }
  }

  const updatePartnershipStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('partner_institutions')
        .update({ 
          status,
          approved_at: status === 'approved' ? new Date().toISOString() : null,
          approved_by: status === 'approved' ? user.id : null
        })
        .eq('id', id)

      if (error) throw error

      // Refresh partnerships
      fetchPartnerships()
      
      // Close modal
      setShowModal(false)
      setSelectedPartnership(null)
    } catch (error) {
      console.error('Error updating partnership status:', error)
    }
  }

  const deletePartnership = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partnership?')) return

    try {
      const { error } = await supabase
        .from('partner_institutions')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Refresh partnerships
      fetchPartnerships()
    } catch (error) {
      console.error('Error deleting partnership:', error)
    }
  }

  const filteredPartnerships = partnerships.filter(partnership =>
    partnership.institution_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partnership.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partnership.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#7A3B3B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading partnerships...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-satoshi">Partner Management</h1>
              <p className="text-gray-600 mt-2">Manage partnership applications and institutions</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-[#7A3B3B]">{partnerships.length}</div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Status Filter */}
            <div className="flex space-x-2">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === status
                      ? 'bg-[#7A3B3B] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search institutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A3B3B] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnerships List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {filteredPartnerships.map((partnership) => (
            <motion.div
              key={partnership.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <Building2 className="h-6 w-6 text-[#7A3B3B]" />
                    <h3 className="text-xl font-semibold text-gray-900 font-satoshi">
                      {partnership.institution_name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(partnership.status)}`}>
                      {getStatusIcon(partnership.status)}
                      <span>{partnership.status.charAt(0).toUpperCase() + partnership.status.slice(1)}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Contact Person</p>
                      <p className="font-medium">{partnership.contact_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{partnership.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{partnership.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <p className="font-medium">
                        {partnership.website ? (
                          <a href={partnership.website} target="_blank" rel="noopener noreferrer" className="text-[#7A3B3B] hover:underline">
                            Visit Website
                          </a>
                        ) : 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Address</p>
                    <p className="font-medium">{partnership.address}</p>
                  </div>

                  {partnership.message && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Additional Message</p>
                      <p className="text-gray-700">{partnership.message}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Selected Courses</p>
                    <div className="flex flex-wrap gap-2">
                      {partnership.selected_courses.map((course, index) => (
                        <span 
                          key={index}
                          className="bg-[#7A3B3B]/10 text-[#7A3B3B] px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Applied on {new Date(partnership.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <button
                    onClick={() => {
                      setSelectedPartnership(partnership)
                      setShowModal(true)
                    }}
                    className="bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Review</span>
                  </button>

                  {partnership.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updatePartnershipStatus(partnership.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => updatePartnershipStatus(partnership.id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => deletePartnership(partnership.id)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPartnerships.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No partnerships found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'No partnership applications have been submitted yet.'
                : `No ${filter} partnerships found.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showModal && selectedPartnership && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-satoshi">
                  Review Partnership Application
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedPartnership(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Institution Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p><strong>Name:</strong> {selectedPartnership.institution_name}</p>
                    <p><strong>Contact:</strong> {selectedPartnership.contact_name}</p>
                    <p><strong>Email:</strong> {selectedPartnership.email}</p>
                    <p><strong>Phone:</strong> {selectedPartnership.phone || 'Not provided'}</p>
                    <p><strong>Address:</strong> {selectedPartnership.address}</p>
                    {selectedPartnership.website && (
                      <p><strong>Website:</strong> <a href={selectedPartnership.website} target="_blank" rel="noopener noreferrer" className="text-[#7A3B3B] hover:underline">{selectedPartnership.website}</a></p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Selected Courses</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPartnership.selected_courses.map((course, index) => (
                      <span 
                        key={index}
                        className="bg-[#7A3B3B]/10 text-[#7A3B3B] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedPartnership.message && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Message</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{selectedPartnership.message}</p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => updatePartnershipStatus(selectedPartnership.id, 'approved')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Approve Partnership
                  </button>
                  <button
                    onClick={() => updatePartnershipStatus(selectedPartnership.id, 'rejected')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Reject Partnership
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
