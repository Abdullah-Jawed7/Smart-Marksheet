"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { containerVariants, fadeIn, floatAnimation } from "@/lib/animations"
import { useStudentContext } from '@/components/hook/data';
const MotionCard = motion(Card)

// const subjects = [
//   { name: "Computer", score: 86.67 },
//   { name: "Chemistry", score: 90.77 },
//   { name: "Maths", score: 90.77 },
//   { name: "Physics", score: 84.29 },
//   { name: "English", score: 86.67 },
// ]


interface Question {
    obtainedMarks: string;
    totalMarks: string;
    topic: string;
  }
  
  interface Subject {
    name: string;
    mcq: { obtained: string; total: string };
    shortQuestions: Question[];
    longQuestions: Question[];
  }
  

export function SubjectsList() {
     const { studentData } = useStudentContext();
  return (
    <motion.div 
      className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {studentData.subjects.map((subject, index) => (
        <Link key={subject.name} href={`/std/subjects/${subject.name.toLowerCase()}`}>
          <MotionCard 
            className="p-6 hover:bg-gray-50 transition-colors"
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h3 
              className="text-lg font-semibold"
              variants={floatAnimation}
              animate="animate"
            >
              {subject.name}
            </motion.h3>
            <motion.p 
              className="mt-2 text-3xl font-bold text-indigo-600"
              variants={floatAnimation}
              animate="animate"
            >
              {calculateSubjectPercentage(subject).toFixed(2)}%
            </motion.p>
            <p className="mt-2 text-sm text-gray-600">Click for detailed analysis</p>
          </MotionCard>
        </Link>
      ))}
    </motion.div>
  )
}

function calculateSubjectPercentage(subject: Subject): number {

    const totalMarks = parseInt(subject.mcq.total) + 
      subject?.shortQuestions.reduce((sum: number, q: { totalMarks: string }) => sum + parseInt(q.totalMarks), 0) +
      subject?.longQuestions.reduce((sum: number, q: { totalMarks: string }) => sum + parseInt(q.totalMarks), 0);
  
    const obtainedMarks = parseInt(subject?.mcq.obtained) + 
      subject?.shortQuestions.reduce((sum: number, q: { obtainedMarks: string }) => sum + parseInt(q.obtainedMarks), 0) +
      subject?.longQuestions.reduce((sum: number, q: { obtainedMarks: string }) => sum + parseInt(q.obtainedMarks), 0);
  
    return (obtainedMarks / totalMarks) * 100;
  }