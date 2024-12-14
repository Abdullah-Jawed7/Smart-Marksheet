"use client"

import { useState ,useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, FileText, PercentIcon, X, TrendingUp, BookOpen, Briefcase, GraduationCap, BrainCircuit } from 'lucide-react'
import {  studentDef } from "../../utils/studentData"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from 'recharts'
import { useParams } from 'next/navigation';
import { useStudentContext } from '@/components/hook/data';
import Link from "next/link"
import Image from "next/image"
import {usePDF} from 'react-to-pdf'


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

export default function StudentProfile() {


  const { studentData, setStudentData } = useStudentContext();
  const params = useParams();
  const rollNo = params.num as string;
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  // Fetch student data based on roll number
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`/api/user?rollNo=${rollNo}`);
        if (response.ok) {
          const data = await response.json();
          setStudentData(data.student);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [rollNo, setStudentData]);

  if (!studentData) {
    return <p>Loading...</p>;
  }


  const [showDetails, setShowDetails] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [selectedQuestionType, setSelectedQuestionType] = useState<string | null>(null)
  const [graphType, setGraphType] = useState("bar")

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject)
    setSelectedQuestionType(null)
  }

  const handleQuestionTypeClick = (type: string) => {
    setSelectedQuestionType(type)
  }

  return (
   
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100  sm:p-6 md:p-8 lg:p-10"
        >
           <button onClick={() => toPDF()}>Download PDF</button>
          <div className="mx-auto max-w-7xl">
            <motion.div
            ref={targetRef}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 sm:space-y-8 md:space-y-10"
            >
              <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2 sm:pb-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }}
                      className="relative"
                    >
                      <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 ring-2 ring-purple-500 ring-offset-2">
                        <AvatarImage src="/placeholder.svg?height=112&width=112" alt={studentData.name} />
                        <AvatarFallback>{studentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <motion.div 
                        className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <PercentIcon className="h-4 w-4 text-white" />
                      </motion.div>
                    </motion.div>
                    <div className="text-center sm:text-left">
                      <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">{studentData?.name}</CardTitle>
                      <p className="text-sm sm:text-base md:text-lg text-muted-foreground">Academic Profile</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-1 py-4 sm:p-3 md:p-6">
                  <div className="grid gap-2 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <StudentInfo />
                    <PerformanceGraph graphType={graphType} setGraphType={setGraphType} />
                  </div>
                  <MoreDetails 
                    showDetails={showDetails} 
                    setShowDetails={setShowDetails}
                    selectedSubject={selectedSubject}
                    setSelectedSubject={setSelectedSubject}
                    handleSubjectClick={handleSubjectClick}
                    handleQuestionTypeClick={handleQuestionTypeClick}
                    graphType={graphType}
                    setGraphType={setGraphType}
                  />
                </CardContent>
              </Card>
              <Summary />
              <ResultAnalysisAndSuggestions />
              <ImprovementGuidelines />
              <CareerSuggestions />
              <Details/>
            </motion.div>
          </div>
        </motion.div>
      
  )

}

function StudentInfo() {
  const { studentData } = useStudentContext();
  return (
    <>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-3 gap-2 text-sm">
        <InfoItem label="Roll No:" value={studentData?.rollNo} />
        <InfoItem label="Class:" value={studentData?.class} />
        <InfoItem label="Group:" value={studentData?.group} />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Overall Performance:</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <InfoItem label="Grade:" value={calculateOverallGrade()} />
          <InfoItem label="Percentage:" value={`${calculateOverallPercentage().toFixed(2)}%`} />
          <InfoItem label="Percentile:" value={`${(calculateOverallPercentage() -4).toFixed(2) }%`} />
        </div>
      </div>
    <SubjectList/>
    </motion.div>
    </>
  )
}

