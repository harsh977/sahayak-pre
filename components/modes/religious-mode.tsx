"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import { searchNearbyTemples } from "@/lib/api-services"

interface ReligiousModeProps {
  darkMode: boolean
  fontSize: number
  location?: { latitude: number; longitude: number } | null
}

interface Temple {
  id: string
  name: string
  deity: string
  distance: string
  address: string
  timings: string
}

export default function ReligiousMode({ darkMode, fontSize, location }: ReligiousModeProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [temples, setTemples] = useState<Temple[]>([])

  const { t } = useTranslation()

  const handleSearch = async () => {
    setIsSearching(true)
    try {
      const results = await searchNearbyTemples(location?.latitude || 12.9716, location?.longitude || 77.5946)
      setTemples(results)
    } catch (error) {
      console.error("Error searching temples:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const topics = [
    { icon: "🕉️", title: t("hindu_scriptures"), description: t("scriptures_description") },
    { icon: "🙏", title: t("daily_prayers"), description: t("prayers_description") },
    { icon: "🛕", title: t("temple_visits"), description: t("temple_description") },
    { icon: "📖", title: t("religious_stories"), description: t("stories_description") },
    { icon: "🪔", title: t("festivals"), description: t("festivals_description") },
    { icon: "🧘‍♀️", title: t("meditation"), description: t("meditation_description") },
  ]

  return (
    <div className="space-y-4">
      <motion.h2
        className={cn("text-2xl font-bold mb-4", darkMode ? "text-orange-400" : "text-orange-600")}
        style={{ fontSize: `${1.3 * fontSize}rem` }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("religious_companion")}
      </motion.h2>

      <motion.p
        className={darkMode ? "text-gray-300" : "text-gray-700"}
        style={{ fontSize: `${fontSize}rem` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t("religious_welcome_message")}
      </motion.p>

      {/* Temple search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className={cn("p-4", darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-orange-100")}>
          <h3 className="font-medium mb-3" style={{ fontSize: `${1.1 * fontSize}rem` }}>
            {t("find_temples")}
          </h3>

          <div className="flex gap-2">
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full bg-orange-500 hover:bg-orange-600 flex gap-2"
            >
              <MapPin size={18} />
              {location ? t("find_temples_near_me") : t("find_temples_nearby")}
            </Button>
          </div>

          {isSearching && (
            <div className="flex justify-center my-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            </div>
          )}

          {temples.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="font-medium" style={{ fontSize: `${1 * fontSize}rem` }}>
                {t("nearby_temples")}
              </h4>

              {temples.map((temple) => (
                <motion.div
                  key={temple.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("p-3 rounded-lg", darkMode ? "bg-gray-700" : "bg-orange-50")}
                >
                  <div className="flex justify-between">
                    <h5 className="font-medium" style={{ fontSize: `${1 * fontSize}rem` }}>
                      {temple.name}
                    </h5>
                    <span className="text-sm">{temple.distance}</span>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontSize: `${0.85 * fontSize}rem` }}>
                    {temple.deity} • {temple.timings}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontSize: `${0.85 * fontSize}rem` }}>
                    {temple.address}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

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
                  : "bg-white hover:bg-orange-50 border-orange-100",
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

