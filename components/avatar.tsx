"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AvatarProps {
  mood: "neutral" | "happy" | "thinking" | "religious" | "wellness" | "shopping"
  darkMode: boolean
}

export default function Avatar({ mood, darkMode }: AvatarProps) {
  // Get avatar color based on mood
  const getAvatarColor = () => {
    switch (mood) {
      case "religious":
        return "bg-gradient-to-br from-orange-400 to-red-500"
      case "wellness":
        return "bg-gradient-to-br from-green-400 to-teal-500"
      case "shopping":
        return "bg-gradient-to-br from-blue-400 to-indigo-500"
      default:
        return darkMode
          ? "bg-gradient-to-br from-amber-500 to-amber-700"
          : "bg-gradient-to-br from-amber-400 to-orange-500"
    }
  }

  // Different expressions based on mood
  const renderFace = () => {
    switch (mood) {
      case "happy":
        return (
          <>
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] left-1/4"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: 10, scaleX: 0.8 }}
            />
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] right-1/4"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: -10, scaleX: 0.8 }}
            />
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current bottom-[30%] left-1/4"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1], scaleX: 1.2 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
          </>
        )
      case "thinking":
        return (
          <>
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] left-1/4"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: 0 }}
            />
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] right-1/4"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: 0 }}
            />
            <motion.div
              className="absolute w-1/3 h-[2px] rounded-full bg-current bottom-[30%] right-1/3"
              initial={{ scale: 1, rotateZ: 0 }}
              animate={{ scale: 1, rotateZ: 20 }}
            />
          </>
        )
      case "religious":
        return (
          <>
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] left-1/4"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: 10, scaleX: 0.8 }}
            />
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] right-1/4"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: -10, scaleX: 0.8 }}
            />
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current bottom-[30%] left-1/4"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1], scaleX: 1.2 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
            <motion.div
              className="absolute -top-4 -right-2 text-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🕉️
            </motion.div>
          </>
        )
      case "wellness":
        return (
          <>
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] left-1/4"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: 10, scaleX: 0.8 }}
            />
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] right-1/4"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: -10, scaleX: 0.8 }}
            />
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current bottom-[30%] left-1/4"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1], scaleX: 1.2 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
            <motion.div
              className="absolute -top-4 -right-2 text-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              💚
            </motion.div>
          </>
        )
      case "shopping":
        return (
          <>
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] left-1/4"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: 10, scaleX: 0.8 }}
            />
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] right-1/4"
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: -10, scaleX: 0.8 }}
            />
            <motion.div
              className="absolute w-1/2 h-[2px] rounded-full bg-current bottom-[30%] left-1/4"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1], scaleX: 1.2 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
            <motion.div
              className="absolute -top-4 -right-2 text-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🛒
            </motion.div>
          </>
        )
      default:
        return (
          <>
            <motion.div className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] left-1/4" />
            <motion.div className="absolute w-1/2 h-[2px] rounded-full bg-current top-[40%] right-1/4" />
            <motion.div className="absolute w-1/3 h-[2px] rounded-full bg-current bottom-[30%] left-1/3" />
          </>
        )
    }
  }

  return (
    <motion.div
      className={cn(
        "relative w-28 h-28 rounded-full flex items-center justify-center text-white shadow-lg",
        getAvatarColor(),
      )}
      animate={{
        scale: mood === "thinking" ? [1, 1.05, 1] : 1,
      }}
      transition={{
        repeat: mood === "thinking" ? Number.POSITIVE_INFINITY : 0,
        duration: 1.5,
      }}
    >
      {renderFace()}

      {/* Thinking animation */}
      {mood === "thinking" && (
        <motion.div
          className="absolute -top-4 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg shadow-md"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            repeatDelay: 0.5,
          }}
        >
          ?
        </motion.div>
      )}
    </motion.div>
  )
}