function InfoItem({ label, value }: { label: string, value: string }) {
 
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

function SubjectList() {
  const { studentData } = useStudentContext();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <p className="mb-2 text-sm text-muted-foreground">Subjects:</p>
      <div className="flex flex-wrap gap-2">
        {studentData?.subjects.map((subject, index: number) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Badge variant="secondary" className={`bg-purple-500 text-white hover:bg-purple-600`}>
              {subject.name}
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}



// ... (keep other existing functions)

function PerformanceGraph({ graphType, setGraphType }: { graphType: string, setGraphType: (type: string) => void }) {
  const { studentData } = useStudentContext();
    const data = studentData?.subjects.map(subject => ({
      name: subject.name,
      percentage: calculateSubjectPercentage(subject).toFixed(2)
    }));
  
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 md:col-span-2"
      >
        <div className="flex items-center justify-between ">
          <h3 className="text-lg font-medium">Performance Graph</h3>
          <Select   value={graphType} onValueChange={setGraphType}>
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
        </div>
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
      </motion.div>
    )
  }
  

function SubjectOverview({ subject, graphType, setGraphType }: { subject: Subject, graphType: string, setGraphType: (type: string) => void }) {
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
        <Select value={graphType} onValueChange={setGraphType}>
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

function QuestionAnalysis({ type, questions, graphType, setGraphType }: { type: string, questions: { obtainedMarks: string, totalMarks: string, topic: string }[], graphType: string, setGraphType: (type: string) => void }) {
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

function ResultAnalysisAndSuggestions() {
  const { studentData } = useStudentContext();
  const weakTopics = identifyWeakTopics();

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
          <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
            {weakTopics.map((topic, index) => (
              <li key={index}>
                <span className="font-medium">{topic.subject} - {topic.topic}:</span> {getTopicSuggestion(topic.subject, topic.topic)}
              </li>
            ))}
          </ul>
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

// ... (keep other existing functions)

function identifyWeakTopics(): { subject: string, topic: string }[] {
  const { studentData } = useStudentContext();
  const weakTopics: { subject: string, topic: string }[] = [];

  studentData?.subjects.forEach(subject => {
    [...subject?.shortQuestions, ...subject?.longQuestions].forEach(question => {
      const percentage = (parseInt(question?.obtainedMarks) / parseInt(question?.totalMarks)) * 100;
      if (percentage < 70) {
        weakTopics.push({ subject: subject.name, topic: question.topic });
      }
    });
  });

  return weakTopics;
}

function getTopicSuggestion(subject: string, topic: string): string {
  const suggestions: { [key: string]: { [key: string]: string } } = {
    Computer: {
      Network: "Review network topologies and protocols. Practice creating network diagrams.",
      Security: "Focus on understanding encryption methods and cybersecurity best practices.",
      "OSI Model": "Create flashcards for each layer of the OSI model and their functions.",
      Algorithms: "Implement common algorithms in your preferred programming language.",
    },
    Maths: {
      Trigonometry: "Practice solving complex trigonometric equations and identities.",
      Algebra: "Work on more advanced algebraic problems, focusing on manipulating equations.",
      Vectors: "Visualize vector operations and practice solving 3D vector problems.",
    },
    Physics: {
      Vectors: "Relate vector concepts to real-world examples and practice vector addition/subtraction.",
      "Projectile Motion": "Solve a variety of projectile motion problems, varying initial conditions.",
      "Significant Figures": "Review rules for significant figures and practice calculations.",
    },
    English: {
      "Ozymandias (poem)": "Analyze the poem's themes and literary devices. Practice writing short essays about it.",
      "Choosing A Career(chapter)": "Summarize key points and relate them to your own career aspirations.",
    }
  };

  return suggestions[subject]?.[topic] || "Review the topic thoroughly and practice related problems regularly.";
}




// ... (keep other existing functions)


function MoreDetails({ showDetails, setShowDetails, selectedSubject, setSelectedSubject, handleSubjectClick, handleQuestionTypeClick ,  graphType, setGraphType}: {
  showDetails: boolean,
  setShowDetails: (show: boolean) => void,
  selectedSubject: Subject | null,
  setSelectedSubject: (subject: Subject | null) => void,
  handleSubjectClick: (subject: Subject) => void,
  handleQuestionTypeClick: (type: string) => void,
  graphType: string, setGraphType: (type: string) => void 
}) {
  const { studentData } = useStudentContext();
  return (
    <div className="mt-6">
      <Button 
        variant="outline" 
        className="w-full sm:w-auto mb-2 sm:mb-0  sm:mr-4"
      >
       <Link href={`/sheet/${studentData.rollNo}`}> 
       <span>Marksheet</span></Link>
        
      </Button>
      <Button 
        variant="outline" 
        className="w-full sm:w-auto"
        onClick={() => setShowDetails(!showDetails)}
      >
        <span>{showDetails ? 'Hide Details' : 'More Details'}</span>
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
      </Button>
      
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-3 "
          >
            <SubjectPerformance handleSubjectClick={handleSubjectClick} />
            <SubjectAnalysis 
              selectedSubject={selectedSubject} 
              setSelectedSubject={setSelectedSubject}
              handleQuestionTypeClick={handleQuestionTypeClick}
              graphType={graphType}
              setGraphType={setGraphType}

            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


function SubjectPerformance({ handleSubjectClick }: { handleSubjectClick: (subject: Subject) => void }) {
  const { studentData } = useStudentContext();
   return (
      <div className="space-y-3 rounded-lg border p-4 bg-white/50 backdrop-blur-sm">
        {studentData.subjects.map((subject, index: number) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors duration-200"
            onClick={() => handleSubjectClick(subject)}
          >
            <span className={`text-sm font-medium text-${getSubjectColor(subject.name)}-500`}>{subject.name}</span>
            <span className="text-sm font-semibold">{calculateSubjectPercentage(subject).toFixed(2)}%</span>
          </motion.div>
        ))}
      </div>
    )
  }
  

function SubjectAnalysis({ selectedSubject, setSelectedSubject, handleQuestionTypeClick , graphType, setGraphType}: {
  selectedSubject: Subject | null,
setSelectedSubject: (subject: Subject | null) => void,
  handleQuestionTypeClick: (type: string) => void,
  graphType: string, setGraphType: (type: string) => void 

}) {
  const { studentData } = useStudentContext();
  return (
    <AnimatePresence>
      {selectedSubject && (
        <motion.div
          key={selectedSubject.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium capitalize">
                {selectedSubject.name} Analysis
              </CardTitle>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedSubject(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
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



function Summary() {
  // const overallPercentage = calculateOverallPercentage();
  // const strengths = identifyStrengths();
  // const weaknesses = identifyWeaknesses();
  const { studentData } = useStudentContext();
  const [detail ,setDetail] =useState<JSX.Element>()
  const fetchStudentData = async () => {
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");

      const genAI = new GoogleGenerativeAI("AIzaSyC9RVDBFrIK6Y6CHhiW2widc5ifCGGLPVA");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
      Analyze the student's performance: Name: ${studentData.name}, Class: ${studentData.class}.
      - Provide a short summary of overall performance.
      Here's the data: ${JSON.stringify(studentData.subjects)}.
      Note: Use escape characters for a formatting on browser dont use starts in response.
      `;
      
      const result = await model.generateContent(prompt);
      setDetail((result?.response?.text()) as JSX.Element);
      // console.log(typeof( detail) , detail );
    } catch (error) {
      console.log('from ai' ,error);
      
    }
  }
fetchStudentData()
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Summary</h2>
          </div>
        {detail}
        </div>
      </CardContent>
    </Card>
  )
}

function ImprovementGuidelines() {
  const { studentData } = useStudentContext();
  const weaknesses = identifyWeaknesses();
  const [detail ,setDetail] =useState<JSX.Element>(<pre></pre>)
  const fetchStudentData = async () => {
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");

      const genAI = new GoogleGenerativeAI("AIzaSyC9RVDBFrIK6Y6CHhiW2widc5ifCGGLPVA");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
      Analyze the student's performance: Name: ${studentData.name}, Class: ${studentData.class}.
       - Identify topic-wise weaknesses.
      - Suggest actionable short recommendations for improvement for each weak topic.
      Here's the data: ${JSON.stringify(studentData.subjects)}.
      Note: dont use starts for heading and separating.
      `;
      
      const result = await model.generateContent(prompt);
      setDetail(<pre className="whitespace-pre-wrap break-words" >{result?.response?.text()}</pre>);
    } catch (error) {
      console.log('from ai' ,error);
      
    }
  }
fetchStudentData()
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Guidelines for Improvement</h2>
          </div>
          <Accordion type="single" collapsible className="w-full overflow-auto">
            {detail}
            {/* {weaknesses?.map((weakness, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>Improve {weakness}</AccordionTrigger>
                <AccordionContent>
                  {getImprovementSuggestion(weakness)}
                </AccordionContent>
              </AccordionItem>
            ))} */}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}

function CareerSuggestions() {
  const { studentData } = useStudentContext();
  const strengths = identifyStrengths();
  const careers = getCareerSuggestions(strengths);
  const [detail ,setDetail] =useState<JSX.Element>(<pre></pre>)

  const fetchStudentData = async () => {
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");

      const genAI = new GoogleGenerativeAI("AIzaSyC9RVDBFrIK6Y6CHhiW2widc5ifCGGLPVA");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
      Analyze the student's performance: Name: ${studentData.name}, Class: ${studentData.class}.
      - Based on the analysis, suggest potential career paths considering strengths and interests.
      Here's the data: ${JSON.stringify(studentData.subjects)}.
       Note: Please avoid stars and provide only 5 suggestion and their one line introduction.
      `;
      
      const result = await model.generateContent(prompt);
      setDetail(<pre className="whitespace-pre-wrap break-words" >{result?.response?.text()}</pre>);
      // console.log(typeof( detail) , detail );
    } catch (error) {
      console.log('from ai' ,error);
      
    }
  }
fetchStudentData()
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4 overflow-auto">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Career Suggestions</h2>
          </div>
          {detail}
          {/* <p className="text-muted-foreground">
            Based on your academic performance and strengths in {strengths?.join(', ')}, here are some career paths you might consider:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
            {careers?.map((career, index) => (
              <li key={index}>{career}</li>
            ))}
          </ul> */}
        </div>
      </CardContent>
    </Card>
  )
}

function getSubjectColor(subject: string): string {
  const colors: { [key: string]: string } = {
    Computer: "blue",
    Maths: "purple",
    Physics: "green",
    English: "yellow"
  }
  return colors[subject] || "gray"
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

function calculateOverallPercentage(): number {
  const { studentData } = useStudentContext();
  const totalMarks = studentData?.subjects.reduce((sum: number, subject: { mcq: { total: string }; shortQuestions: any[]; longQuestions: any[] }) => sum + 
    parseInt(subject?.mcq.total) + 
    subject?.shortQuestions.reduce((sum: number, q: { totalMarks: string }) => sum + parseInt(q.totalMarks), 0) +
    subject?.longQuestions.reduce((sum: number, q: { totalMarks: string }) => sum + parseInt(q.totalMarks), 0), 0);

  const obtainedMarks = studentData?.subjects.reduce((sum: number, subject: { mcq: { obtained: string }; shortQuestions: any[]; longQuestions: any[] }) => sum + 
    parseInt(subject?.mcq.obtained) + 
    subject?.shortQuestions.reduce((sum: number, q: { obtainedMarks: string }) => sum + parseInt(q.obtainedMarks), 0) +
    subject?.longQuestions.reduce((sum: number, q: { obtainedMarks: string }) => sum + parseInt(q.obtainedMarks), 0), 0);

  return (obtainedMarks / totalMarks) * 100;
}

function calculateOverallGrade(): string {
  const percentage = calculateOverallPercentage();
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}

function calculateQuestionTypePercentage(questions: { obtainedMarks: string, totalMarks: string }[]): number {
  const totalMarks = questions.reduce((sum, q) => sum + parseInt(q.totalMarks), 0);
  const obtainedMarks = questions.reduce((sum, q) => sum + parseInt(q.obtainedMarks), 0);
  return (obtainedMarks / totalMarks) * 100;
}

function getPerformanceColor(percentage: number): string {
  if (percentage >= 80) return 'green';
  if (percentage >= 60) return 'yellow';
  return 'red';
}

function getPerformanceLevel(percentage: number): string {
  if (percentage >= 90) return 'outstanding';
  if (percentage >= 80) return 'excellent';
  if (percentage >= 70) return 'good';
  if (percentage >= 60) return 'satisfactory';
  return 'struggling';
}

function identifyStrengths(): string[] {
  const { studentData } = useStudentContext();
  return studentData?.subjects
    .filter((subject: any) => calculateSubjectPercentage(subject) >= 80)
    .map((subject: { name: any }) => subject.name);
}

function identifyWeaknesses(): string[] {
  const { studentData } = useStudentContext();
  return studentData?.subjects
    .filter((subject: any) => calculateSubjectPercentage(subject) < 70)
    .map((subject: { name: any }) => subject.name);
}

function getImprovementSuggestion(subject: string): string {
  const suggestions: { [key: string]: string } = {
    Computer: "Focus on practical coding exercises and projects. Spend more time understanding algorithms and data structures.",
    Maths: "Practice solving a variety of problems daily. Focus on understanding concepts rather than memorizing formulas.",
    Physics: "Concentrate on understanding the underlying principles and their applications. Solve more numerical problems.",
    English: "Read more diverse literature to improve vocabulary and comprehension. Practice writing essays and summaries regularly."
  };
  return suggestions[subject] || "Focus on regular study and practice. Seek help from teachers or tutors for difficult topics.";
}

function getCareerSuggestions(strengths: string[]): string[] {
  const careerMap: { [key: string]: string[] } = {
    Computer: ["Software Engineering", "Data Science", "Cybersecurity", "Artificial Intelligence"],
    Maths: ["Actuarial Science", "Financial Analysis", "Data Analytics", "Quantitative Research"],
    Physics: ["Engineering", "Astrophysics", "Quantum Computing", "Renewable Energy"],
    English: ["Journalism", "Content Writing", "Publishing", "Teaching"]
  };

  return strengths?.flatMap(strength => careerMap[strength] || []);
}

function Details(){
  const [detail ,setDetail] =useState<JSX.Element>(<pre></pre>)
  // const { studentData } = useStudentContext();
  const { studentData } = useStudentContext();

  
  const fetchStudentData = async () => {
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");

      const genAI = new GoogleGenerativeAI("AIzaSyC9RVDBFrIK6Y6CHhiW2widc5ifCGGLPVA");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
      Analyze the student's performance: Name: ${studentData.name}, Class: ${studentData.class}.
      - Provide a detailed summary of overall performance.
      - Identify topic-wise weaknesses.
      - Suggest actionable recommendations for improvement for each weak topic.
      - Provide Youtube Videos and documents related every week topic to improve them.
      - Based on the analysis, suggest potential career paths considering strengths and interests.
      Here's the data: ${JSON.stringify(studentData.subjects)}.
      Note: Dont use stars while giving response.
      
      `;
      
      const result = await model.generateContent(prompt);
      setDetail(<pre className="whitespace-pre-wrap break-words" >{result?.response?.text()}</pre>);
      console.log(detail);
      
    } catch (error) {
      console.log('from ai' ,error);
      
      
    }
  }

fetchStudentData()
return (
  <Card>
  <CardTitle>Analysis</CardTitle>
  <CardContent className="overflow-auto">
{detail}
  </CardContent>
</Card>
)
}



function Modal({ selectedSubject, }:
  { selectedSubject: Subject | null,
  })
  {
  
    
    const [modal ,setModal ] =useState(false)
    const [index ,setIndex ] =useState(0)
    const [image ,setImage ] =useState('/math2.jpg')
  
  
  let images :string[] = [];
  let selectImages: { [key: string]: string[] } = {
    maths:['/math2.jpg'],
    urdu:['/urdu1.jpg','/urdu2.jpg','/urdu3.jpg'],
    computer:['/computer2.jpg'],
    english:['/english1.jpg' ,'/english2.jpg'],
    islamiat:['islamiat1.jpg','/islamiat2.jpg'],
    physics:['/physics1.jpg' ,'/physics2.jpg']
  }
  
  useEffect(()=>{
    let sub =selectedSubject?.name
   let img = selectImages[`${sub?.toLowerCase()}`]  
   img?.forEach((i)=>images.push(i))
  console.log(images);
  console.log(images[index]);
  setImage(images[index])
  },[images ,selectedSubject , modal,index])
  
  
    return(
  
      <>
    <button onClick={()=>setModal(!modal)} id="open-carousel" className="px-5 py-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
     Exam Paper
    </button>
  
   
    <div id="modal" className={`${modal ? 'flex' :'hidden'}  fixed inset-0  bg-black bg-opacity-60  items-center justify-center z-50 `}>
      <div className="relative bg-white rounded-lg p-4 max-w-3xl w-full h-auto flex flex-col items-center">
        {/* <!-- Close Button --> */}
        <button onClick={()=>setModal(!modal)} id="close-button" className="absolute top-3 right-3 text-white bg-red-500 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition">
          &times;
        </button>
  
        {/* <!-- Image --> */}
        <Image id="modal-image" src={image} width={600} height={1000} alt="Projection" className="w-full max-h-[500px] object-contain rounded-lg shadow-md"/>
  
        {/* <!-- Navigation Buttons --> */}
        <button onClick={()=>setIndex((index - 1 + images.length) % images.length)} id="prev-button" className="absolute left-1 top-1/2 -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
          &#10094;
        </button>
        <button onClick={()=>setIndex( (index + 1) % images.length)} id="next-button" className="absolute right-1 top-1/2 -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
          &#10095;
        </button>
      </div>
    </div>
   
   </>
    )
  }