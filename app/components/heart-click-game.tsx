"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ClickableHeart {
  id: number
  x: number
  y: number
  size: number
  color: string
  clicked: boolean
}

interface HeartClickGameProps {
  onClose: () => void
}

export default function HeartClickGame({ onClose }: HeartClickGameProps) {
  const [hearts, setHearts] = useState<ClickableHeart[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20)
  const [gameActive, setGameActive] = useState(true)

  const colors = ["#ff69b4", "#ff1493", "#dc143c", "#ff6347", "#ff4500", "#ffd700"]

  useEffect(() => {
    // Create initial hearts
    const initialHearts: ClickableHeart[] = []
    for (let i = 0; i < 15; i++) {
      initialHearts.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        size: 30 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        clicked: false,
      })
    }
    setHearts(initialHearts)
  }, [])

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  useEffect(() => {
    // Add new hearts periodically
    if (!gameActive) return

    const heartInterval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 15,
          size: 30 + Math.random() * 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          clicked: false,
        },
      ])
    }, 2000)

    return () => clearInterval(heartInterval)
  }, [gameActive])

  const handleHeartClick = (heartId: number) => {
    setHearts((prev) =>
      prev
        .map((heart) => (heart.id === heartId ? { ...heart, clicked: true } : heart))
        .filter((heart) => !heart.clicked),
    )
    setScore((prev) => prev + 10)

    // Create explosion effect
    const audio = new Audio("/sounds/pop.mp3")
    audio.play().catch((e) => console.error("Error playing sound:", e))
  }

  const resetGame = () => {
    setScore(0)
    setTimeLeft(20)
    setGameActive(true)
    setHearts([])
    // Recreate initial hearts
    const initialHearts: ClickableHeart[] = []
    for (let i = 0; i < 15; i++) {
      initialHearts.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        size: 30 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        clicked: false,
      })
    }
    setHearts(initialHearts)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Nổ Trái Tim 💥</h3>
              <p className="text-sm opacity-90">Nhấn vào trái tim để nổ tung!</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="text-white border-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Game Stats */}
        <div className="bg-pink-50 p-4 flex justify-between items-center">
          <div className="text-lg font-bold text-pink-600">Điểm: {score}</div>
          <div className="text-lg font-bold text-rose-600">Thời gian: {timeLeft}s</div>
        </div>

        {/* Game Area */}
        <div className="relative h-96 bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
          {/* Hearts */}
          {hearts.map((heart) => (
            <button
              key={heart.id}
              className="absolute transition-all duration-200 hover:scale-110 cursor-pointer animate-pulse"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                fontSize: `${heart.size}px`,
                color: heart.color,
                filter: `drop-shadow(0 0 ${heart.size / 4}px ${heart.color})`,
              }}
              onClick={() => handleHeartClick(heart.id)}
            >
              💖
            </button>
          ))}

          {/* Game Over Overlay */}
          {!gameActive && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="text-2xl font-bold text-pink-600 mb-2">Hết giờ!</h4>
                <p className="text-lg text-gray-700 mb-4">Điểm số: {score}</p>
                <div className="text-4xl mb-4">{score >= 200 ? "🏆" : score >= 100 ? "💕" : "💖"}</div>
                <Button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 mr-4"
                >
                  Chơi lại
                </Button>
                <Button onClick={onClose} variant="outline">
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
