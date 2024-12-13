import Link from "next/link"
import { BarChart2, BookOpen, GraduationCap, LayoutDashboard, LogOut } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-white">
      <div className="p-6">
        <h1 className="text-xl font-semibold">Academic Dashboard</h1>
      </div>
      <nav className="space-y-1 px-3">
        <Link
          href="#"
          className="flex items-center space-x-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <BarChart2 className="h-5 w-5" />
          <span>Performance</span>
        </Link>
        <Link
          href="/subjects"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <BookOpen className="h-5 w-5" />
          <span>Subjects</span>
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <GraduationCap className="h-5 w-5" />
          <span>Career</span>
        </Link>
      </nav>
      <div className="absolute bottom-4 px-3">
        <button className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

