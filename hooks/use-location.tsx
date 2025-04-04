"use client"

import { useState } from "react"

interface LocationHook {
  location: { latitude: number; longitude: number } | null
  error: string | null
  isLoading: boolean
  requestLocation: () => void
}

export const useLocation = (): LocationHook => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setIsLoading(false)
      },
      (error) => {
        setError(error.message)
        setIsLoading(false)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    )
  }

  return { location, error, isLoading, requestLocation }
}

export default useLocation

