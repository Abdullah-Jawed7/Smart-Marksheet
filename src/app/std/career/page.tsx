"use client"

import Gemini from "@/components/compo/gemini"
import { useStudentContext } from "@/components/hook/data"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import { BrainCircuit } from "lucide-react";

export default function CareerSuggestions() {
    const { studentData } = useStudentContext();
const prompt = `
Analyze the student's performance: Name: ${studentData.name}, Class: ${studentData.class}.
- Based on the analysis, suggest potential career paths considering strengths and interests.
Here's the data: ${JSON.stringify(studentData.subjects)}.
 Note: Please avoid Asteriks and provide only 5 suggestion and their one line introduction.
`;

    return (
      <div className="p-6">
        <Card>
            <CardHeader> 
                <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Career Suggestions</h2>
          </div> 
          </CardHeader>
            <CardContent>
                {<Gemini instruction={prompt} />}
            </CardContent>
        </Card>
        <h2 className="text-2xl font-bold"></h2>
      </div>
    )
  }
  