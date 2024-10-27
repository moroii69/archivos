'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['9:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '12:30 - 1:30', '1:30 - 2:30', '2:30 - 3:30', '3:30 - 4:30'];

const subjectsData = {
    CSE: {
      A: {
        Monday: ['ES', 'BEE', 'EP', 'LUNCH', 'M1', 'M1', 'PPS'],
        Tuesday: ['EP', 'M1', 'MC', 'LUNCH', 'PPS LAB', 'PPS LAB', 'PPS LAB'],
        Wednesday: ['EGDP LAB', 'EGDP LAB', 'EGDP LAB', 'LUNCH', 'OC', 'PPS', 'SPORTS'],
        Thursday: ['BEE', 'ES', 'LIBRARY', 'LUNCH', 'EP LAB', 'EP LAB', 'EP LAB'],
        Friday: ['EP', 'PPS', 'M1', 'LUNCH', 'NAMAZ', 'BEE', 'ES'],
        Saturday: ['BEE LAB', 'BEE LAB', 'BEE LAB', 'LUNCH', 'EP', 'BEE', 'PPS'],
      },
      B: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
      C: {
        Monday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub1'],
        Tuesday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub2', 'sub1', 'sub3'],
        Wednesday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Thursday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub2', 'sub3', 'sub1'],
        Friday: ['sub2', 'sub1', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub3', 'sub2'],
      },
      D: {
        Monday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub2', 'sub1', 'sub3'],
        Tuesday: ['sub1', 'sub3', 'sub2', 'LUNCH', 'sub1', 'sub3', 'sub2'],
        Wednesday: ['sub2', 'sub1', 'sub3', 'LUNCH', 'sub3', 'sub2', 'sub1'],
        Thursday: ['sub1', 'sub3', 'sub2', 'LUNCH', 'sub2', 'sub1', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
      E: {
        Monday: ['sub2', 'sub1', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Tuesday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub2', 'sub3', 'sub1'],
        Wednesday: ['sub1', 'sub3', 'sub2', 'LUNCH', 'sub2', 'sub1', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub2', 'sub1'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub3', 'sub2'],
      },
      F: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub2', 'sub1', 'sub3'],
        Tuesday: ['sub2', 'sub1', 'sub3', 'LUNCH', 'sub1', 'sub3', 'sub2'],
        Wednesday: ['sub1', 'sub3', 'sub2', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub2', 'sub1', 'sub3'],
        Friday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub2', 'sub1'],
        Saturday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
      },
    },
    CSD: {
      A: {
        Monday: ['Math', 'Science', 'English', 'History'],
        Tuesday: ['Biology', 'Physics', 'Math', 'Geography'],
        Wednesday: ['Math', 'Lab', 'English', 'History'],
        Thursday: ['Chemistry', 'PE', 'English', 'Geography'],
        Friday: ['History', 'Math', 'PE', 'Biology'],
        Saturday: ['English', 'Geography', 'Math', 'Physics'],
      },
      B: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
    },
    CSM: {
      A: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
      B: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
      C: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
    },
    AIML: {
      A: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
      B: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
    },
    IT: {
      A: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
      B: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
      C: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
    },
    CE: {
      A: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
    },
    MECH: {
      A: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
    },
    ECE: {
      A: {
        Monday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Tuesday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub3', 'sub1', 'sub2'],
        Wednesday: ['sub1', 'sub1', 'sub1', 'LUNCH', 'sub2', 'sub3', 'sub3'],
        Thursday: ['sub3', 'sub1', 'sub2', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Friday: ['sub2', 'sub3', 'sub1', 'LUNCH', 'sub1', 'sub2', 'sub3'],
        Saturday: ['sub1', 'sub2', 'sub3', 'LUNCH', 'sub3', 'sub1', 'sub2'],
      },
    },
  };
  
  const YourComponent = () => {
    useEffect(() => {
        console.log(subjectsData);
    }, []); // runs only once when the component mounts

    return null; // no rendering, just logging
};
export default function TimetablePage() {
    type SubjectsData = {
        [department in 'CSE' | 'CSD' | 'CSM' | 'AIML' | 'IT' | 'CE' | 'MECH' | 'ECE']: {
          [section: string]: {
            [day: string]: string[];
          };
        };
      };
      
  const [department, setDepartment] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const departments = ['CSE', 'CSD', 'CSM', 'AIML', 'IT', 'CE', 'MECH', 'ECE'] as const;

  // Create a type for the department keys
  type Department = typeof departments[number];
  
  // Type guard to check if a value is a valid department
  const isDepartment = (value: string): value is Department => {
    return departments.includes(value as Department);
  };
  
  // Assuming `department` is a string that is set somewhere in your code
  const sections = department && isDepartment(department) 
    ? Object.keys(subjectsData[department]) 
    : [];

  
  
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
        <section className="container mx-auto px-4 py-8">
          <motion.h1
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Time Table
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select onValueChange={setDepartment}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="section">Section</Label>
              <Select onValueChange={setSection} disabled={!department}>
                <SelectTrigger id="section">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map(sec => (
                    <SelectItem key={sec} value={sec}>Section {sec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {department && section && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day / Time</TableHead>
                    {periods.map((period, index) => (
                      <TableHead key={index}>{period}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {days.map((day) => (
                    <TableRow key={day}>
                      <TableCell className="font-medium">{day}</TableCell>
                      {periods.map((_, periodIndex) => (
                        <TableCell key={periodIndex}>
                            <div className="text-center font-medium">
                                {subjectsData[department]?.[section]?.[day]?.[periodIndex] ?? 'N/A'}
                            </div>
                        </TableCell>

                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Archivos. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
