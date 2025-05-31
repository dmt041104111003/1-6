"use client"

import { useEffect, useState } from "react"

type HeartParticle = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

export default function HeartFireworks() {
  const [particles, setParticles] = useState<HeartParticle[]>([])

  useEffect(() => {
    const colors = ["#ff69b4", "#ff1493", "#dc143c", "#ff6347", "#ff4500", "#ffd700"]
    let particleId = 0

    const createHeartBurst = (x: number, y: number) => {
      const newParticles: HeartParticle[] = []

      // Create heart-shaped burst pattern
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2
        const speed = 2 + Math.random() * 4

        // Heart shape calculation
        const heartX = 16 * Math.sin(angle) ** 3
        const heartY = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle))

        newParticles.push({
          id: particleId++,
          x: x,
          y: y,
          vx: (heartX / 16) * speed,
          vy: (heartY / 16) * speed,
          size: 8 + Math.random() * 12,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 100,
          maxLife: 100,
        })
      }

      return newParticles
    }

    const createRandomBurst = () => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.1
      return createHeartBurst(x, y)
    }

    // Initial burst
    setParticles(createRandomBurst())

    // Create new bursts periodically
    const burstInterval = setInterval(() => {
      setParticles((prev) => [...prev, ...createRandomBurst()])
    }, 1500)

    // Animation loop
    const animationInterval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1, // gravity
            life: particle.life - 1,
          }))
          .filter((particle) => particle.life > 0),
      )
    }, 16)

    return () => {
      clearInterval(burstInterval)
      clearInterval(animationInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            fontSize: `${particle.size}px`,
            color: particle.color,
            opacity: particle.life / particle.maxLife,
            transform: "translate(-50%, -50%)",
            filter: `drop-shadow(0 0 ${particle.size / 2}px ${particle.color})`,
          }}
        >
          💖
        </div>
      ))}
    </div>
  )
}
