"use client"

import { Progress } from "@/components/ui/progress"
import { Heart, Zap } from "lucide-react"

interface EnergyBarProps {
  energy: number
}

export default function EnergyBar({ energy }: EnergyBarProps) {
  const percentage = (energy / 300) * 100 // Changed from 1000 to 300

  return (
    <div className="fixed top-40 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-md px-4">
      {/* Energy Bar Container */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-pink-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500 animate-pulse" />
            <span className="font-bold text-gray-700 text-sm">Năng Lượng Tình Yêu</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="font-bold text-gray-700 text-sm">{energy}/300</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <Progress value={percentage} className="h-3" />
        </div>

        {/* Status */}
        {energy >= 300 ? (
          <div className="text-center">
            <span className="text-xs font-medium text-green-600 animate-pulse">✨ Năng lượng đã đầy! ✨</span>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-xs text-gray-500">{Math.round(percentage)}% hoàn thành</span>
          </div>
        )}
      </div>

      {/* Instruction Text */}
      <div className="mt-3 text-center">
        <div className="inline-block bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <p className="text-white text-xs font-medium">✨ Chơi các game để update thanh năng lượng ✨</p>
        </div>
      </div>
    </div>
  )
}
