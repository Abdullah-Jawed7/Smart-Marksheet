'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useStudentContext } from './data';

interface GeminiContextType {
  results: { [instruction: string]: JSX.Element | null };
}

export const GeminiContext = createContext<GeminiContextType>({
  results: {},
});

interface GeminiProviderProps {
  children: ReactNode;
  
}

export const GeminiProvider: React.FC<GeminiProviderProps> = ({ children}) => {
  const [results, setResults] = useState<{ [instruction: string]: JSX.Element | null }>({});
  results
  const { studentData } = useStudentContext();
  const instructions:string[] = [
    `Analyze the student's performance: Name: ${studentData.name}, Class: ${
      studentData.class
    }.
  - Based on the analysis, identify weeknesses and provide suggestion for improvement in weeknesses.
  - Provide a plan for improvement for the student to achieve better performance.
  Here's the data: ${JSON.stringify(studentData.subjects)}.
   Note: Please avoid Asteriks and provide only 5 suggestion and their one line introduction.`,

    `
  Analyze the student's performance: Name: ${studentData.name}, Class: ${
      studentData.class
    }.
  - Based on the analysis, suggest potential career paths considering strengths and interests.
  Here's the data: ${JSON.stringify(studentData.subjects)}.
   Note: Please avoid Asteriks and provide only 5 suggestion and their one line introduction.
  `,
    `
      Analyze the student's performance: Name: ${studentData.name}, Class: ${
      studentData.class
    }.
      - Provide a short summary of overall performance.
      Here's the data: ${JSON.stringify(studentData.subjects)}.
      Note: Use escape characters for a formatting on browser dont use starts in response.
      `,
  ];

  useEffect(() => {
    const fetchGeminiForInstruction = async (instruction: string) => {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const apiKey = 'AIzaSyB_ibmC2At5LY0N4o6N2_TrHkL4HZEiFqs';
        if (!apiKey) {
          throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not defined');
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(instruction);
        const detail = (
          <pre className="font-sans overflow-auto whitespace-pre-wrap break-words">
            {result?.response?.text()}
          </pre>
        );
        setResults((prev) => ({ ...prev, [instruction]: detail }));
      } catch (error: any) {
        console.error(`Error fetching Gemini API for instruction "${instruction}":`, error);
        setResults((prev) => ({ ...prev, [instruction]: <pre>Error fetching data</pre> }));
      }
    };

    instructions.forEach((instruction) => {
      if (!results[instruction]) {
        fetchGeminiForInstruction(instruction);
      }
    });
  }, [instructions]);

  return (
    <GeminiContext.Provider value={{ results }}>
      {children}
    </GeminiContext.Provider>
  );
};
