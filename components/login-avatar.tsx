"use client"

import { motion } from "framer-motion"

interface LoginAvatarProps {
  activeTab: "login" | "signup"
}

export default function LoginAvatar({ activeTab }: LoginAvatarProps) {
  return (
    <motion.div
      className="flex justify-center mb-6"
      initial={{ y: 0 }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 3,
        repeatType: "reverse",
      }}
    >
      <div className="relative">
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center"
          animate={{
            scale: activeTab === "signup" ? [1, 1.05, 1] : 1,
          }}
          transition={{
            repeat: activeTab === "signup" ? Number.POSITIVE_INFINITY : 0,
            duration: 2,
          }}
        >
          {/* Face */}
          <div className="relative w-full h-full">
            {/* Eyes */}
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-white top-[35%] left-[30%]"
              animate={{
                scaleY: activeTab === "login" ? [1, 0.3, 1] : 1,
              }}
              transition={{
                repeat: activeTab === "login" ? Number.POSITIVE_INFINITY : 0,
                repeatDelay: 2,
                duration: 0.3,
              }}
            />
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-white top-[35%] right-[30%]"
              animate={{
                scaleY: activeTab === "login" ? [1, 0.3, 1] : 1,
              }}
              transition={{
                repeat: activeTab === "login" ? Number.POSITIVE_INFINITY : 0,
                repeatDelay: 2,
                duration: 0.3,
              }}
            />

            {/* Mouth */}
            <motion.div
              className="absolute w-10 h-2 rounded-full bg-white bottom-[30%] left-[29%]"
              animate={{
                scaleY: activeTab === "signup" ? [1, 2, 1] : 1,
                scaleX: activeTab === "signup" ? [1, 0.8, 1] : 1,
              }}
              transition={{
                repeat: activeTab === "signup" ? Number.POSITIVE_INFINITY : 0,
                duration: 2,
              }}
            />
          </div>
        </motion.div>

        {/* Speech bubble for signup */}
        {activeTab === "signup" && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-8 -right-12 bg-white rounded-lg p-2 shadow-md"
          >
            <p className="text-sm">👋 {Math.random() > 0.5 ? "Namaste!" : "Hello!"}</p>
            <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white transform rotate-45" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

