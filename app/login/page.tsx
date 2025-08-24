'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { LogIn, ArrowRight, Shield } from 'lucide-react'
import Toast from '../components/Toast'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const next = searchParams.get('next') || '/dashboard'

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      
      // If the next URL contains a course enrollment, store it in localStorage
      if (next.includes('/enroll/')) {
        const courseId = next.split('/enroll/')[1]
        localStorage.setItem('pendingCourseEnrollment', courseId)
      }
      
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
    } catch (e) {
      setLoading(false)
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setShowToast(true)
        setTimeout(() => {
          router.push(next)
        }, 2000)
      }
    })

    return () => subscription.unsubscribe()
  }, [router, next])

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <LogIn className="h-6 w-6 text-[#7A3B3B]" />
            <h1 className="text-2xl font-bold">Sign in</h1>
          </div>
          <p className="text-gray-600 mb-6">Use your Google account to continue and access your dashboard.</p>
          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            Continue with Google
            <ArrowRight className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
            <Shield className="h-4 w-4" />
            <span>Secured by Supabase Auth</span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message="Successfully signed in! Redirecting to your dashboard..."
        type="success"
        duration={2000}
        onClose={() => setShowToast(false)}
        isVisible={showToast}
      />
    </div>
  )
}


