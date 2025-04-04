"use client"

import { useState, useEffect } from "react"

interface TextToSpeechHook {
  speak: (text: string, language?: string) => void
  stop: () => void
  isSpeaking: boolean
  stopSpeaking: () => void
}

export const useTextToSpeech = (): TextToSpeechHook => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (utterance) {
        window.speechSynthesis.cancel()
      }
    }
  }, [utterance])

  const speak = (text: string, language = "en-US") => {
    // Stop any current speech
    stop()

    // Create a new utterance
    const newUtterance = new SpeechSynthesisUtterance(text)
    newUtterance.lang = language
    newUtterance.rate = 0.9 // Slightly slower for seniors
    newUtterance.pitch = 1

    // Set up event handlers
    newUtterance.onstart = () => setIsSpeaking(true)
    newUtterance.onend = () => setIsSpeaking(false)
    newUtterance.onerror = () => setIsSpeaking(false)

    // Store the utterance
    setUtterance(newUtterance)

    // Start speaking
    window.speechSynthesis.speak(newUtterance)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  // Alias for stop to match the component prop name
  const stopSpeaking = stop

  return { speak, stop, isSpeaking, stopSpeaking }
}

export default useTextToSpeech

