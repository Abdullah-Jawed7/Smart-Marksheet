import { TrendingUp} from "lucide-react"
import { Card ,CardContent , } from "../ui/card"
import {  Subject} from "@/lib/types"
import Gemini from "./gemini"

export default function SubjectSuggestions({details}:{details:Subject}) {
  const prompt = `
Analyze the student's performance in ${details.name}:
  - Analyze students weeknesses and then suggest tips
  - Provide short content for improvement of every week topic.
  Here's the details: ${JSON.stringify(details)}.
  Note: Please Avoid asterik .
  `;
  
 
    return (
        <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Result Analysis and Suggestions</h2>
            </div>
            <p className="text-muted-foreground">
              Based on your performance, here are the topics that need more focus:
            </p>
            {<Gemini instruction={prompt}/>}
            <p className="text-muted-foreground mt-4">
              General study suggestions:
            </p>
            <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
              <li>Create a study schedule that allocates more time to weaker subjects and topics.</li>
              <li>Use active recall techniques like flashcards or practice tests to reinforce learning.</li>
              <li>Seek help from teachers or tutors for topics you find particularly challenging.</li>
              <li>Form study groups with classmates to discuss and clarify difficult concepts.</li>
              <li>Regularly review and revise previously learned material to maintain knowledge.</li>
            </ul>
          </div>
        </CardContent>
      </Card>




      
    )
  }