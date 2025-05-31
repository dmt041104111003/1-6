"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface FinalMessageProps {
  onClose: () => void
}

export default function FinalMessage({ onClose }: FinalMessageProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const message = "Chúng ta sẽ mãi bên nhau"

  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 150)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, message])

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-4 border-pink-300 max-w-md mx-auto text-center animate-fade-in-up">

        <h3 className="text-3xl font-bold text-pink-600 mb-6">
          {displayedText}
          {currentIndex < message.length && <span className="animate-pulse">|</span>}
        </h3>

        <p className="text-lg text-gray-700 mb-6">
          Bạn đã hoàn thành tất cả thử thách tình yêu! Tình yêu của chúng ta thật mạnh mẽ và bền vững!
        </p>
        <Button
          onClick={onClose}
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-bold text-lg"
        >

          Tiếp tục yêu thương
        </Button>
      </div>
    </div>
  )
}
