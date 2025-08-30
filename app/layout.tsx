import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LocationProvider } from './components/LocationProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'SkillCraft - Professional Skills Training & Personal Development',
  description: 'Transform your career with personalized skills training, expert instructors, and a proven approach to professional growth. Find peace, find yourself.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-satoshi`}>
        <div className="min-h-screen bg-gray-50">
          <LocationProvider>
            {children}
          </LocationProvider>
        </div>
      </body>
    </html>
  )
}
