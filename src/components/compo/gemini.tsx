"use client"

import { useState } from "react";

export default function Gemini({instruction }:{instruction:string}):JSX.Element{
    const [detail ,setDetail] =useState<JSX.Element>(<pre></pre>)
     const fetchStudentData = async () => {
      try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
  
        const genAI = new GoogleGenerativeAI("AIzaSyC9RVDBFrIK6Y6CHhiW2widc5ifCGGLPVA");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = instruction
       
        
        const result = await model.generateContent(prompt);
        setDetail(<pre className="font-sans overflow-auto whitespace-pre-wrap break-words" >{result?.response?.text()}</pre>);
        console.log(detail);
        
      } catch (error) {
        console.log('from ai' ,error);
        
        
      }
    }
  
  fetchStudentData()
  return  detail
  }