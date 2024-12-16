"use client"
import { motion} from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from 'recharts'
import { useStudentContext } from '@/components/hook/data';


export default function QuestionAnalysis({ type, questions, graphType, setGraphType }: { type: string, questions: { obtainedMarks: string, totalMarks: string, topic: string }[], graphType: string, setGraphType: (type: string) => void }) {
    const { studentData } = useStudentContext();
    const data = questions.map(q => ({
      topic: q.topic,
      percentage: (parseInt(q.obtainedMarks) / parseInt(q.totalMarks)) * 100
    }));
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
      <Card className="mt-4 sm:mt-6">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-sm sm:text-base md:text-lg font-medium">
            {type} Analysis
          </CardTitle>
        </CardHeader>
        
        <CardContent  className="p-1 sm:p-3 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-3"
          >
            <div className="space-y-2 sm:space-y-3">
              {questions.map((question, index) => (
                <motion.div
                  key={question.topic}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm sm:text-base font-medium">{question.topic}</span>
                  <span className={`text-sm sm:text-base text-${getPerformanceColor((parseInt(question.obtainedMarks) / parseInt(question.totalMarks)) * 100)}-500`}>
                    {question.obtainedMarks}/{question.totalMarks}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="sm:col-span-2">
              <Select value={graphType} onValueChange={setGraphType} >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Graph type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="bar">Bar Graph</SelectItem>
                  <SelectItem value="line">Line Graph</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="radar">Radar Chart</SelectItem>
                </SelectContent>
              </Select>
              <div className="h-[300px] sm:h-[350px] md:h-[400px]">
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
        </CardContent>
      </Card>
    )
  }

  function getPerformanceColor(percentage: number): string {
    if (percentage >= 80) return 'green';
    if (percentage >= 60) return 'yellow';
    return 'red';
  }