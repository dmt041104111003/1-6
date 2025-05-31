"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface Flower {
  id: number
  x: number
  y: number
  stage: number // 0: seed, 1: sprout, 2: bud, 3: bloom
  type: string
}

interface LoveGardenGameProps {
  onClose: () => void
}

const flowerTypes = ["🌹", "🌺", "🌻", "🌷", "🌸"]

export default function LoveGardenGame({ onClose }: LoveGardenGameProps) {
  const [flowers, setFlowers] = useState<Flower[]>([])
  const [score, setScore] = useState(0)
  const [water, setWater] = useState(10)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    // Auto-grow flowers
    const interval = setInterval(() => {
      setFlowers((prev) =>
        prev.map((flower) => {
          if (flower.stage < 3 && Math.random() < 0.3) {
            const newStage = flower.stage + 1
            if (newStage === 3) {
              setScore((s) => s + 50) // Bonus for blooming
            }
            return { ...flower, stage: newStage }
          }
          return flower
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Check if garden is complete (10 bloomed flowers)
    const bloomedFlowers = flowers.filter((f) => f.stage === 3).length
    if (bloomedFlowers >= 10 && !gameComplete) {
      setGameComplete(true)
    }
  }, [flowers, gameComplete])

  const plantFlower = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    // Check if there's already a flower nearby
    const tooClose = flowers.some((flower) => Math.abs(flower.x - x) < 8 && Math.abs(flower.y - y) < 8)

    if (tooClose) return

    const newFlower: Flower = {
      id: Date.now(),
      x,
      y,
      stage: 0,
      type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
    }

    setFlowers((prev) => [...prev, newFlower])
    setScore(score + 10)
  }

  const waterFlower = (flowerId: number) => {
    if (water <= 0) return

    setWater(water - 1)
    setFlowers((prev) =>
      prev.map((flower) => {
        if (flower.id === flowerId && flower.stage < 3) {
          const newStage = Math.min(flower.stage + 1, 3)
          if (newStage === 3) {
            setScore((s) => s + 30) // Bonus for manual blooming
          }
          return { ...flower, stage: newStage }
        }
        return flower
      }),
    )
  }

  const getFlowerDisplay = (flower: Flower) => {
    switch (flower.stage) {
      case 0:
        return "🌱" // seed
      case 1:
        return "🌿" // sprout
      case 2:
        return "🌹" // bud (generic)
      case 3:
        return flower.type // bloom
      default:
        return "🌱"
    }
  }

  const resetGame = () => {
    setFlowers([])
    setScore(0)
    setWater(10)
    setGameComplete(false)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Vườn Tình Yêu 🌹</h3>
              <p className="text-sm opacity-90">Nhấn để trồng hoa, click hoa để tưới nước!</p>
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
        <div className="bg-green-50 p-4 flex justify-between items-center">
          <div className="text-lg font-bold text-green-600">Điểm: {score}</div>
          <div className="text-lg font-bold text-blue-600">Nước: {water} 💧</div>
          <div className="text-lg font-bold text-purple-600">
            Hoa nở: {flowers.filter((f) => f.stage === 3).length}/10
          </div>
        </div>

        {/* Garden Area */}
        <div
          className="relative h-96 bg-gradient-to-b from-green-200 to-green-300 overflow-hidden cursor-crosshair"
          onClick={plantFlower}
        >
          {/* Flowers */}
          {flowers.map((flower) => (
            <button
              key={flower.id}
              className="absolute text-2xl hover:scale-110 transition-transform duration-200"
              style={{
                left: `${flower.x}%`,
                top: `${flower.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={(e) => {
                e.stopPropagation()
                waterFlower(flower.id)
              }}
            >
              {getFlowerDisplay(flower)}
            </button>
          ))}

          {/* Instructions */}
          {flowers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 rounded-xl p-4 text-center">
                <p className="text-lg font-medium text-green-700">Nhấn vào đất để trồng hoa đầu tiên! 🌱</p>
              </div>
            </div>
          )}

          {/* Game Complete Overlay */}
          {gameComplete && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">🌺</div>
                <h4 className="text-2xl font-bold text-green-600 mb-2">Vườn hoàn thành!</h4>
                <p className="text-lg text-gray-700 mb-4">Điểm số: {score}</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={resetGame}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    Trồng vườn mới
                  </Button>
                  <Button onClick={onClose} variant="outline">
                    Đóng
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
