"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Character = {
  id: number
  type: "kitty" | "puppy"
  x: number
  y: number
  direction: "left" | "right"
  speed: number
  size: number
}

export default function AnimatedCharacters() {
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    // Create initial characters
    const initialCharacters: Character[] = []

    // Add 3 Hello Kitty characters
    for (let i = 0; i < 3; i++) {
      initialCharacters.push({
        id: i,
        type: "kitty",
        x: Math.random() * 80 + 10, // 10% to 90% of screen width
        y: Math.random() * 80 + 10, // 10% to 90% of screen height
        direction: Math.random() > 0.5 ? "left" : "right",
        speed: 0.5 + Math.random() * 1.5,
        size: 50 + Math.random() * 30,
      })
    }

    // Add 3 puppy characters
    for (let i = 3; i < 6; i++) {
      initialCharacters.push({
        id: i,
        type: "puppy",
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        direction: Math.random() > 0.5 ? "left" : "right",
        speed: 0.5 + Math.random() * 1.5,
        size: 50 + Math.random() * 30,
      })
    }

    setCharacters(initialCharacters)

    // Animation loop
    const interval = setInterval(() => {
      setCharacters((prevCharacters) =>
        prevCharacters.map((character) => {
          let newX = character.x

          // Move character
          if (character.direction === "right") {
            newX += character.speed
            if (newX > 95) {
              return {
                ...character,
                direction: "left",
                x: 95,
              }
            }
          } else {
            newX -= character.speed
            if (newX < 0) {
              return {
                ...character,
                direction: "right",
                x: 0,
              }
            }
          }

          // Randomly change direction occasionally
          if (Math.random() < 0.01) {
            return {
              ...character,
              direction: character.direction === "left" ? "right" : "left",
              x: newX,
            }
          }

          // Randomly change vertical position occasionally
          if (Math.random() < 0.02) {
            const newY = Math.min(Math.max(character.y + (Math.random() * 10 - 5), 0), 90)
            return {
              ...character,
              y: newY,
              x: newX,
            }
          }

          return {
            ...character,
            x: newX,
          }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {characters.map((character) => (
        <div
          key={character.id}
          className="absolute transition-all duration-300 ease-linear"
          style={{
            left: `${character.x}%`,
            top: `${character.y}%`,
            transform: `scaleX(${character.direction === "left" ? -1 : 1})`,
            width: `${character.size}px`,
            height: `${character.size}px`,
          }}
        >
          <Image
            src={character.type === "kitty" ? "/images/hello-kitty.png" : "/images/puppy.png"}
            alt={character.type === "kitty" ? "Hello Kitty" : "Puppy"}
            width={character.size}
            height={character.size}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  )
}
