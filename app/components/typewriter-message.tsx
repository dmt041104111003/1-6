"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface TypewriterMessageProps {
  message: string
  onComplete: () => void
  onPlayNow: () => void
  speed?: number
}

export default function TypewriterMessage({ message, onComplete, onPlayNow, speed = 80 }: TypewriterMessageProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      // Start disappearing after 10 seconds
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          onComplete()
        }, 1000)
      }, 10000)
    }
  }, [currentIndex, message, speed, isComplete, onComplete])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none px-4">
      <div
        className={`bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-pink-300 max-w-lg md:max-w-2xl mx-auto transition-all duration-1000 pointer-events-auto ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ marginTop: "60px" }}
      >
        <div className="text-center">
          <div className="text-4xl md:text-6xl mb-4 animate-pulse">💕</div>
          <h3 className="text-xl md:text-2xl font-bold text-pink-600 mb-4">Kỷ Niệm Đặc Biệt</h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
            {displayedText}
            {!isComplete && <span className="inline-block w-1 h-5 bg-pink-500 ml-1 animate-pulse"></span>}
          </p>

          {/* Replace heart emojis with text and button */}
          {isComplete && (
            <div className="mt-6">
              <p className="text-lg font-medium text-purple-600 mb-4">Hãy chuẩn bị chơi trò chơi!</p>
              <Button
                onClick={onPlayNow}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Chơi ngay
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
