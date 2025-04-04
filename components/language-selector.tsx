"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
  darkMode: boolean
}

export default function LanguageSelector({ currentLanguage, onLanguageChange, darkMode }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
    { code: "bn", name: "বাংলা" },
  ]

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn("rounded-full", darkMode ? "hover:bg-gray-700" : "hover:bg-amber-200")}
      >
        <Globe size={24} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "absolute right-0 mt-2 py-2 w-40 rounded-lg shadow-lg z-50",
              darkMode ? "bg-gray-800" : "bg-white",
            )}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={cn(
                  "w-full text-left px-4 py-2 hover:bg-opacity-10",
                  currentLanguage === lang.code
                    ? darkMode
                      ? "bg-gray-700"
                      : "bg-amber-100"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700",
                )}
                onClick={() => {
                  onLanguageChange(lang.code)
                  setIsOpen(false)
                }}
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

