'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const resourceCategories = [
  {
    title: "Question Banks",
    items: [
      "Mathematics Question Bank",
      "Physics Question Bank",
      "Chemistry Question Bank",
      "Computer Science Question Bank",
      "English Question Bank"
    ]
  },
  {
    title: "CIE 1 Question Papers",
    items: [
      "Mathematics CIE 1",
      "Physics CIE 1",
      "Chemistry CIE 1",
      "Computer Science CIE 1",
      "English CIE 1"
    ]
  },
  {
    title: "CIE 2 Question Papers",
    items: [
      "Mathematics CIE 2",
      "Physics CIE 2",
      "Chemistry CIE 2",
      "Computer Science CIE 2",
      "English CIE 2"
    ]
  },
  {
    title: "SEE Question Papers",
    items: [
      "Mathematics SEE",
      "Physics SEE",
      "Chemistry SEE",
      "Computer Science SEE",
      "English SEE"
    ]
  },
  {
    title: "Pre-Final Question Papers",
    items: [
      "Mathematics Pre-Final",
      "Physics Pre-Final",
      "Chemistry Pre-Final",
      "Computer Science Pre-Final",
      "English Pre-Final"
    ]
  },
  {
    title: "Lab Manuals",
    items: [
      "Physics Lab Manual",
      "Chemistry Lab Manual",
      "Computer Science Lab Manual",
      "Electronics Lab Manual",
      "Workshop Manual"
    ]
  }
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold">
            Archivos
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-12">
        <section className="container mx-auto px-4 py-16">
          <motion.h1 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Academic Resources
          </motion.h1>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {resourceCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="text-xl font-semibold">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex justify-between items-center">
                        <span className="text-sm">{item}</span>
                        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700">
                          <Download className="w-4 h-4" />
                          <span className="sr-only">Download {item}</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </section>
      </main>

      <footer className="text-center pb-4">
        <p className="text-sm text-white bg-gray-800 px-3 py-1 rounded-full inline-block">
          semester 1 - group b
        </p>
      </footer>
    </div>
  )
}