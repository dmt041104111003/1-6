"use client"

import { useState, useEffect } from "react"

export default function BirthdayCake() {
  const [lit, setLit] = useState(true)
  const [blowingAnimation, setBlowingAnimation] = useState(false)

  const handleClick = () => {
    if (lit) {
      setBlowingAnimation(true)
      setTimeout(() => {
        setLit(false)
        setBlowingAnimation(false)
      }, 1000)
    } else {
      setLit(true)
    }
  }

  useEffect(() => {
    // Add a small animation to the candles
    const interval = setInterval(() => {
      const flames = document.querySelectorAll(".flame")
      flames.forEach((flame) => {
        flame.classList.toggle("animate-flicker")
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`relative cursor-pointer transition-transform duration-300 ${blowingAnimation ? "animate-wiggle" : "hover:scale-105"}`}
        onClick={handleClick}
        title={lit ? "Thổi nến đi!" : "Thắp lại nến"}
      >
        {/* Cake */}
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

          {/* Candles */}
          <div className="absolute -top-14 left-12 w-3 h-14 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm">
            {lit && (
              <div className="flame absolute -top-6 left-0 w-3 h-6 bg-gradient-to-b from-yellow-300 to-orange-500 rounded-full animate-flicker"></div>
            )}
          </div>
          <div className="absolute -top-16 left-24 w-3 h-16 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm">
            {lit && (
              <div className="flame absolute -top-6 left-0 w-3 h-6 bg-gradient-to-b from-yellow-300 to-orange-500 rounded-full animate-flicker"></div>
            )}
          </div>
          <div className="absolute -top-12 left-36 w-3 h-12 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm">
            {lit && (
              <div className="flame absolute -top-6 left-0 w-3 h-6 bg-gradient-to-b from-yellow-300 to-orange-500 rounded-full animate-flicker"></div>
            )}
          </div>
          <div className="absolute -top-14 left-48 w-3 h-14 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm">
            {lit && (
              <div className="flame absolute -top-6 left-0 w-3 h-6 bg-gradient-to-b from-yellow-300 to-orange-500 rounded-full animate-flicker"></div>
            )}
          </div>
        </div>

        {/* Cake base */}
        <div className="w-72 h-8 bg-gradient-to-b from-pink-500 to-pink-600 rounded-b-xl -mt-1 mx-auto"></div>

        {/* Cake plate */}
        <div className="w-80 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full -mt-1 mx-auto"></div>
      </div>

      <p className="mt-4 text-center text-pink-700 font-medium">
        {lit ? "Nhấn vào bánh để thổi nến và ước điều ước!" : "Điều ước của em sẽ thành hiện thực! ✨"}
      </p>
    </div>
  )
}
