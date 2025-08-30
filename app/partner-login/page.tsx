'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Brain, Building2, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PartnerLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in and has a partnership
    checkExistingPartnership()
  }, [])

  const checkExistingPartnership = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Check if user has an approved partnership
        const { data: partnership } = await supabase
          .from('partner_institutions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'approved')
          .single()

        if (partnership) {
          // Redirect to dashboard if already approved
          router.push('/institution-dashboard')
        }
      }
    } catch (error) {
      console.error('Error checking partnership:', error)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setMessage('')
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/partner-login/callback`
        }
      })

      if (error) {
        throw error
      }

    } catch (error) {
      console.error('Error signing in with Google:', error)
      setMessage('Failed to sign in with Google. Please try again.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setMessage('Logged out successfully')
      setMessageType('success')
    } catch (error) {
      console.error('Error signing out:', error)
      setMessage('Failed to log out')
      setMessageType('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF] via-[#FAFAFA] to-[#FFFFFF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7A3B3B]/10 to-[#6A2B2B]/10 py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-8">
            <Link 
              href="/partners"
              className="flex items-center space-x-2 text-[#7A3B3B] hover:text-[#6A2B2B] transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-satoshi font-medium">Back to Partners</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-normal text-[#7A3B3B] mb-6 leading-tight font-satoshi">
              Partner Portal
            </h1>
            <p className="text-lg text-[#7A3B3B]/80 max-w-3xl mx-auto font-satoshi">
              Access your institution dashboard to manage courses, events, and student enrollments. 
              Sign in with your Google account to get started.
            </p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="max-w-[500px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#7A3B3B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-10 w-10 text-[#7A3B3B]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#7A3B3B] mb-2 font-satoshi">
              Sign In to Partner Portal
            </h2>
            <p className="text-gray-600 font-satoshi">
              Use your Google account to access your institution dashboard
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                messageType === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {messageType === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span className="font-medium">{message}</span>
            </motion.div>
          )}

          {/* Google Sign In Button */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg font-satoshi flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign in with Google</span>
              </>
            )}
          </motion.button>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm font-satoshi">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 font-satoshi"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign Out
          </motion.button>

          {/* Info Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#7A3B3B] mb-4 font-satoshi">
                New to Partner Portal?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you haven't applied for partnership yet, please start by filling out our partnership application.
              </p>
              <Link 
                href="/contact"
                className="inline-block bg-[#7A3B3B] hover:bg-[#6A2B2B] text-white px-6 py-3 rounded-lg transition-colors duration-200 font-satoshi"
              >
                Apply for Partnership
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
