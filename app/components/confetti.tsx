"use client"

import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti"

export default function Confetti() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  })
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Stop confetti after 8 seconds
    const timer = setTimeout(() => {
      setIsActive(false)
    }, 8000)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      clearTimeout(timer)
    }
  }, [])

  if (!isActive) return null

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={true}
      numberOfPieces={500}
      gravity={0.15}
      colors={[
        "#FF69B4", // Pink
        "#FFD700", // Gold
        "#FF6347", // Tomato
        "#00CED1", // Turquoise
        "#9370DB", // Medium Purple
        "#32CD32", // Lime Green
      ]}
    />
  )
}
