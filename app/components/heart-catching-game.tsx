"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FallingItem {
  id: number
  x: number
  y: number
  speed: number
  size: number
  type: "heart" | "bomb"
  points: number
}

interface HeartCatchingGameProps {
  onClose: () => void
  onEnergyGain: (energy: number) => void
}

export default function HeartCatchingGame({ onClose, onEnergyGain }: HeartCatchingGameProps) {
  const [items, setItems] = useState<FallingItem[]>([])
  const [score, setScore] = useState(0)
  const [gameTime, setGameTime] = useState(30)
  const [gameActive, setGameActive] = useState(true)
  const [basketPosition, setBasksetPosition] = useState(50)

  const createItem = useCallback(() => {
    const isBomb = Math.random() < 0.15 // 15% chance for bomb
    let size, points

    if (isBomb) {
      size = 25
      points = -(Math.floor(Math.random() * 41) + 10) // -10 to -50
    } else {
      const sizeRandom = Math.random()
      if (sizeRandom < 0.2) {
        // 20% chance for large heart
        size = 35
        points = 30
      } else if (sizeRandom < 0.5) {
        // 30% chance for medium heart
        size = 25
        points = 20
      } else {
        // 50% chance for small heart
        size = 15
        points = 10
      }
    }

    const newItem: FallingItem = {
      id: Date.now() + Math.random(),
      x: Math.random() * 90 + 5,
      y: -5,
      speed: 1 + Math.random() * 2,
      size,
      type: isBomb ? "bomb" : "heart",
      points,
    }
    setItems((prev) => [...prev, newItem])
  }, [])

  useEffect(() => {
    if (!gameActive) return

    const itemInterval = setInterval(createItem, 800)
    const gameTimer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(itemInterval)
      clearInterval(gameTimer)
    }
  }, [gameActive, createItem])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setBasksetPosition(Math.max(8, Math.min(92, x)))
  }

  const resetGame = () => {
    setScore(0)
    setGameTime(30)
    setGameActive(true)
    setItems([])
  }

  useEffect(() => {
    if (!gameActive) return

    const animationInterval = setInterval(() => {
      setItems((prevItems) =>
        prevItems
          .map((item) => ({
            ...item,
            y: item.y + item.speed,
          }))
          .filter((item) => {
            // Check collision with basket
            if (item.y > 85 && item.y < 95 && item.x > basketPosition - 8 && item.x < basketPosition + 8) {
              const newScore = Math.max(0, score + item.points)
              setScore(newScore)

              // Add energy for hearts only (not bombs)
              if (item.type === "heart") {
                onEnergyGain(5)
              }

              // No sound effects - using only background music

              return false
            }
            // Remove items that fall off screen
            return item.y < 100
          }),
      )
    }, 16)

    return () => clearInterval(animationInterval)
  }, [gameActive, basketPosition, score, onEnergyGain])

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-red-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Bắt Trái Tim 💕</h3>
              <p className="text-sm opacity-90">Di chuyển chuột để bắt trái tim!</p>
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
          <div className="text-lg font-bold text-purple-600">Thời gian: {gameTime}s</div>
        </div>

        {/* Game Area */}
        <div
          className="relative h-96 bg-gradient-to-b from-blue-200 to-pink-200 overflow-hidden cursor-none"
          onMouseMove={handleMouseMove}
        >
          {/* Falling Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute transition-none pointer-events-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: `${item.size}px`,
                filter: `drop-shadow(0 0 ${item.size / 4}px ${item.type === "heart" ? "#ff69b4" : "#ff0000"})`,
              }}
            >
              {item.type === "heart" ? "💖" : "💣"}
            </div>
          ))}

          {/* Basket */}
          <div
            className="absolute bottom-4 w-16 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full border-2 border-yellow-700 transition-all duration-75 ease-out"
            style={{
              left: `${basketPosition - 8}%`,
            }}
          >
            <div className="absolute inset-1 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full"></div>
          </div>

          {/* Game Over Overlay */}
          {!gameActive && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 text-center">
                <h4 className="text-2xl font-bold text-pink-600 mb-2">Kết thúc!</h4>
                <p className="text-lg text-gray-700 mb-4">Điểm số: {score}</p>
                <Button
                  onClick={() => {
                    resetGame()
                  }}
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                >
                  Chơi lại
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
