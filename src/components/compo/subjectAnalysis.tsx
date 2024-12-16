"use client"

import { useState } from "react"
import { Card ,CardHeader ,CardContent ,CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SubjectOverview from './subjectOverview'
import QuestionAnalysis from './questionAnalysis'
import { BarChartIcon, PieChartIcon, LineChartIcon, AreaChartIcon ,X } from 'lucide-react'
import { Bar, BarChart, Cell, Pie, PieChart, Line, LineChart, Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import { Subject } from "@/lib/types"
import Link from "next/link"





// const performanceData = [
//   { name: "Assignments", score: 85 },
//   { name: "Quizzes", score: 92 },
//   { name: "Mid-term", score: 78 },
//   { name: "Final Exam", score: 88 },
// ]

// const topicBreakdown = [
//   { name: "Topic 1", value: 30 },
//   { name: "Topic 2", value: 25 },
//   { name: "Topic 3", value: 20 },
//   { name: "Topic 4", value: 15 },
//   { name: "Topic 5", value: 10 },
// ]

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

// type GraphType = "bar" | "pie" | "line" | "area"

// function GraphSelector({ graphType, setGraphType }: { graphType: GraphType; setGraphType: (type: GraphType) => void }) {
//   return (
//     <div className="flex justify-end space-x-2 mb-4">
//       <Button
//         variant={graphType === "bar" ? "default" : "outline"}
//         size="sm"
//         onClick={() => setGraphType("bar")}
//       >
//         <BarChartIcon className="h-4 w-4" />
//       </Button>
//       <Button
//         variant={graphType === "pie" ? "default" : "outline"}
//         size="sm"
//         onClick={() => setGraphType("pie")}
//       >
//         <PieChartIcon className="h-4 w-4" />
//       </Button>
//       <Button
//         variant={graphType === "line" ? "default" : "outline"}
//         size="sm"
//         onClick={() => setGraphType("line")}
//       >
//         <LineChartIcon className="h-4 w-4" />
//       </Button>
//       <Button
//         variant={graphType === "area" ? "default" : "outline"}
//         size="sm"
//         onClick={() => setGraphType("area")}
//       >
//         <AreaChartIcon className="h-4 w-4" />
//       </Button>
//     </div>
//   )
// }

// function renderGraph(graphType: GraphType, data: any[], dataKey: string) {
//   switch (graphType) {
//     case "bar":
//       return (
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey={dataKey} fill="#818cf8" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       )
//     case "pie":
//       return (
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               fill="#8884d8"
//               dataKey={dataKey}
//               label={({ name, value }) => `${name}: ${value}`}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       )
//     case "line":
//       return (
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey={dataKey} stroke="#818cf8" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       )
//     case "area":
//       return (
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Area type="monotone" dataKey={dataKey} fill="#818cf8" stroke="#4f46e5" />
//           </AreaChart>
//         </ResponsiveContainer>
//       )
//   }
// }

//  function SubjectAnalysis2({ subject }: { subject: string }) {
//   const [performanceGraphType, setPerformanceGraphType] = useState<GraphType>("bar")
//   const [topicGraphType, setTopicGraphType] = useState<GraphType>("bar")

//   return (
//     <div className="mt-6 grid gap-6 md:grid-cols-2">
//       <Card className="p-6">
//         <h3 className="text-lg font-semibold mb-4">Performance Breakdown</h3>
//         <GraphSelector graphType={performanceGraphType} setGraphType={setPerformanceGraphType} />
//         <div className="h-[300px]">
//           {renderGraph(performanceGraphType, performanceData, "score")}
//         </div>
//       </Card>
//       <Card className="p-6">
//         <h3 className="text-lg font-semibold mb-4">Topic Breakdown</h3>
//         <GraphSelector graphType={topicGraphType} setGraphType={setTopicGraphType} />
//         <div className="h-[300px]">
//           {renderGraph(topicGraphType, topicBreakdown, "value")}
//         </div>
//       </Card>
//       <Card className="p-6 md:col-span-2">
//         <h3 className="text-lg font-semibold mb-4">Improvement Areas</h3>
//         <ul className="list-disc pl-6 space-y-2">
//           <li>Focus on improving performance in mid-term exams</li>
//           <li>Dedicate more time to Topic 4 and Topic 5</li>
//           <li>Maintain consistent performance across all assessment types</li>
//         </ul>
//       </Card>
//     </div>
//   )
// }

// Mine One

export default function SubjectAnalysis(
    { selectedSubject, setSelectedSubject, handleQuestionTypeClick , graphType, setGraphType}: {
    selectedSubject: Subject | null,
  setSelectedSubject: (subject: Subject | null) => void,
    handleQuestionTypeClick: (type: string) => void,
    graphType: string, setGraphType: (type: string) => void 
  
  }
) {
  return (
      <AnimatePresence>
        {selectedSubject && (
          <motion.div
            key={selectedSubject.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full col-span-2 bg-slate-300"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium capitalize">
                  {selectedSubject.name} Analysis
                </CardTitle>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href={`/std/subjects`}>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSelectedSubject(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  </Link>
                </motion.div>
              </CardHeader>
              <CardContent  className="p-1 sm:p-3 md:p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="short" onClick={() => handleQuestionTypeClick('short')}>Short Questions</TabsTrigger>
                    <TabsTrigger value="long" onClick={() => handleQuestionTypeClick('long')}>Long Questions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <SubjectOverview subject={selectedSubject} graphType={graphType} setGraphType={setGraphType} />
                  </TabsContent>
                  <TabsContent value="short">
                    <QuestionAnalysis graphType={graphType} setGraphType={setGraphType} type="Short Questions" questions={selectedSubject.shortQuestions} />
                  </TabsContent>
                  <TabsContent value="long">
                    <QuestionAnalysis graphType={graphType} setGraphType={setGraphType} type="Long Questions" questions={selectedSubject.longQuestions} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }