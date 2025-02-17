"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudentContext } from "@/components/hook/data";
import QRCode from "qrcode";
import Image from "next/image";
import "./style.css";

export default function Sheet() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const { studentData, setStudentData } = useStudentContext();
  const params = useParams();
  const rollNo = params.id as string;

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
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [rollNo, setStudentData]);

  if (!studentData) {
    return <p>Loading...</p>;
  }

  const calculateGrade = (percentage: number) => {
    const gradeScale = [
      { min: 90, grade: "A+" },
      { min: 80, grade: "A" },
      { min: 70, grade: "B" },
      { min: 60, grade: "C" },
      { min: 50, grade: "D" },
      { min: 0, grade: "F" },
    ];
    for (const { min, grade } of gradeScale) {
      if (percentage >= min) return grade;
    }
    return "F";
  };

  let marksheetContent = studentData.subjects.map((std) => {
    let longOptN: number = 0;
    let longTotalN: number = 0;
    let shortOptN: number = 0;
    let shortTotalN: number = 0;
    let mcqObt = Number(std.mcq.obtained);
    let mcqTotal = Number(std.mcq.total);
    let longPer = std.longQuestions.forEach((i) => {
      longOptN = +i.obtainedMarks;
      longTotalN = +i.totalMarks;
    });
    let ShortPer = std.shortQuestions.forEach((i) => {
      shortOptN = +i.obtainedMarks;
      shortTotalN = +i.totalMarks;
    });
    console.log(longPer, ShortPer);

    let perObt = mcqObt + shortOptN + longOptN;
    let perTotal = mcqTotal + shortTotalN + longTotalN;
    let percentage = ((perObt / perTotal) * 100).toFixed(2);

    return (
      <tr key={studentData.rollNo}>
        <td className="subject">{std.name}</td>
        <td>{percentage}</td>
        <td>{calculateGrade(Number(percentage))}</td>
      </tr>
    );
  });

  useEffect(() => {
    if (studentData) {
      QRCode.toDataURL(
        `https://smart-marksheet-je3e.vercel.app/std/marksheet/${studentData.rollNo}`
      )
        .then((url: any) => setQrCode(url))
        .catch((err: any) => console.error("Error generating QR code:", err));
    }
  }, [studentData]);
  return (
    <Card>
      <CardContent className="p-0 sm:p-2 md:p-6">
        <div className="report-card p-2 m-1 sm:p-5 md:p-8 mx-auto my-2 max-w-screen-md">
          <div className="header">
            <h1>REPORT CARD</h1>
            <h2>DJ Sindh Govt. Science College</h2>
          </div>
          <div className="flex justify-between">
            <div className="info-section gap-1 sm:gap-5 w-2/3 grid-cols-1 sm:grid-cols-2">
              <div className="info-field mb-2 sm:mb-5">
                <label>Name:</label>
                <div className="line">{studentData.name}</div>
              </div>
              <div className="info-field mb-2 sm:mb-5">
                <label>Roll No:</label>
                <div className="line">{studentData.rollNo}</div>
              </div>
              <div className="info-field mb-2 sm:mb-5">
                <label>Class</label>
                <div className="line">{studentData.class}</div>
              </div>
              <div className="info-field mb-2 sm:mb-5">
                <label>Group</label>
                <div className="line">{studentData.group}</div>
              </div>
            </div>
            <div className="flex items-center">
              {qrCode ? (
                <Image width={150} height={150} src={qrCode} alt="QR Code" />
              ) : (
                <p>Loading QR Code...</p>
              )}
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
            <tbody>{marksheetContent}</tbody>
          </table>

          <div className="grading-section">
            <div className="grading-scale">
              <h3 className="font-semibold text-lg">Grading Scale</h3>
              <div className="grade-item">A = 93-100</div>
              <div className="grade-item">A- = 90-92</div>
              <div className="grade-item">B = 85-89</div>
              <div className="grade-item">C = 78-84</div>
              <div className="grade-item">D = 70-77</div>
              <div className="grade-item">FAIL = 69 and below</div>
            </div>
            <div className="grading-scale">
              <h3 className="font-semibold text-lg">Total Days of School</h3>
              <div className="grade-item">Days Attended: ___265____</div>
              <div className="grade-item">Days Absent: __27__</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
