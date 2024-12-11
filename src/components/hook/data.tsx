
'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

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

interface StudentInfo {
  name: string;
  rollNo: string;
  class: string;
  group: string;
  subjects: Subject[];
}

interface StudentContextProps {
  studentData: StudentInfo ;
  setStudentData: (data: StudentInfo ) => void;
}
let content ={
  name: "Abdullah Javed",
  rollNo: "1456",
  class: "11",
  group: "science",
  subjects: [
    {
      name: "Computer",
      mcq: { obtained: "20", total: "20" },
      shortQuestions: [
        { obtainedMarks: "3", totalMarks: "5", topic: "Softcopy Input device" },
        { obtainedMarks: "4", totalMarks: "5", topic: "Architecture" },
        { obtainedMarks: "4.5", totalMarks: "5", topic: "Ports" },
        { obtainedMarks: "4", totalMarks: "5", topic: "Types of Cables" },
        { obtainedMarks: "4", totalMarks: "5", topic: "Types of printer" }
      ],
      longQuestions: [
        { obtainedMarks: "8", totalMarks: "10", topic: "Security" },
        { obtainedMarks: "9", totalMarks: "10", topic: "OSI Model" },
        { obtainedMarks: "9.5", totalMarks: "10", topic: "Secondary Storage Vs Primary Storage devices" }
      ]
    },
    {
      name: "Chemistry",
      mcq: { obtained: "10", total: "10" },
      shortQuestions: [
        { obtainedMarks: "4", totalMarks: "5", topic: "Atomic Structure" },
        { obtainedMarks: "4.5", totalMarks: "5", topic: "Organic Chemistry" },
        { obtainedMarks: "3", totalMarks: "5", topic: "InOrganic Chemistry" },
        { obtainedMarks: "5", totalMarks: "5", topic: "Chemical Bonding" },
        { obtainedMarks: "5", totalMarks: "5", topic: "Electrochemistry" }
      ],
      longQuestions: [
        { obtainedMarks: "10", totalMarks: "10", topic: "Biochemistry" },
        { obtainedMarks: "9", totalMarks: "10", topic: "Solutions And Mixtures" },
        { obtainedMarks: "9.5", totalMarks: "10", topic: "Atoms, molecules and substances" }
      ]
    },
    {
      name: "Maths",
      mcq: { obtained: "10", total: "10" },
      shortQuestions: [
        { obtainedMarks: "4", totalMarks: "5", topic: "Permutation" },
        { obtainedMarks: "4.5", totalMarks: "5", topic: "Geometry" },
        { obtainedMarks: "3", totalMarks: "5", topic: "Probability" },
        { obtainedMarks: "5", totalMarks: "5", topic: "Graph" },
        { obtainedMarks: "5", totalMarks: "5", topic: "Vectors" }
      ],
      longQuestions: [
        { obtainedMarks: "10", totalMarks: "10", topic: "Graph" },
        { obtainedMarks: "9", totalMarks: "10", topic: "Logarithm" },
        { obtainedMarks: "9.5", totalMarks: "10", topic: "Scalar" }
      ]
    },
    {
      name: "Physics",
      mcq: { obtained: "10", total: "10" },
      shortQuestions: [
        { obtainedMarks: "4", totalMarks: "5", topic: "Energy" },
        { obtainedMarks: "3", totalMarks: "5", topic: "Introduction Of Physics" },
        { obtainedMarks: "4", totalMarks: "5", topic: "Scalars" },
        { obtainedMarks: "4.5", totalMarks: "5", topic: "Fluids" },
        { obtainedMarks: "2.5", totalMarks: "5", topic: "Electromagnetism" },
        { obtainedMarks: "4", totalMarks: "5", topic: "Motion and its types" }
      ],
      longQuestions: [
        { obtainedMarks: "10", totalMarks: "10", topic: "Waves" },
        { obtainedMarks: "9", totalMarks: "10", topic: "Circuits"},
        { obtainedMarks: "9.5", totalMarks: "10", topic: "Friction" }
      ]
    },
    {
      name: "English",
      mcq: { obtained: "20", total: "20" },
      shortQuestions: [
        { obtainedMarks: "5", totalMarks: "5", topic: "Tenses" },
        { obtainedMarks: "4.5", totalMarks: "5", topic: "Active Passive" },
        { obtainedMarks: "2", totalMarks: "5", topic: "Don't Quit (poem)" },
        { obtainedMarks: "3", totalMarks: "5", topic: "Ozymandias (poem)" },
        { obtainedMarks: "3.5", totalMarks: "5", topic: "Choosing A Career(chapter)" }
      ],
      longQuestions: [
        { obtainedMarks: "10", totalMarks: "10", topic: "Essay" },
        { obtainedMarks: "9.5", totalMarks: "10", topic: "Report Writing" },
        { obtainedMarks: "9.5", totalMarks: "10", topic: "Letter" }
      ]
    }
  ]
}
// Create the context
const StudentContext = createContext<StudentContextProps | undefined>(undefined);

// Context provider
export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [studentData, setStudentData] = useState<StudentInfo>(content);

  return (
    <StudentContext.Provider value={{ studentData, setStudentData }}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to use the context
export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};
