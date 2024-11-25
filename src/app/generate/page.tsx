"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MinusCircle, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/compo/header";
import Footer from "@/components/compo/footer";
import './style.css';
import QRCode from 'qrcode';

const gradeScale = [
  { min: 90, grade: "A+" },
  { min: 80, grade: "A" },
  { min: 70, grade: "B" },
  { min: 60, grade: "C" },
  { min: 50, grade: "D" },
  { min: 0, grade: "F" },
];

const calculateGrade = (percentage: number) => {
  for (const { min, grade } of gradeScale) {
    if (percentage >= min) return grade;
  }
  return "F";
};

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

export default function SmartMarksheet() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: "",
    rollNo: "",
    class: "",
    group: "",
    subjects: [],
  });

  const [users, setUsers] = useState<StudentInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let marksheetContent =  studentInfo.subjects.map((std)=>{
    let longOptN:number = 0;
    let longTotalN:number = 0;
    let shortOptN:number = 0;
    let shortTotalN:number = 0;
      let mcqObt =Number(std.mcq.obtained )
      let mcqTotal =Number(std.mcq.total )
let longPer = std.longQuestions.forEach((i)=>{
 longOptN =+ i.obtainedMarks
 longTotalN =+ i.totalMarks

})
let ShortPer = std.shortQuestions.forEach((i)=>{
 shortOptN =+ i.obtainedMarks
 shortTotalN =+ i.totalMarks

})
console.log(longPer ,ShortPer);

let perObt =mcqObt+shortOptN +longOptN  
let perTotal =mcqTotal +shortTotalN + longTotalN
let percentage = (perObt/perTotal)*100

      return(
      <tr key={studentInfo.rollNo}>
                    <td className="subject">{std.name}</td>
                    <td>{percentage}</td>
                    <td>{calculateGrade(percentage)}</td>
                   
                </tr>
      
     ) })
 

  const addUser = async () => {


    console.log("start");
    
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentInfo),
      });

      if (response.ok) {
        const data = await response.json();
        if (users) setUsers((prev) => [...prev, data.user]);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add user");
      }

      alert(`${studentInfo.name} registered Successfully`)
      
    } catch (error) {
      console.log("error" ,error);
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  // const generateQRCode = (rollNumber: string) => {
  //  const url = `https://yourdomain.com/marksheet/${rollNumber}`;
  //  const qrCodeDataURL = QRCode.toDataURL(url);
  //  return qrCodeDataURL;}
 

  const addSubject = () => {
    setStudentInfo({
      ...studentInfo,
      subjects: [
        ...studentInfo.subjects,
        {
          name: "",
          mcq: { obtained: "", total: "" },
          shortQuestions: [{ obtainedMarks: "", totalMarks: "", topic: "" }],
          longQuestions: [{ obtainedMarks: "", totalMarks: "", topic: "" }],
        },
      ],
    });
  };


  const removeSubject = (index: number) => {
    const newSubjects = studentInfo.subjects.filter((_, i) => i !== index);
    setStudentInfo({ ...studentInfo, subjects: newSubjects });
  };

  const addQuestion = (
    subjectIndex: number,
    questionType: "shortQuestions" | "longQuestions"
  ) => {
    const newSubjects = [...studentInfo.subjects];
    newSubjects[subjectIndex][questionType].push({
      obtainedMarks: "",
      totalMarks: "",
      topic: "",
    });
    setStudentInfo({ ...studentInfo, subjects: newSubjects });
  };

  const removeQuestion = (
    subjectIndex: number,
    questionType: "shortQuestions" | "longQuestions",
    questionIndex: number
  ) => {
    const newSubjects = [...studentInfo.subjects];
    newSubjects[subjectIndex][questionType] = newSubjects[subjectIndex][
      questionType
    ].filter((_, i) => i !== questionIndex);
    setStudentInfo({ ...studentInfo, subjects: newSubjects });
  };

  const updateStudentInfo = (field: keyof StudentInfo, value: string) => {
    setStudentInfo({ ...studentInfo, [field]: value });
  };

  const updateSubject = (
    subjectIndex: number,
    field: keyof Subject,
    value: string | Question[] |{ obtained: string; total: string }
  ) => {
    const newSubjects = [...studentInfo.subjects];
    newSubjects[subjectIndex] = {
      ...newSubjects[subjectIndex],
      [field]: value,
    };
    setStudentInfo({ ...studentInfo, subjects: newSubjects });
  };

  return (<>
  <Header/>
    <div className="container mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Smart Marksheet
      </h1>

      <Tabs defaultValue="entry" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="entry">Data Entry</TabsTrigger>
          <TabsTrigger value="view">View Marksheet</TabsTrigger>
        </TabsList>
        <TabsContent value="entry">
          {/* Personal Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={studentInfo.name}
                  onChange={(e) => updateStudentInfo("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNo">Roll No</Label>
                <Input
                  id="rollNo"
                  placeholder="Enter your roll number"
                  value={studentInfo.rollNo}
                  onChange={(e) => updateStudentInfo("rollNo", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select
                  value={studentInfo.class}
                  onValueChange={(value) => updateStudentInfo("class", value)}
                >
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select your class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">9th</SelectItem>
                    <SelectItem value="10">10th</SelectItem>
                    <SelectItem value="11">11th</SelectItem>
                    <SelectItem value="12">12th</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="group">Group</Label>
                <Select
                  value={studentInfo.group}
                  onValueChange={(value) => updateStudentInfo("group", value)}
                >
                  <SelectTrigger id="group">
                    <SelectValue placeholder="Select your group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Subjects */}
          <div className="space-y-6">
            {studentInfo.subjects.map((subject, subjectIndex) => (
              <Card key={subjectIndex} className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium">
                    Subject {subjectIndex + 1}
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeSubject(subjectIndex)}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`subject-${subjectIndex}`}>
                        Subject Name
                      </Label>
                      <Input
                        id={`subject-${subjectIndex}`}
                        placeholder="Enter subject name"
                        value={subject.name}
                        onChange={(e) =>
                          updateSubject(subjectIndex, "name", e.target.value)
                        }
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>MCQ</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Obtained Marks"
                          value={subject.mcq.obtained}
                          onChange={(e) =>
                            updateSubject(subjectIndex, "mcq", {
                              ...subject.mcq,
                              obtained : e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder="Total Marks"
                          value={subject.mcq.total}
                          onChange={(e) =>
                            updateSubject(subjectIndex, "mcq", {
                              ...subject.mcq,
                              total: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Short Questions</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            addQuestion(subjectIndex, "shortQuestions")
                          }
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                      {subject.shortQuestions.map((question, questionIndex) => (
                        <div
                          key={questionIndex}
                          className="grid grid-cols-3 gap-2 items-center"
                        >
                          <Input
                            placeholder="Obtained Marks"
                            value={question.obtainedMarks}
                            onChange={(e) => {
                              const newQuestions = [...subject.shortQuestions];
                              newQuestions[questionIndex].obtainedMarks =
                                e.target.value;
                              updateSubject(
                                subjectIndex,
                                "shortQuestions",
                                newQuestions
                              );
                            }}
                          />
                          <Input
                            placeholder="Total Marks"
                            value={question.totalMarks}
                            onChange={(e) => {
                              const newQuestions = [...subject.shortQuestions];
                              newQuestions[questionIndex].totalMarks =
                                e.target.value;
                              updateSubject(
                                subjectIndex,
                                "shortQuestions",
                                newQuestions
                              );
                            }}
                          />
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Topic"
                              className="flex-grow"
                              value={question.topic}
                              onChange={(e) => {
                                const newQuestions = [
                                  ...subject.shortQuestions,
                                ];
                                newQuestions[questionIndex].topic =
                                  e.target.value;
                                updateSubject(
                                  subjectIndex,
                                  "shortQuestions",
                                  newQuestions
                                );
                              }}
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() =>
                                removeQuestion(
                                  subjectIndex,
                                  "shortQuestions",
                                  questionIndex
                                )
                              }
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Long Questions</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            addQuestion(subjectIndex, "longQuestions")
                          }
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                      {subject.longQuestions.map((question, questionIndex) => (
                        <div
                          key={questionIndex}
                          className="grid grid-cols-3 gap-2 items-center"
                        >
                          <Input
                            placeholder="Obtained Marks"
                            value={question.obtainedMarks}
                            onChange={(e) => {
                              const newQuestions = [...subject.longQuestions];
                              newQuestions[questionIndex].obtainedMarks =
                                e.target.value;
                              updateSubject(
                                subjectIndex,
                                "longQuestions",
                                newQuestions
                              );
                            }}
                          />
                          <Input
                            placeholder="Total Marks"
                            value={question.totalMarks}
                            onChange={(e) => {
                              const newQuestions = [...subject.longQuestions];
                              newQuestions[questionIndex].totalMarks =
                                e.target.value;
                              updateSubject(
                                subjectIndex,
                                "longQuestions",
                                newQuestions
                              );
                            }}
                          />
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Topic"
                              className="flex-grow"
                              value={question.topic}
                              onChange={(e) => {
                                const newQuestions = [...subject.longQuestions];
                                newQuestions[questionIndex].topic =
                                  e.target.value;
                                updateSubject(
                                  subjectIndex,
                                  "longQuestions",
                                  newQuestions
                                );
                              }}
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() =>
                                removeQuestion(
                                  subjectIndex,
                                  "longQuestions",
                                  questionIndex
                                )
                              }
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={addSubject}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={addUser}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Marksheet
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Student Marksheet</CardTitle>
            </CardHeader>
            <CardContent>
        
    <div className="report-card">
        <div className="header">
          
            <h1>REPORT CARD</h1>
            <h2>DJ Sindh Govt. Science College</h2>
           
           
        </div>

        <div className="info-section">
            <div className="info-field">
                <label>Name:</label>
                <div className="line">{studentInfo.name}</div>
            </div>
            <div className="info-field">
                <label>Roll No:</label>
                <div className="line">{studentInfo.rollNo}</div>
            </div>
            <div className="info-field">
                <label>Class</label>
                <div className="line">{studentInfo.class}</div>
            </div>
            <div className="info-field">
                <label>Group</label>
                <div className="line">{studentInfo.group}</div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>SUBJECT</th>
                    <th>Percentage</th>
                    <th>GRADE</th>
                   
                </tr>
            </thead>
            <tbody>
            { marksheetContent}
             
            </tbody>
        </table>

        <div className="grading-section">
            <div className="grading-scale">
                <h3>Grading Scale</h3>
                <div className="grade-item">A = 93-100</div>
                <div className="grade-item">A- = 90-92</div>
                <div className="grade-item">B = 85-89</div>
                <div className="grade-item">C = 78-84</div>
                <div className="grade-item">D = 70-77</div>
                <div className="grade-item">FAIL = 69 and below</div>
            </div>
            <div className="grading-scale">
                <h3>Total Days of School</h3>
                <div className="grade-item">Days Attended: ___265____</div>
                <div className="grade-item">Days Absent: __27__</div>
            </div>
        </div>
    </div>

              
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    <Footer/>
  </>);
}
