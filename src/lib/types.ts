 export interface Question {
    obtainedMarks: string;
    totalMarks: string;
    topic: string;
  }
  
 export interface Subject {
    name: string;
    mcq: { obtained: string; total: string };
    shortQuestions: Question[];
    longQuestions: Question[];
  }
  
 export interface StudentInfo {
    name: string;
    rollNo: string;
    class: string;
    group: string;
    subjects: Subject[];
  }

  type GraphType = "bar" | "pie" | "line" | "area"