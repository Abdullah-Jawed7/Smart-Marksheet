import { BookOpen } from "lucide-react"
import { Card ,CardContent , } from "../ui/card"
import { Subject } from "@/lib/types"
import Gemini from "./gemini"

export default function SubjectSummary({details}:{details:Subject}) {
  const prompt = `
  Analyze the student's performance in ${details.name}:
  - Provide a 100 words  summary of subject  performance.
  Here's the details: ${JSON.stringify(details)}.
  Note: Do not use asterik while providing response.
  `;
  
 
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Summary</h2>
            </div>
          {<Gemini instruction={prompt}/>}
          </div>
        </CardContent>
      </Card>
    )
  }