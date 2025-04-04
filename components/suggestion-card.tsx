"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SuggestionCardProps {
  icon: string
  text: string
  darkMode: boolean
  fontSize: number
  onClick: () => void
}

export default function SuggestionCard({ icon, text, darkMode, fontSize, onClick }: SuggestionCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Card
        className={cn(
          "p-4 cursor-pointer flex flex-col items-center text-center h-full",
          darkMode ? "bg-gray-800 hover:bg-gray-700 border-gray-700" : "bg-white hover:bg-amber-100 border-amber-200",
        )}
        onClick={onClick}
      >
        <div className="text-4xl mb-2">{icon}</div>
        <p className="font-medium" style={{ fontSize: `${1.1 * fontSize}rem` }}>
          {text}
        </p>
      </Card>
    </motion.div>
  )
}

