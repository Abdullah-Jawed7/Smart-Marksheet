import Link from "next/link"
import { Button } from "../ui/button"

function MortarboardIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  }


export default function Header() {
    return(
        <header className="px-4 lg:px-6 h-16 flex items-center bg-white dark:bg-gray-800 shadow-md">
      <Link href="/" className="flex items-center justify-center">
      <MortarboardIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <span className="ml-2 text-xl font-bold text-blue-900 dark:text-blue-100">ExamInsights</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" variant="ghost">Home</Button>
        <Button className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" variant="ghost" >Analyze</Button>
        <Button className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" variant="ghost" >Compare</Button>
      </nav>
    </header>
    )
}