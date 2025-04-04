"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import { searchNearbyRestaurants } from "@/lib/api-services"

interface ShoppingModeProps {
  darkMode: boolean
  fontSize: number
  location?: { latitude: number; longitude: number } | null
}

interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  distance: string
  address: string
  image: string
}

export default function ShoppingMode({ darkMode, fontSize, location }: ShoppingModeProps) {
  const [showLocation, setShowLocation] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  const { t } = useTranslation()

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      const results = await searchNearbyRestaurants(
        searchQuery,
        location?.latitude || 12.9716,
        location?.longitude || 77.5946,
      )
      setRestaurants(results)
    } catch (error) {
      console.error("Error searching restaurants:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const services = [
    { icon: "🥗", title: t("grocery_delivery"), description: t("grocery_description") },
    { icon: "🍲", title: t("food_delivery"), description: t("food_description") },
    { icon: "💊", title: t("pharmacy"), description: t("pharmacy_description") },
    { icon: "🛍️", title: t("online_shopping"), description: t("shopping_description") },
  ]

  return (
    <div className="space-y-4">
      <motion.h2
        className={cn("text-2xl font-bold mb-4", darkMode ? "text-blue-400" : "text-blue-600")}
        style={{ fontSize: `${1.3 * fontSize}rem` }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("shopping_assistant")}
      </motion.h2>

      <motion.p
        className={darkMode ? "text-gray-300" : "text-gray-700"}
        style={{ fontSize: `${fontSize}rem` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t("shopping_welcome_message")}
      </motion.p>

      {/* Location card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card
          className={cn(
            "p-4 cursor-pointer",
            darkMode ? "bg-gray-800 hover:bg-gray-700 border-gray-700" : "bg-white hover:bg-blue-50 border-blue-100",
          )}
          onClick={() => setShowLocation(!showLocation)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-medium" style={{ fontSize: `${1.1 * fontSize}rem` }}>
                  {t("delivery_location")}
                </h3>
                <p
                  className={darkMode ? "text-gray-400" : "text-gray-600"}
                  style={{ fontSize: `${0.9 * fontSize}rem` }}
                >
                  {location
                    ? t("location_detected", { lat: location.latitude.toFixed(4), lng: location.longitude.toFixed(4) })
                    : showLocation
                      ? "42 Lakshmi Apartments, Jayanagar"
                      : t("tap_to_set_location")}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className={darkMode ? "border-gray-600" : "border-blue-200"}>
              {location || showLocation ? t("change") : t("set")}
            </Button>
          </div>

          {showLocation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <p className={darkMode ? "text-gray-300" : "text-gray-700"} style={{ fontSize: `${fontSize}rem` }}>
                {t("delivery_address_label")}
              </p>
              <p className="font-medium mt-1" style={{ fontSize: `${fontSize}rem` }}>
                42 Lakshmi Apartments, 4th Block
                <br />
                Jayanagar, Bangalore - 560041
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Food search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className={cn("p-4", darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100")}>
          <h3 className="font-medium mb-3" style={{ fontSize: `${1.1 * fontSize}rem` }}>
            {t("find_restaurants")}
          </h3>

          <div className="flex gap-2">
            <Input
              placeholder={t("search_food_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={darkMode ? "bg-gray-700 border-gray-600" : ""}
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Search size={18} />
            </Button>
          </div>

          {isSearching && (
            <div className="flex justify-center my-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          )}

          {restaurants.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="font-medium" style={{ fontSize: `${1 * fontSize}rem` }}>
                {t("search_results")}
              </h4>

              {restaurants.map((restaurant) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("p-3 rounded-lg flex gap-3", darkMode ? "bg-gray-700" : "bg-blue-50")}
                >
                  <div
                    className="w-16 h-16 rounded-lg bg-gray-300 flex-shrink-0 overflow-hidden"
                    style={{ backgroundImage: `url(${restaurant.image})`, backgroundSize: "cover" }}
                  />

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h5 className="font-medium" style={{ fontSize: `${1 * fontSize}rem` }}>
                        {restaurant.name}
                      </h5>
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1">{restaurant.rating}</span>
                      </div>
                    </div>

                    <p
                      className="text-sm text-gray-500 dark:text-gray-400"
                      style={{ fontSize: `${0.85 * fontSize}rem` }}
                    >
                      {restaurant.cuisine} • {restaurant.distance}
                    </p>

                    <p
                      className="text-sm text-gray-500 dark:text-gray-400 truncate"
                      style={{ fontSize: `${0.85 * fontSize}rem` }}
                    >
                      {restaurant.address}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      {/* Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            <Card
              className={cn(
                "p-4 cursor-pointer flex items-center gap-3",
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
                  : "bg-white hover:bg-blue-50 border-blue-100",
              )}
            >
              <div className="text-3xl">{service.icon}</div>
              <div>
                <h3 className="font-medium" style={{ fontSize: `${1.1 * fontSize}rem` }}>
                  {service.title}
                </h3>
                <p
                  className={darkMode ? "text-gray-400" : "text-gray-600"}
                  style={{ fontSize: `${0.9 * fontSize}rem` }}
                >
                  {service.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

