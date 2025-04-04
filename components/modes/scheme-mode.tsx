"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SchemeModeProps {
  darkMode: boolean
  fontSize: number
}

export default function SchemeMode({ darkMode, fontSize }: SchemeModeProps) {
  const schemes = [
    {
      icon: "💰",
      title: "Pension Schemes",
      description: "National Pension System, PMVVY, etc.",
    },
    {
      icon: "🏥",
      title: "Healthcare Benefits",
      description: "PMJAY, Senior Citizen Health Insurance",
    },
    {
      icon: "🏦",
      title: "Banking Benefits",
      description: "Special FD rates, banking services for seniors",
    },
    {
      icon: "🚇",
      title: "Travel Concessions",
      description: "Railway, bus, and air travel discounts",
    },
    {
      icon: "📝",
      title: "Documentation Help",
      description: "Assistance with forms and applications",
    },
    {
      icon: "🏠",
      title: "Housing Schemes",
      description: "Senior citizen housing welfare schemes",
    },
  ]

  return (
    <div className="space-y-4">
      <motion.h2
        className={cn("text-2xl font-bold mb-4", darkMode ? "text-purple-400" : "text-purple-600")}
        style={{ fontSize: `${1.3 * fontSize}rem` }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Government Schemes
      </motion.h2>

      <motion.p
        className={darkMode ? "text-gray-300" : "text-gray-700"}
        style={{ fontSize: `${fontSize}rem` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        I can provide information about various government programs and benefits for seniors. What would you like to
        know about?
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {schemes.map((scheme, index) => (
          <motion.div
            key={scheme.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <Card
              className={cn(
                "p-4 cursor-pointer flex items-center gap-3",
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
                  : "bg-white hover:bg-purple-50 border-purple-100",
              )}
            >
              <div className="text-3xl">{scheme.icon}</div>
              <div>
                <h3 className="font-medium" style={{ fontSize: `${1.1 * fontSize}rem` }}>
                  {scheme.title}
                </h3>
                <p
                  className={darkMode ? "text-gray-400" : "text-gray-600"}
                  style={{ fontSize: `${0.9 * fontSize}rem` }}
                >
                  {scheme.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

