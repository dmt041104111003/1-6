"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  speed?: number
}

export default function TypewriterText({ text, speed = 50 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text, speed])

  return (
    <div className="relative">
      <p className="text-lg text-center font-medium text-pink-800 leading-relaxed">
        {displayedText}
        {!isComplete && <span className="inline-block w-2 h-4 bg-pink-500 ml-1 animate-pulse"></span>}
      </p>
    </div>
  )
}
