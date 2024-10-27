// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { motion } from 'framer-motion'
// import { ChevronRight } from 'lucide-react'
// import { Button } from "@/components/ui/button"

// export default function GroupSelectionPage() {
//   const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)

//   return (
//     <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
//       <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-10">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link href="/" className="text-2xl font-semibold">
//             Archivos
//           </Link>
//         </div>
//       </header>

//       <main className="flex-grow flex items-center justify-center pt-20 pb-12">
//         <section className="text-center">
//           <motion.h1 
//             className="text-4xl font-bold mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             Select Your Group
//           </motion.h1>
//           <motion.p 
//             className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             Choose your group to access relevant academic resources.
//           </motion.p>
//           <motion.div 
//             className="flex justify-center space-x-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             {['A', 'B'].map((group) => (
//               <Link 
//                 key={group} 
//                 href={`/resources/${group.toLowerCase()}`}
//                 onMouseEnter={() => setHoveredGroup(group)}
//                 onMouseLeave={() => setHoveredGroup(null)}
//               >
//                 <Button
//                 variant="outline"
//                 className={`px-8 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 ${
//                   hoveredGroup === group ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
//                 }`}
//               >
//                   Group {group}
//                   <ChevronRight className={`ml-2 transition-transform duration-300 ${
//                     hoveredGroup === group ? 'translate-x-1' : ''
//                   }`} />
//                 </Button>
//               </Link>
//             ))}
//           </motion.div>
//         </section>
//       </main>
//       <footer className="text-center pb-4">
//         <p className="text-sm text-white bg-gray-800 px-3 py-1 rounded-full inline-block">
//           semester 2
//         </p>
//       </footer>

//     </div>
//   )
// }
//to be uncommented after semester 2 starts.
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Phone, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Semester2ComingSoonPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          <Calendar className="w-24 h-24 mx-auto text-blue-500 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Semester 2: Almost Here!</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl text-gray-600 mb-8">
              Hold onto your socks – Semester 2’s cooking up! Almost as thrilling as a taco truck chase!
            </p>
            <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">Progress (Or as I call it, "Slooooow Torture")</p>
              <Progress value={30} className="w-full h-2" />
            </div>
            <p className="text-lg font-semibold mb-8">
              Launching Feb 2025. Stay tuned, nerds!
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center">
                    Contact Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Contact Admin</DialogTitle>
                    <DialogDescription>
                      You can reach out to the admin via WhatsApp or email.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex items-center mb-4">
                      <Phone className="mr-2 h-4 w-4" />
                      <p>WhatsApp: +91 81257 09785</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      <p>Email: kurosen930@gmail.com</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Homepage
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