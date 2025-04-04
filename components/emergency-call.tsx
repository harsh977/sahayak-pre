"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

interface EmergencyCallProps {
  onClose: () => void
  darkMode: boolean
  fontSize: number
  emergencyContact: {
    name: string
    phone: string
  }
}

export default function EmergencyCall({ onClose, darkMode, fontSize, emergencyContact }: EmergencyCallProps) {
  const [callStatus, setCallStatus] = useState<"dialing" | "ringing" | "connected" | "ended">("dialing")
  const [callDuration, setCallDuration] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    // Simulate call progression
    const dialingTimeout = setTimeout(() => {
      setCallStatus("ringing")

      const ringingTimeout = setTimeout(() => {
        setCallStatus("connected")

        const callInterval = setInterval(() => {
          setCallDuration((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(callInterval)
      }, 3000)

      return () => clearTimeout(ringingTimeout)
    }, 2000)

    return () => clearTimeout(dialingTimeout)
  }, [])

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={cn("w-full max-w-sm rounded-xl p-6 shadow-2xl", darkMode ? "bg-gray-900" : "bg-white")}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold" style={{ fontSize: `${1.25 * fontSize}rem` }}>
            {t("emergency_call")}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X size={24} />
          </Button>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white text-4xl">
            {emergencyContact.name.charAt(0)}
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold" style={{ fontSize: `${1.2 * fontSize}rem` }}>
              {emergencyContact.name}
            </h3>
            <p
              className={cn("text-lg", darkMode ? "text-gray-300" : "text-gray-600")}
              style={{ fontSize: `${1 * fontSize}rem` }}
            >
              {emergencyContact.phone}
            </p>

            <div className="mt-4 text-lg font-medium" style={{ fontSize: `${1.1 * fontSize}rem` }}>
              {callStatus === "dialing" && t("dialing")}
              {callStatus === "ringing" && t("ringing")}
              {callStatus === "connected" && (
                <span className="text-green-500">
                  {t("connected")} ({formatCallDuration(callDuration)})
                </span>
              )}
              {callStatus === "ended" && t("call_ended")}
            </div>
          </div>

          <div className="flex gap-4">
            {callStatus === "connected" ? (
              <Button
                className="bg-red-500 hover:bg-red-600 text-white rounded-full h-16 w-16 flex items-center justify-center"
                onClick={() => setCallStatus("ended")}
              >
                <Phone className="h-8 w-8" />
              </Button>
            ) : callStatus === "ended" ? (
              <Button
                className="bg-green-500 hover:bg-green-600 text-white rounded-full h-16 w-16 flex items-center justify-center"
                onClick={onClose}
              >
                <X className="h-8 w-8" />
              </Button>
            ) : (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                className="bg-green-500 rounded-full h-16 w-16 flex items-center justify-center"
              >
                <Phone className="h-8 w-8 text-white" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

