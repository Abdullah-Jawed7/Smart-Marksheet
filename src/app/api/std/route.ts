import { NextResponse } from 'next/server';

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

// Mock data
const students: StudentInfo[] = [
  {
    name: 'Adullah',
    rollNo: '369',
    class: '10th',
    group: 'Science',
    subjects: [
      {
        name: 'Mathematics',
        mcq: { obtained: '18', total: '20' },
        shortQuestions: [
          { obtainedMarks: '8', totalMarks: '10', topic: 'Algebra' },
        ],
        longQuestions: [
          { obtainedMarks: '15', totalMarks: '20', topic: 'Geometry' },
        ],
      },
    ],
  },
  {
    name: 'Abdul Hadi',
    rollNo: '123',
    class: '10th',
    group: 'Science',
    subjects: [
      {
        name: 'Mathematics',
        mcq: { obtained: '18', total: '20' },
        shortQuestions: [
          { obtainedMarks: '8', totalMarks: '10', topic: 'Algebra' },
        ],
        longQuestions: [
          { obtainedMarks: '15', totalMarks: '20', topic: 'Geometry' },
        ],
      },
    ],
  },
  // Add more students as needed
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rollNo = searchParams.get('rollNo');

  const student = students.find((s) => s.rollNo === rollNo);
  if (!student && rollNo) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
if (!rollNo) {
  return NextResponse.json({ students });
}
  return NextResponse.json({ student });
}
