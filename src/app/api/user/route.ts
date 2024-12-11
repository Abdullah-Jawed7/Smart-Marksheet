import { NextRequest, NextResponse } from 'next/server';

// Define the types for the API
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

// In-memory database for storing student information
let students: StudentInfo[] = [
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
];

// Handle GET requests: Fetch all students
// export async function GET(): Promise<NextResponse> {
//   return NextResponse.json({ students }, { status: 200 });
// }
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rollNo = searchParams.get('rollNo');

  const student = students.find((s) => s.rollNo === rollNo);
  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  return NextResponse.json({ student });
}
// Handle POST requests: Add a new student
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const student: StudentInfo = await request.json();

    // Validate required fields
    if (!student.name || !student.rollNo || !student.class || !student.group) {
      return NextResponse.json(
        { error: 'All fields (name, rollNo, class, group) are required' },
        { status: 400 }
      );
    }

    // Add the new student to the in-memory database
    students.push(student);

    return NextResponse.json(
      { message: 'Student added successfully', user: student },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 500 }
    );
  }
}

// Handle DELETE requests: Delete a student by roll number
// export async function DELETE(request: NextRequest): Promise<NextResponse> {
//   try {
//     const { rollNo }: { rollNo: string } = await request.json();

//     if (!rollNo) {
//       return NextResponse.json(
//         { error: 'Roll number is required' },
//         { status: 400 }
//       );
//     }

//     // Filter out the student with the specified roll number
//     const updatedStudents = students.filter((student) => student.rollNo !== rollNo);

//     if (updatedStudents.length === students.length) {
//       return NextResponse.json(
//         { error: 'Student with the given roll number not found' },
//         { status: 404 }
//       );
//     }

//     students = updatedStudents;

//     return NextResponse.json(
//       { message: 'Student deleted successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Invalid request' },
//       { status: 500 }
//     );
//   }
// }
// Handle DELETE requests: Delete a student by roll number
// export async function FIND(request: NextRequest): Promise<NextResponse> {
//   try {
//     const { rollNo }: { rollNo: string } = await request.json();

//     if (!rollNo) {
//       return NextResponse.json(
//         { error: 'Roll number is required' },
//         { status: 400 }
//       );
//     }

//     // Filter out the student with the specified roll number
//     const updatedStudent = students.find((student) => student.rollNo == rollNo);

//     if (updatedStudent) {
//       return NextResponse.json(
//         { error: 'Student with the given roll number not found' },
//         { status: 404 }
//       );
//     }

//     // students = updatedStudents;

//     return NextResponse.json(
//       { updatedStudent }, { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Invalid request' },
//       { status: 500 }
//     );
//   }
// }
