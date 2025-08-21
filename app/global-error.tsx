'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-20 w-20 text-red-400 mx-auto mb-6" />
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Something went wrong!</h1>
            <p className="text-lg text-gray-600 mb-8">
              A critical error occurred. Please try refreshing the page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="btn-primary"
              >
                Try again
              </button>
              <Link href="/" className="btn-secondary">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
