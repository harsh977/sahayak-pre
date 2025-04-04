"use client"

import { motion } from "framer-motion"
import { VolumeIcon as VolumeUp, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: string
  isUser: boolean
  darkMode: boolean
  fontSize: number
  onSpeakText: () => void
  isSpeaking: boolean
  stopSpeaking: () => void
}

export default function ChatMessage({
  message,
  isUser,
  darkMode,
  fontSize,
  onSpeakText,
  isSpeaking,
  stopSpeaking,
}: ChatMessageProps) {
  return (
    <motion.div
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-md relative group",
          isUser
            ? darkMode
              ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
              : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
            : darkMode
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800",
        )}
      >
        <p style={{ fontSize: `${fontSize}rem` }}>{message}</p>

        {!isUser && (
          <button
            onClick={isSpeaking ? stopSpeaking : onSpeakText}
            className={cn(
              "absolute -right-3 -top-3 p-2 rounded-full shadow-md transition-opacity",
              darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-gray-800 hover:bg-gray-100",
              isSpeaking ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          >
            {isSpeaking ? <X size={16} /> : <VolumeUp size={16} />}
          </button>
        )}
      </div>
    </motion.div>
  )
}

