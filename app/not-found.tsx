'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold">
            Archivos
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild>
                <Link href="/" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" /> Go to Homepage
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="javascript:history.back()" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Archivos. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}