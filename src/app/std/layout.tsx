"use client"

import { Sidebar } from "@/components/compo/slideBar"
import { motion, AnimatePresence } from "framer-motion"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <AnimatePresence mode="wait">
        <motion.main
          // key={window.location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}

