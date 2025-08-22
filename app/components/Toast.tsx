'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: () => void
  isVisible: boolean
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}

const toastColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500'
}

export default function Toast({ message, type = 'info', duration = 3000, onClose, isVisible }: ToastProps) {
  const Icon = toastIcons[type]

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className={`fixed top-4 right-4 ${toastColors[type]} text-white px-6 py-4 rounded-lg shadow-lg animate-in slide-in-from-right z-50 max-w-sm`}>
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6" />
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
