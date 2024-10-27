'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Define items with empty href properties
const resourceCategories = [
  {
    title: "Question Banks",
    items: [
      { name: "Mathematics - 1", href: "https://firebasestorage.googleapis.com/v0/b/archivos-cs30.appspot.com/o/Semester%2001%2FGroup%20B%2FQuestion%20Banks%2Fm1-qb.pdf?alt=media&token=8b7e40cf-1fde-4dd1-ace0-50038b58387e" },
      { name: "Engineering Physics", href: "https://firebasestorage.googleapis.com/v0/b/archivos-cs30.appspot.com/o/Semester%2001%2FGroup%20B%2FQuestion%20Banks%2Fep-qb.pdf?alt=media&token=2dd3af71-d919-4bfc-b60b-76386cc877b7" },
      { name: "Programming for Problem Solving", href: "https://firebasestorage.googleapis.com/v0/b/archivos-cs30.appspot.com/o/Semester%2001%2FGroup%20B%2FQuestion%20Banks%2Fpps-qb.pdf?alt=media&token=696aefb9-67e2-40b5-a0a6-1ef4eccd85fe" },
      { name: "Basic Electrical Engineering", href: "https://firebasestorage.googleapis.com/v0/b/archivos-cs30.appspot.com/o/Semester%2001%2FGroup%20B%2FQuestion%20Banks%2Fbee-qb.pdf?alt=media&token=64600540-61a6-4572-a04b-def854b6052b" },
      { name: "Environmental Science", href: "https://firebasestorage.googleapis.com/v0/b/archivos-cs30.appspot.com/o/Semester%2001%2FGroup%20B%2FQuestion%20Banks%2Fes-qb.pdf?alt=media&token=2827edab-4216-4c6d-a3ce-9e2ebd3d69e6"},
    ]
  },
  {
    title: "CIE 1 Question Papers",
    items: [
      { name: "Mathematics - 1", href: "" },
      { name: "Engineering Physics", href: "" },
      { name: "Programming for Problem Solving", href: "" },
      { name: "Basic Electrical Engineering", href: "" },
      { name: "Environmental Science", href: "" },
    ]
  },
  {
    title: "CIE 2 Question Papers",
    items: [
      { name: "Mathematics - 1", href: "" },
      { name: "Engineering Physics", href: "" },
      { name: "Programming for Problem Solving", href: "" },
      { name: "Basic Electrical Engineering", href: "" },
      { name: "Environmental Science", href: "" },
    ]
  },
  {
    title: "SEE Question Papers",
    items: [
      { name: "Mathematics - 1", href: "" },
      { name: "Engineering Physics", href: "" },
      { name: "Programming for Problem Solving", href: "" },
      { name: "Basic Electrical Engineering", href: "" },
      { name: "Environmental Science", href: "" },
    ]
  },
  {
    title: "Pre-Final Question Papers",
    items: [
      { name: "Mathematics - 1", href: "" },
      { name: "Engineering Physics", href: "" },
      { name: "Programming for Problem Solving", href: "" },
      { name: "Basic Electrical Engineering", href: "" },
      { name: "Environmental Science", href: "" },
    ]
  },
  {
    title: "Lab Manuals",
    items: [
      { name: "Engineering Physics Lab", href: "" },
      { name: "Programming for Problem Solving Lab", href: "" },
      { name: "Basic Electrical Engineering Lab", href: "" },
      { name: "Engineering Graphics & Design Practice Lab", href: "" }
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
                        <span className="text-sm">{item.name}</span>
                        <Link href={item.href}>
                          <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700">
                            <Download className="w-4 h-4" />
                            <span className="sr-only">Download {item.name}</span>
                          </Button>
                        </Link>
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
