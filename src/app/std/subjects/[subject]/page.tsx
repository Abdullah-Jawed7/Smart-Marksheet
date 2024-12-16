"use client"

import  SubjectAnalysis  from "@/components/compo/subjectAnalysis"
import { useState } from "react"
import { Subject  } from "@/lib/types"
import { useStudentContext } from "@/components/hook/data";


export default function SubjectPage({ params }: { params: { subject: string } }) {

  const { studentData } = useStudentContext();
  let subject = studentData?.subjects?.find((sub)=>sub.name.toLowerCase() == params.subject)
  if(!subject) return <div>Subject not found</div>
  let [selectedSubject , setSelectedSubject] = useState<Subject | null >(subject)
   const [performanceGraphType, setPerformanceGraphType] = useState("bar")
  let handleQuestionType = (str:string)=>{}
  // if(subject) setSelectedSubject(subject)
  
  
  return (
    <div className="bg-white p-6">
      <h2 className="text-2xl  font-bold capitalize">{params.subject} Analysis</h2>
      <SubjectAnalysis
       selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
         graphType={performanceGraphType}
          setGraphType={setPerformanceGraphType} 
          handleQuestionTypeClick={handleQuestionType}
          />
    </div>
  )
}

