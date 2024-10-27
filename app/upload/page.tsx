    'use client'

    import { useState } from 'react'
    import Link from 'next/link'
    import { useRouter } from 'next/navigation'
    import { motion } from 'framer-motion'
    import { Upload, Check } from 'lucide-react'
    import { Button } from "@/components/ui/button"
    import { Input } from "@/components/ui/input"
    import { Label } from "@/components/ui/label"
    import { Textarea } from "@/components/ui/textarea"
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
    import { useToast } from "@/hooks/use-toast"
    import { Progress } from "@/components/ui/progress"
    import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
    import { storage } from "@/app/firebaseConfig"

    export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploaded, setIsUploaded] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [semester, setSemester] = useState('')
    const [group, setGroup] = useState('')
    const [subject, setSubject] = useState('')
    const [resourceType, setResourceType] = useState('')
    const [note, setNote] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
        if (selectedFile.type === 'application/pdf' && selectedFile.size <= 10 * 1024 * 1024) {
            setFile(selectedFile)
            simulateUpload()
        } else {
            toast({
            title: "Invalid file",
            description: "Please upload a PDF file no larger than 10MB.",
            variant: "destructive",
            })
        }
        }
    }
    
    const simulateUpload = () => {
        setUploadProgress(0)
        setIsUploaded(false)
        const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
            if (prevProgress >= 100) {
            clearInterval(interval)
            setIsUploaded(true)
            return 100
            }
            return prevProgress + 10
        })
        }, 500)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        if (!file) {
        toast({
            title: "No file selected",
            description: "Please select a file to upload.",
            variant: "destructive",
        })
        setIsSubmitting(false)
        return
        }

        const storageRef = ref(storage, `resources/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setUploadProgress(progress)
        },
        (error) => {
            toast({
            title: "Upload Error",
            description: error.message,
            variant: "destructive",
            })
            setIsSubmitting(false)
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            console.log("File available at", downloadURL)

            
            const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                contactNo,
                semester,
                group,
                subject,
                resourceType,
                note,
                downloadURL,
            }),
            })

            const result = await response.json()
            if (result.success) {
            toast({
                title: "Email Sent",
                description: "Your submission has been sent successfully.",
                variant: "default",
            })
            } else {
            toast({
                title: "Email Error",
                description: result.error,
                variant: "destructive",
            })
            }

            setIsSubmitted(true)
            setFile(null)
            setUploadProgress(0) 
            setIsSubmitting(false)
        }
        )
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
        <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold">
                Archivos
            </Link>
            <Button variant="secondary" onClick={() => router.back()} className="ml-4">
                Back
            </Button>
            </div>
        </header>

        <main className="pt-20 pb-12">
            <section className="container mx-auto px-4 py-16">
            <motion.h1
                className="text-4xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Upload Resource
            </motion.h1>
            <motion.div
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload PDF (Max 10MB)</Label>
                    <div className="flex items-center justify-center w-full">
                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-s text-gray-500">PDF (MAX. 10MB)</p>
                        </div>
                        <Input id="file-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                    </label>
                    </div>
                    {uploadProgress > 0 && !isUploaded && (
                    <div className="mt-2">
                        <Progress value={uploadProgress} className="w-full" />
                    </div>
                    )}
                    {isUploaded && file && (
                    <div className="flex items-center mt-2 text-green-600">
                        <Check className="w-5 h-5 mr-2" />
                        <p className="text-sm">{file.name} uploaded successfully</p>
                    </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">Your Name (Optional)</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name for credit" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="contact-no">Contact Number (Optional)</Label>
                    <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        +91
                    </span>
                    <Input id="contact-no" type="tel" value={contactNo} onChange={(e) => setContactNo(e.target.value)} placeholder="Enter your contact number" className="rounded-l-none" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={semester} onValueChange={setSemester}>
                        <SelectTrigger id="semester">
                        <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="1">Semester 1</SelectItem>
                        <SelectItem value="2">Semester 2</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="group">Group</Label>
                    <Select value={group} onValueChange={setGroup}>
                        <SelectTrigger id="group">
                        <SelectValue placeholder="Select group" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="A">Group A</SelectItem>
                        <SelectItem value="B">Group B</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="subject">Subject Name</Label>
                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter subject name" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="resource-type">Resource Type</Label>
                    <Input id="resource-type" value={resourceType} onChange={(e) => setResourceType(e.target.value)} placeholder="E.g., Lecture Notes, Question Paper, etc." required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="note">Additional Notes (Optional)</Label>
                    <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Any additional information about the resource" />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Upload Resource'}
                </Button>
                </form>
            </motion.div>
            </section>
        </main>

        {(isSubmitting || isSubmitted) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center max-w-md w-full">
                {isSubmitting ? (
                <>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-semibold mb-2">Submitting your resource</h2>
                    <p className="text-gray-600">Please wait while we process your submission...</p>
                </>
                ) : (
                <>
                    <div className="rounded-full h-16 w-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
                    <p className="text-gray-600 mb-4">Your resource has been successfully submitted. We appreciate your contribution to Archivos!</p>
                    <Button onClick={() => router.push('/')} className="w-full">
                    Go Back to Home Page
                    </Button>
                </>
                )}
            </div>
            </div>
        )}

        <footer className="bg-gray-100 py-8">
            <div className="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Archivos. All rights reserved.</p>
            </div>
        </footer>
        </div>
    )
    }