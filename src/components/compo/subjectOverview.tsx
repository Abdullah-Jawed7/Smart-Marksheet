"use client"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from 'recharts'
import { useStudentContext } from '@/components/hook/data';
import {Subject} from '@/lib/types'
import Modal from './questionPaper'
import GraphSelector from "./graphSelector"


export default function SubjectOverview({ subject, graphType, setGraphType }: { subject: Subject, graphType: string, setGraphType: (type: string) => void }) {
    const { studentData } = useStudentContext();
    const mcqPercentage = (parseInt(subject.mcq.obtained) / parseInt(subject.mcq.total)) * 100;
    const shortQuestionsPercentage = calculateQuestionTypePercentage(subject.shortQuestions);
    const longQuestionsPercentage = calculateQuestionTypePercentage(subject.longQuestions);
  
    const data = [
      { name: 'MCQs', percentage: mcqPercentage },
      { name: 'Short Questions', percentage: shortQuestionsPercentage },
      { name: 'Long Questions', percentage: longQuestionsPercentage },
    ];
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 mt-4"
      >
        <div className="space-y-4 sm:space-y-6">
          {data.map((item, index) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="space-y-2"
            >
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-2xl font-bold">{item.percentage.toFixed(2)}%</p>
              <Progress value={item.percentage} className="w-full" />
            </motion.div>
          ))}
          <Modal  selectedSubject={subject} />
        </div>
        <div className="space-y-4 sm:space-y-6">
         
       <GraphSelector graphType={graphType} setGraphType={setGraphType}  />
          <div className="h-[200px] sm:h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
            {(() => {
                if (graphType === "bar") {
                  return (
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="percentage" fill="#8884d8">
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  )
                } else if (graphType === "line") {
                  return (
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="percentage" stroke="#8884d8" strokeWidth={2} dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                  )
                } else if (graphType === "pie") {
                  return (
                    <PieChart>
                      <Pie dataKey="percentage" nameKey="name" data={data} fill="#8884d8" label>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  )
                } else if (graphType === "radar") {
                  return (
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Percentage" dataKey="percentage" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  )
                } else {
                  return <div>Please select a chart type</div>;
                }
              })()}
           
             
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    )
  }

  
function calculateQuestionTypePercentage(questions: { obtainedMarks: string, totalMarks: string }[]): number {
  const totalMarks = questions.reduce((sum, q) => sum + parseInt(q.totalMarks), 0);
  const obtainedMarks = questions.reduce((sum, q) => sum + parseInt(q.obtainedMarks), 0);
  return (obtainedMarks / totalMarks) * 100;
}