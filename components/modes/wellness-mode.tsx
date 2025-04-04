"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface WellnessModeProps {
  darkMode: boolean
  fontSize: number
}

export default function WellnessMode({ darkMode, fontSize }: WellnessModeProps) {
  const topics = [
    { icon: "💊", title: "Medication Reminders", description: "Set and manage your medication schedule" },
    { icon: "🧘‍♀️", title: "Simple Exercises", description: "Easy exercises suitable for seniors" },
    { icon: "🥗", title: "Healthy Diet", description: "Nutrition advice and meal suggestions" },
    { icon: "😌", title: "Meditation", description: "Guided relaxation and mindfulness" },
    { icon: "🩺", title: "Health Tips", description: "General wellness advice" },
    { icon: "🧠", title: "Mental Wellness", description: "Activities to keep your mind sharp" },
  ]

  return (
    <div className="space-y-4">
      <motion.h2
        className={cn("text-2xl font-bold mb-4", darkMode ? "text-green-400" : "text-green-600")}
        style={{ fontSize: `${1.3 * fontSize}rem` }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Wellness Guide
      </motion.h2>

      <motion.p
        className={darkMode ? "text-gray-300" : "text-gray-700"}
        style={{ fontSize: `${fontSize}rem` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        I can help you maintain your health and wellbeing with reminders, exercises, and wellness tips. What would you
        like assistance with today?
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <Card
              className={cn(
                "p-4 cursor-pointer flex items-center gap-3",
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
                  : "bg-white hover:bg-green-50 border-green-100",
              )}
            >
              <div className="text-3xl">{topic.icon}</div>
              <div>
                <h3 className="font-medium" style={{ fontSize: `${1.1 * fontSize}rem` }}>
                  {topic.title}
                </h3>
                <p
                  className={darkMode ? "text-gray-400" : "text-gray-600"}
                  style={{ fontSize: `${0.9 * fontSize}rem` }}
                >
                  {topic.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

