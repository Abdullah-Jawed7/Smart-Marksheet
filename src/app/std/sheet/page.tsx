import Link from "next/link"

export default function SubjectsPage() {
 
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Subjects</h2>
      <Link href={`/std/sheet/1234`}>
      
     <div> Marksheet</div>
      </Link>
    </div>
  )
}
