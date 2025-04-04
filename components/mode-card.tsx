"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ModeCardProps {
  title: string
  description: string
  icon: string
  color: string
  darkMode: boolean
  fontSize: number
  onClick: () => void
}

export default function ModeCard({ title, description, icon, color, darkMode, fontSize, onClick }: ModeCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.03, y: -5 }} whileTap={{ scale: 0.97 }}>
      <Card
        className={cn(
          "p-6 cursor-pointer h-full overflow-hidden relative",
          darkMode ? "bg-gray-800 hover:bg-gray-700 border-gray-700" : "bg-white hover:bg-amber-50 border-amber-200",
        )}
        onClick={onClick}
      >
        <motion.div
          className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${color} opacity-20 -mr-8 -mt-8`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <div className="flex items-start gap-4">
          <div className={`text-4xl p-3 rounded-full bg-gradient-to-br ${color} text-white`}>{icon}</div>

          <div className="flex-1">
            <h3
              className={`font-bold mb-2 bg-gradient-to-r ${color} bg-clip-text text-transparent`}
              style={{ fontSize: `${1.3 * fontSize}rem` }}
            >
              {title}
            </h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"} style={{ fontSize: `${1 * fontSize}rem` }}>
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

