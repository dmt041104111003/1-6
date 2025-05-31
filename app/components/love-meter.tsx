"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Heart } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface LoveMeterProps {
  onClose: () => void
}

export default function LoveMeter({ onClose }: LoveMeterProps) {
  const [loveLevel, setLoveLevel] = useState(0)
  const [isCharging, setIsCharging] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const chargeLoveMeter = () => {
    if (isCharging) return

    setIsCharging(true)
    setLoveLevel(0)
    setResult(null)

    const interval = setInterval(() => {
      setLoveLevel((prev) => {
        const increment = Math.random() * 5 + 1
        const newLevel = Math.min(prev + increment, 100)

        if (newLevel >= 100) {
          clearInterval(interval)
          setIsCharging(false)
          setTimeout(() => {
            const finalLevel = 95 + Math.random() * 5 // Always high love level!
            setLoveLevel(finalLevel)
            setResult(getLoveMessage(finalLevel))
          }, 500)
        }

        return newLevel
      })
    }, 100)
  }

  const getLoveMessage = (level: number) => {
    if (level >= 99) {
      return "Tình yêu vô cực! Chúng ta sinh ra dành cho nhau! 💕✨"
    } else if (level >= 95) {
      return "Tình yêu hoàn hảo! Không gì có thể chia cắt chúng ta! 💖"
    } else if (level >= 90) {
      return "Tình yêu tuyệt vời! Chúng ta là cặp đôi lý tưởng! ❤️"
    } else {
      return "Tình yêu đẹp! Chúng ta rất hợp nhau! 💗"
    }
  }

  const getHeartEmojis = (level: number) => {
    if (level >= 99) return "💕💖💗💘💝💞💟❤️🧡💛💚💙💜🤍🖤🤎"
    if (level >= 95) return "💕💖💗💘💝💞💟❤️"
    if (level >= 90) return "💕💖💗💘"
    return "💕💖"
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-rose-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Đo Tình Yêu 💕</h3>
              <p className="text-sm opacity-90">Đo mức độ tình yêu của chúng ta!</p>
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

        <div className="p-6">
          {/* Love Meter Display */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4 animate-pulse">💖</div>
            <h4 className="text-2xl font-bold text-red-500 mb-4">Máy Đo Tình Yêu</h4>

            {/* Progress Bar */}
            <div className="mb-4">
              <Progress value={loveLevel} className="h-6 mb-2" />
              <div className="text-2xl font-bold text-red-500">{Math.round(loveLevel)}%</div>
            </div>

            {/* Heart Animation */}
            {isCharging && (
              <div className="text-4xl animate-bounce mb-4">
                {getHeartEmojis(loveLevel)
                  .split("")
                  .slice(0, Math.floor(loveLevel / 10))
                  .join("")}
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-4 mb-4 animate-fade-in-up">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-lg font-medium text-red-600">{result}</p>
              </div>
            )}

            {/* Charge Button */}
            <Button
              onClick={chargeLoveMeter}
              disabled={isCharging}
              className={`w-full py-4 text-lg font-bold ${
                isCharging
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600"
              }`}
            >
              {isCharging ? (
                <div className="flex items-center justify-center">
                  <Heart className="h-6 w-6 mr-2 animate-pulse" />
                  Đang đo...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Heart className="h-6 w-6 mr-2" />
                  Bắt đầu đo
                </div>
              )}
            </Button>

            {result && (
              <Button
                onClick={() => {
                  setLoveLevel(0)
                  setResult(null)
                }}
                variant="outline"
                className="w-full mt-3"
              >
                Đo lại
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
