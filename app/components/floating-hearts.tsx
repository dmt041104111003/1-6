"use client"

import { useEffect, useState } from "react"

type FloatingHeart = {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  emoji: string
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const heartEmojis = ["💕", "💖", "💗", "💘", "💝", "💞", "💟", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤍", "🖤", "🤎"]

    const createHearts = () => {
      const newHearts: FloatingHeart[] = []
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: 110 + Math.random() * 20,
          size: 20 + Math.random() * 30,
          speed: 0.3 + Math.random() * 0.7,
          opacity: 0.3 + Math.random() * 0.4,
          emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        })
      }
      setHearts(newHearts)
    }

    createHearts()

    const interval = setInterval(() => {
      setHearts((prevHearts) =>
        prevHearts.map((heart) => {
          let newY = heart.y - heart.speed
          if (newY < -10) {
            newY = 110 + Math.random() * 20
          }
          return { ...heart, y: newY }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-pulse"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            filter: `drop-shadow(0 0 ${heart.size / 4}px rgba(255, 105, 180, 0.5))`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  )
}
