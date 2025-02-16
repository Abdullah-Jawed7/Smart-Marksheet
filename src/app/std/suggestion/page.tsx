"use client"

import Gemini from "@/components/compo/gemini"
import { GeminiContext } from "@/components/hook/api";
import { useStudentContext } from "@/components/hook/data"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import { BrainCircuit } from "lucide-react";
import { useContext } from "react";

export default function Suggestions() {
    const { studentData } = useStudentContext();
    const {results} = useContext(GeminiContext)
const prompt = `Analyze the student's performance: Name: ${studentData.name}, Class: ${
      studentData.class
    }.
  - Based on the analysis, identify weeknesses and provide suggestion for improvement in weeknesses.
  - Provide a plan for improvement for the student to achieve better performance.
  Here's the data: ${JSON.stringify(studentData.subjects)}.
   Note: Please avoid Asteriks and provide only 5 suggestion and their one line introduction.`;

  

    return (
      <div className="p-6">
        <Card>
            <CardHeader> 
                <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Improvement Suggestions</h2>
          </div> 
          </CardHeader>
            <CardContent>
            {results[prompt] ? results[prompt] : <div>Loading...</div>}
            </CardContent>
        </Card>
        <h2 className="text-2xl font-bold"></h2>
      </div>
    )
  }
  
