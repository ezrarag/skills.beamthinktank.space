'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { QrCode, Camera, AlertCircle } from 'lucide-react'

export default function QRScanPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [scannedText, setScannedText] = useState<string>('')

  useEffect(() => {
    let stream: MediaStream | null = null
    let detector: any = null
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        // Use built-in BarcodeDetector if available
        // @ts-ignore
        if ('BarcodeDetector' in window) {
          // @ts-ignore
          detector = new window.BarcodeDetector({ formats: ['qr_code'] })
          const tick = async () => {
            if (!videoRef.current) return
            try {
              const barcodes = await detector.detect(videoRef.current)
              if (barcodes && barcodes.length > 0) {
                const rawValue = barcodes[0].rawValue as string
                setScannedText(rawValue)
                // If it's a course link, navigate
                if (rawValue.startsWith('/courses/') || rawValue.includes('/courses/')) {
                  window.location.href = rawValue.includes('http') ? rawValue : `${window.location.origin}${rawValue}`
                }
              }
            } catch (e) {
              // ignore single-frame errors
            }
            requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        } else {
          setError('QR scanning not supported on this device/browser.')
        }
      } catch (e: any) {
        setError(e?.message || 'Unable to access camera')
      }
    }
    start()
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <QrCode className="h-6 w-6 text-[#7A3B3B]" />
            <h1 className="text-2xl font-bold">Scan a course QR code</h1>
          </div>
          <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
            <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
          </div>
          {error && (
            <div className="flex items-center text-red-600 gap-2 mb-4">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}
          {scannedText && (
            <div className="text-sm text-gray-600 mb-4 break-all">Detected: {scannedText}</div>
          )}
          <div className="flex gap-3">
            <Link href="/courses" className="btn-secondary">Browse Courses</Link>
            <button onClick={() => window.location.reload()} className="btn-primary flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Rescan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


