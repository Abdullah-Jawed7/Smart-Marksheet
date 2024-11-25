export const studentData = {
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
  };
  
  export type StudentData = typeof studentData;
  export type Subject = StudentData['subjects'][number];
  
  