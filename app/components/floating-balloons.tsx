"use client"

import { useEffect, useState } from "react"

type Balloon = {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  delay: number
}

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
]

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([])

  useEffect(() => {
    const createBalloons = () => {
      const newBalloons: Balloon[] = []
      const count = Math.min(15, Math.floor(window.innerWidth / 100))

      for (let i = 0; i < count; i++) {
        newBalloons.push({
          id: i,
          x: Math.random() * 100,
          y: 110 + Math.random() * 20, // Start below the screen
          size: 30 + Math.random() * 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: 0.5 + Math.random() * 1.5,
          delay: Math.random() * 10,
        })
      }

      setBalloons(newBalloons)
    }

    createBalloons()

    const interval = setInterval(() => {
      setBalloons((prevBalloons) =>
        prevBalloons.map((balloon) => {
          // If balloon has been delayed, start moving it
          if (balloon.delay > 0) {
            return { ...balloon, delay: balloon.delay - 0.1 }
          }

          // Move balloon up
          let newY = balloon.y - balloon.speed

          // If balloon is off the top of the screen, reset it to the bottom
          if (newY < -20) {
            newY = 110 + Math.random() * 20
          }

          return { ...balloon, y: newY }
        }),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className={`absolute rounded-full ${balloon.color}`}
          style={{
            left: `${balloon.x}%`,
            top: `${balloon.y}%`,
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.2}px`,
            transform: "translateY(0)",
            opacity: balloon.delay > 0 ? 0 : 0.8,
            transition: "opacity 1s ease",
            // Add a string at the bottom of the balloon
            boxShadow: `0 ${balloon.size * 0.8}px 0 -2px #888`,
          }}
        >
          {/* Balloon highlight */}
          <div
            className="absolute rounded-full bg-white opacity-30"
            style={{
              width: "30%",
              height: "30%",
              top: "10%",
              left: "10%",
            }}
          />
        </div>
      ))}
    </div>
  )
}
