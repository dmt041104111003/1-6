"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import Confetti from "./confetti"

interface InteractiveCakeProps {
  onComplete: () => void
}

export default function InteractiveCake({ onComplete }: InteractiveCakeProps) {
  const [progress, setProgress] = useState(0)
  const [isLit, setIsLit] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [message, setMessage] = useState("Nhấn vào cây nến để thổi tắt!")
  const [isFlickering, setIsFlickering] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Candle flickering effect
    const flickerInterval = setInterval(() => {
      if (isLit) {
        setIsFlickering((prev) => !prev)
      }
    }, 500)

    return () => clearInterval(flickerInterval)
  }, [isLit])

  const handleCandleClick = () => {
    if (!isLit) return

    // Random progress between 5% and 20%
    const randomProgress = Math.floor(Math.random() * 16) + 5
    const newProgress = Math.min(progress + randomProgress, 100)

    setProgress(newProgress)

    // Play blowing sound
    const audio = new Audio("/sounds/blow.mp3")
    audio.play().catch((e) => console.error("Error playing sound:", e))

    if (newProgress < 100) {
      // Not yet complete
      toast({
        title: `${newProgress}%`,
        description: "Tiếp tục thổi nến!",
        variant: "default",
      })
      setMessage(`Đã thổi được ${newProgress}%! Tiếp tục nào!`)
    } else {
      // Complete - candle is blown out
      setIsLit(false)
      setShowConfetti(true)
      setMessage("Chúc mừng! Điều ước của em sẽ thành hiện thực! ✨")

      // Play success sound
      const successAudio = new Audio("/sounds/success.mp3")
      successAudio.play().catch((e) => console.error("Error playing sound:", e))

      toast({
        title: "Tuyệt vời! 100%",
        description: "Em đã thổi tắt nến thành công!",
        variant: "default",
      })
    }
  }

  return (
    <div className="flex flex-col items-center">
      {showConfetti && <Confetti />}

      <div className="mb-6 text-center">
        <p className="text-lg font-medium text-pink-700">{message}</p>
      </div>

      <div className="relative mb-8 cursor-pointer" onClick={handleCandleClick}>
        {/* Cake base */}
        <div className="w-64 h-32 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-3xl relative">
          {/* Cake decorations */}
          <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-white"></div>
          <div className="absolute top-6 left-12 w-3 h-3 rounded-full bg-white"></div>
          <div className="absolute top-5 left-20 w-5 h-5 rounded-full bg-white"></div>
          <div className="absolute top-7 left-32 w-4 h-4 rounded-full bg-white"></div>
          <div className="absolute top-4 left-44 w-3 h-3 rounded-full bg-white"></div>
          <div className="absolute top-16 left-8 w-4 h-4 rounded-full bg-white"></div>
          <div className="absolute top-18 left-16 w-3 h-3 rounded-full bg-white"></div>
          <div className="absolute top-20 left-28 w-5 h-5 rounded-full bg-white"></div>
          <div className="absolute top-14 left-40 w-4 h-4 rounded-full bg-white"></div>

          {/* Single candle in the middle */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm">
            {isLit && (
              <div
                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-4 h-8 
                  bg-gradient-to-b from-yellow-300 to-orange-500 rounded-full 
                  ${isFlickering ? "scale-100" : "scale-90"} transition-transform duration-300`}
              ></div>
            )}
          </div>
        </div>

        {/* Cake base */}
        <div className="w-72 h-8 bg-gradient-to-b from-pink-500 to-pink-600 rounded-b-xl -mt-1 mx-auto"></div>

        {/* Cake plate */}
        <div className="w-80 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full -mt-1 mx-auto"></div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-6">
        <Progress value={progress} className="h-4" />
        <p className="text-center mt-2 text-sm font-medium text-gray-600">{progress}% hoàn thành</p>
      </div>

      {!isLit && (
        <div className="mt-6">
          <Button
            onClick={onComplete}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Kết thúc
          </Button>
        </div>
      )}
    </div>
  )
}
