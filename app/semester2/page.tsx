'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function GroupSelectionPage() {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold">
            Archivos
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-20 pb-12">
        <section className="text-center">
          <motion.h1 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Select Your Group
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose your group to access relevant academic resources.
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {['A', 'B'].map((group) => (
              <Link 
                key={group} 
                href={`/resources/${group.toLowerCase()}`}
                onMouseEnter={() => setHoveredGroup(group)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                <Button
                variant="outline"
                className={`px-8 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 ${
                  hoveredGroup === group ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                  Group {group}
                  <ChevronRight className={`ml-2 transition-transform duration-300 ${
                    hoveredGroup === group ? 'translate-x-1' : ''
                  }`} />
                </Button>
              </Link>
            ))}
          </motion.div>
        </section>
      </main>
      <footer className="text-center pb-4">
        <p className="text-sm text-white bg-gray-800 px-3 py-1 rounded-full inline-block">
          semester 2
        </p>
      </footer>

    </div>
  )
}
