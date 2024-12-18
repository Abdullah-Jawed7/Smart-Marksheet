"use client"
import Link from "next/link"
import { BarChart2, BookOpen, GraduationCap, LayoutDashboard, LogOut , FileSpreadsheetIcon ,Menu  } from 'lucide-react'
import { useStudentContext } from '@/components/hook/data';
import { useState } from "react";
import { motion } from "framer-motion";
export function Sidebar() {
  let [isOpened ,setIsOpened] = useState(false)
  const { studentData } = useStudentContext();
  return (<>
  <div className="hamBurger sm:hidden absolute right-3 z-40" onClick={()=>setIsOpened(!isOpened)}><Menu width={36} height={36}/></div>
    <div className="hidden sm:block  w-64 border-r bg-white">
      <div className="p-6">
        <h1 className="text-xl font-semibold">Academic Dashboard</h1>
      </div>
      <nav className="space-y-1 px-3">
        <Link
          href={`/std/marksheet/${studentData.rollNo}`}
          onClick={()=>setIsOpened(!isOpened)}
          className="flex  items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900"
           >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/std/subjects"
          onClick={()=>setIsOpened(!isOpened)}
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900"
        >
          <BookOpen className="h-5 w-5" />
          <span>Subjects</span>
        </Link>
        <Link
         onClick={()=>setIsOpened(!isOpened)}
          href={`/std/sheet/${studentData.rollNo}`}
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900"
        >
          <FileSpreadsheetIcon className="h-5 w-5" />
          <span>Report Card</span>
        </Link>
        <Link
          href="/std/suggestion"
          onClick={()=>setIsOpened(!isOpened)}
          className="flex  items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900"
        >
          <BarChart2 className="h-5 w-5" />
          <span>Suggestions</span>
        </Link>
        <Link
         onClick={()=>setIsOpened(!isOpened)}
          href="/std/career"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <GraduationCap className="h-5 w-5" />
          <span>Career</span>
        </Link>
      </nav>
      <div className="absolute bottom-4 px-3">
        <button 
         onClick={()=>setIsOpened(!isOpened)}
         className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
    {isOpened && (
       <motion.div
       initial={{ opacity: 0, x: 20 }}
       animate={{ opacity: 1, x: 0 }}
       exit={{ opacity: 0, x: -20 }}
       transition={{ duration: 0.3 }}
       className="w-64 h-screen border-r bg-white absolute z-40">
       <div className="p-6">
         <h1 className="text-xl font-semibold">Academic Dashboard</h1>
       </div>
       <nav className="space-y-1 px-3">
         <Link
          onClick={()=>setIsOpened(!isOpened)}
           href={`/std/marksheet/${studentData.rollNo}`}
           className="flex  items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900"
          >
           <LayoutDashboard className="h-5 w-5" />
           <span>Dashboard</span>
         </Link>
         <Link
          onClick={()=>setIsOpened(!isOpened)}
           href="#"
           className="flex  items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900"
         >
           <BarChart2 className="h-5 w-5" />
           <span>Performance</span>
         </Link>
         <Link
          onClick={()=>setIsOpened(!isOpened)}
           href="/std/subjects"
           className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900"
         >
           <BookOpen className="h-5 w-5" />
           <span>Subjects</span>
         </Link>
         <Link
          onClick={()=>setIsOpened(!isOpened)}
           href={`/std/sheet/${studentData.rollNo}`}
           className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900"
         >
           <FileSpreadsheetIcon className="h-5 w-5" />
           <span>Report Card</span>
         </Link>
         <Link
          onClick={()=>setIsOpened(!isOpened)}
           href="#"
           className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900"
         >
           <GraduationCap className="h-5 w-5" />
           <span>Career</span>
         </Link>
       </nav>
       <div className="absolute bottom-4 px-3">
         <button
          onClick={()=>setIsOpened(!isOpened)}
         className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-gray-600  active:bg-gray-100 active:text-gray-900 hover:bg-gray-100 hover:text-gray-900">
           <LogOut className="h-5 w-5" />
           <span>Logout</span>
         </button>
       </div>
     </motion.div>
    )}
  </>
  )
}

