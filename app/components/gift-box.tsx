"use client"

import { useState } from "react"

interface GiftBoxProps {
  onClick: () => void
}

export default function GiftBox({ onClick }: GiftBoxProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => {
      onClick()
    }, 500)
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative cursor-pointer transition-all duration-300 ${
          isHovered ? "scale-110" : "scale-100"
        } ${isClicked ? "animate-bounce" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Gift Box Base */}
        <div className="relative">
          {/* Box Shadow */}
          <div className="absolute top-2 left-2 w-32 h-32 bg-black/20 rounded-lg blur-sm"></div>

          {/* Main Box */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-xl">
            {/* Box Shine Effect */}
            <div className="absolute top-2 left-2 w-8 h-8 bg-white/30 rounded-full blur-sm"></div>

            {/* Vertical Ribbon */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-full bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-md"></div>

            {/* Horizontal Ribbon */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-6 bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-md"></div>

            {/* Ribbon Cross */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full shadow-lg"></div>
          </div>

          {/* Bow */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            {/* Left Bow */}
            <div className="absolute -left-3 top-0 w-6 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full transform -rotate-12 shadow-md"></div>

            {/* Right Bow */}
            <div className="absolute -right-3 top-0 w-6 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full transform rotate-12 shadow-md"></div>

            {/* Bow Center */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-full shadow-lg"></div>
          </div>

          {/* Sparkles around the box */}
          <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-3 w-1 h-1 bg-pink-300 rounded-full animate-ping delay-300"></div>
          <div className="absolute -bottom-2 -left-3 w-1 h-1 bg-purple-300 rounded-full animate-ping delay-500"></div>
          <div className="absolute -bottom-1 -right-2 w-2 h-2 bg-blue-300 rounded-full animate-ping delay-700"></div>
        </div>
      </div>

      {/* Glow Effect */}
      <div
        className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg blur-xl opacity-50"></div>
      </div>
    </div>
  )
}
