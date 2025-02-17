import { NextRequest, NextResponse } from 'next/server';
import { StudentInfo } from '@/lib/types';

// In-memory database for storing student information
let students: StudentInfo[] = [
  {
    name: "Abdul Hadi",
    rollNo: "1398",
    class: "11",
    group: "science",
    subjects: [
      {
        name: "Computer",
        mcq: { obtained: "20", total: "20" },
        shortQuestions: [
          { obtainedMarks: "3", totalMarks: "5", topic: "Network" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Architecture" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Topology" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Input Devices" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Algorithms" }
        ],
        longQuestions: [
          { obtainedMarks: "8", totalMarks: "10", topic: "Security" },
          { obtainedMarks: "9", totalMarks: "10", topic: "OSI Model" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Storage Devices" }
        ]
      },
      {
        name: "Chemistry",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Trigonometry" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Matrices" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Algebra" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Statistics" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Vectors" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Graph" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Trigonometry" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Scalar" }
        ]
      },
      {
        name: "Maths",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Trigonometry" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Matrices" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Algebra" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Statistics" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Vectors" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Graph" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Trigonometry" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Scalar" }
        ]
      },
      {
        name: "Physics",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Projectile Motion" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Vectors" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Scalars" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Errors" },
          { obtainedMarks: "2.5", totalMarks: "5", topic: "Significant Figures" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Motion" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Circular Motion" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Linear Motion" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Laws Of Motion" }
        ]
      },
      {
        name: "English",
        mcq: { obtained: "20", total: "20" },
        shortQuestions: [
          { obtainedMarks: "5", totalMarks: "5", topic: "Tenses" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Active Passive" },
          { obtainedMarks: "2", totalMarks: "5", topic: "Don't Quit (poem)" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Ozymandias (poem)" },
          { obtainedMarks: "3.5", totalMarks: "5", topic: "Choosing A Career(chapter)" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Essay" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "CV Writing" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Application" }
        ]
      }
    ]
  },
  {
    name: "Abdullah Javed",
    rollNo: "1456",
    class: "11",
    group: "science",
    subjects: [
      {
        name: "Computer",
        mcq: { obtained: "20", total: "20" },
        shortQuestions: [
          { obtainedMarks: "3", totalMarks: "5", topic: "Softcopy Input device" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Architecture" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Ports" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Types of Cables" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Types of printer" }
        ],
        longQuestions: [
          { obtainedMarks: "8", totalMarks: "10", topic: "Security" },
          { obtainedMarks: "9", totalMarks: "10", topic: "OSI Model" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Secondary Storage Vs Primary Storage devices" }
        ]
      },
      {
        name: "Chemistry",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Atomic Structure" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Organic Chemistry" },
          { obtainedMarks: "3", totalMarks: "5", topic: "InOrganic Chemistry" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Chemical Bonding" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Electrochemistry" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Biochemistry" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Solutions And Mixtures" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Atoms, molecules and substances" }
        ]
      },
      {
        name: "Maths",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Permutation" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Geometry" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Probability" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Graph" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Vectors" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Graph" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Logarithm" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Scalar" }
        ]
      },
      {
        name: "Physics",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Energy" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Introduction Of Physics" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Scalars" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Fluids" },
          { obtainedMarks: "2.5", totalMarks: "5", topic: "Electromagnetism" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Motion and its types" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Waves" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Circuits"},
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Friction" }
        ]
      },
      {
        name: "English",
        mcq: { obtained: "20", total: "20" },
        shortQuestions: [
          { obtainedMarks: "5", totalMarks: "5", topic: "Tenses" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Active Passive" },
          { obtainedMarks: "2", totalMarks: "5", topic: "Don't Quit (poem)" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Ozymandias (poem)" },
          { obtainedMarks: "3.5", totalMarks: "5", topic: "Choosing A Career(chapter)" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Essay" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Report Writing" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Letter" }
        ]
      }
    ]
  },
  {
    name: "Tanveer Ahmed",
    rollNo: "1460",
    class: "11",
    group: "science",
    subjects: [
      {
        name: "Computer",
        mcq: { obtained: "20", total: "20" },
        shortQuestions: [
          { obtainedMarks: "3", totalMarks: "5", topic: "Data structure" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Operating Systems" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Hardware" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Introduction to computer" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Algorithms" }
        ],
        longQuestions: [
          { obtainedMarks: "8", totalMarks: "10", topic: "Types of networks" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Binary Number System" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Cloud Storage" }
        ]
      },
      {
        name: "Chemistry",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Sets" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Quadratic Equation" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Functions" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Sequence and series" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Partial Fraction" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Graph" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Trigonometry" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Scalar" }
        ]
      },
      {
        name: "Maths",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Sets" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Quadratic Equation" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Functions" },
          { obtainedMarks: "5", totalMarks: "5", topic: "StatiSequence and seriesstics" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Partial Fraction" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Determinants" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Matrices" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Geometry" }
        ]
      },
      {
        name: "Physics",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Projectile Motion" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Vectors" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Scalars" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Errors" },
          { obtainedMarks: "2.5", totalMarks: "5", topic: "Significant Figures" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Motion" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Circular Motion" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Linear Motion" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Laws Of Motion" }
        ]
      },
      {
        name: "English",
        mcq: { obtained: "20", total: "20" },
        shortQuestions: [
          { obtainedMarks: "5", totalMarks: "5", topic: "Tenses" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Active Passive" },
          { obtainedMarks: "2", totalMarks: "5", topic: "Don't Quit (poem)" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Ozymandias (poem)" },
          { obtainedMarks: "3.5", totalMarks: "5", topic: "Choosing A Career(chapter)" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Essay" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "CV Writing" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Application" }
        ]
      }
    ]
  },
  {
    name: "Huzaifa Sajjad",
    rollNo: "1475",
    class: "11",
    group: "science",
    subjects: [
      {
        name: "Computer",
        mcq: { obtained: "20", total: "20" },
        shortQuestions: [
          { obtainedMarks: "3", totalMarks: "5", topic: "Network" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Architecture" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Topology" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Input Devices" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Algorithms" }
        ],
        longQuestions: [
          { obtainedMarks: "8", totalMarks: "10", topic: "Security" },
          { obtainedMarks: "9", totalMarks: "10", topic: "OSI Model" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Storage Devices" }
        ]
      },
      {
        name: "Chemistry",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Trigonometry" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Matrices" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Algebra" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Statistics" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Vectors" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Graph" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Trigonometry" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Scalar" }
        ]
      },
      {
        name: "Maths",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Trigonometry" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Matrices" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Algebra" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Statistics" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Vectors" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Graph" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Trigonometry" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Scalar" }
        ]
      },
      {
        name: "Physics",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Projectile Motion" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Vectors" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Scalars" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Errors" },
          { obtainedMarks: "2.5", totalMarks: "5", topic: "Significant Figures" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Motion" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Circular Motion" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Linear Motion" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Laws Of Motion" }
        ]
      },
      {
        name: "English",
        mcq: { obtained: "20", total: "20" },
        shortQuestions: [
          { obtainedMarks: "5", totalMarks: "5", topic: "Tenses" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Active Passive" },
          { obtainedMarks: "2", totalMarks: "5", topic: "Don't Quit (poem)" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Ozymandias (poem)" },
          { obtainedMarks: "3.5", totalMarks: "5", topic: "Choosing A Career(chapter)" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Essay" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "CV Writing" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Application" }
        ]
      }
    ]
  },
  {
    name: "Hassan Imran",
    rollNo: "1390",
    class: "11",
    group: "science",
    subjects: [
      {
        name: "Computer",
        mcq: { obtained: "20", total: "20" },
        shortQuestions: [
          { obtainedMarks: "3", totalMarks: "5", topic: "Network" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Architecture" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Topology" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Input Devices" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Algorithms" }
        ],
        longQuestions: [
          { obtainedMarks: "8", totalMarks: "10", topic: "Security" },
          { obtainedMarks: "9", totalMarks: "10", topic: "OSI Model" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Storage Devices" }
        ]
      },
      {
        name: "Chemistry",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Trigonometry" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Matrices" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Algebra" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Statistics" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Vectors" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Graph" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Trigonometry" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Scalar" }
        ]
      },
      {
        name: "Maths",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Trigonometry" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Matrices" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Algebra" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Statistics" },
          { obtainedMarks: "5", totalMarks: "5", topic: "Vectors" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Graph" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Trigonometry" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Scalar" }
        ]
      },
      {
        name: "Physics",
        mcq: { obtained: "10", total: "10" },
        shortQuestions: [
          { obtainedMarks: "4", totalMarks: "5", topic: "Projectile Motion" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Vectors" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Scalars" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Errors" },
          { obtainedMarks: "2.5", totalMarks: "5", topic: "Significant Figures" },
          { obtainedMarks: "4", totalMarks: "5", topic: "Motion" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Circular Motion" },
          { obtainedMarks: "9", totalMarks: "10", topic: "Linear Motion" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Laws Of Motion" }
        ]
      },
      {
        name: "English",
        mcq: { obtained: "20", total: "20" },
        shortQuestions: [
          { obtainedMarks: "5", totalMarks: "5", topic: "Tenses" },
          { obtainedMarks: "4.5", totalMarks: "5", topic: "Active Passive" },
          { obtainedMarks: "2", totalMarks: "5", topic: "Don't Quit (poem)" },
          { obtainedMarks: "3", totalMarks: "5", topic: "Ozymandias (poem)" },
          { obtainedMarks: "3.5", totalMarks: "5", topic: "Choosing A Career(chapter)" }
        ],
        longQuestions: [
          { obtainedMarks: "10", totalMarks: "10", topic: "Essay" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "CV Writing" },
          { obtainedMarks: "9.5", totalMarks: "10", topic: "Application" }
        ]
      }
    ]
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
  if (!student && rollNo) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
if (!rollNo) {
  return NextResponse.json({ students });
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
