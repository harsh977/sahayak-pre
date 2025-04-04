"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function WelcomeAnimation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: [0, -15, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            repeatType: "reverse",
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-48 h-48">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 opacity-75"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.5, 0.7],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
            />
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Namaste Gesture"
              width={200}
              height={200}
              className="relative z-10 rounded-full p-4"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-4"
        >
          Namaste
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-2xl text-amber-700"
        >
          Welcome to Sahayak
        </motion.p>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 relative h-2 bg-amber-200 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "linear",
            }}
            className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-amber-400 to-orange-500"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

