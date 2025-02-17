"use client"

import { useState } from "react";

export default function Gemini({instruction }:{instruction:string}):JSX.Element{
    const [detail ,setDetail] =useState<JSX.Element>(<pre></pre>)
     const fetchStudentData = async () => {
      try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
  
        const genAI = new GoogleGenerativeAI('AIzaSyB_ibmC2At5LY0N4o6N2_TrHkL4HZEiFqs');
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