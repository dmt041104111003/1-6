"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Star } from "lucide-react"

interface StarPoint {
  id: number
  x: number
  y: number
  connected: boolean
  isTarget: boolean
}

interface Connection {
  from: number
  to: number
}

interface LoveConstellationGameProps {
  onClose: () => void
}

export default function LoveConstellationGame({ onClose }: LoveConstellationGameProps) {
  const [stars, setStars] = useState<StarPoint[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedStar, setSelectedStar] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [targetPattern, setTargetPattern] = useState<Connection[]>([])
  const [isComplete, setIsComplete] = useState(false)

  // Heart pattern for level 1
  const heartPattern: Connection[] = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 6, to: 0 },
  ]

  useEffect(() => {
    generateLevel()
  }, [level])

  const generateLevel = () => {
    // Generate stars in heart shape pattern
    const heartStars: StarPoint[] = [
      { id: 0, x: 50, y: 30, connected: false, isTarget: true }, // top center
      { id: 1, x: 35, y: 20, connected: false, isTarget: true }, // top left
      { id: 2, x: 20, y: 35, connected: false, isTarget: true }, // left
      { id: 3, x: 30, y: 60, connected: false, isTarget: true }, // bottom left
      { id: 4, x: 50, y: 80, connected: false, isTarget: true }, // bottom center
      { id: 5, x: 70, y: 60, connected: false, isTarget: true }, // bottom right
      { id: 6, x: 80, y: 35, connected: false, isTarget: true }, // right
      { id: 7, x: 65, y: 20, connected: false, isTarget: true }, // top right
    ]

    // Add some random stars
    for (let i = 8; i < 15; i++) {
      heartStars.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        connected: false,
        isTarget: false,
      })
    }

    setStars(heartStars)
    setConnections([])
    setTargetPattern([
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
      { from: 7, to: 0 },
    ])
    setIsComplete(false)
  }

  const handleStarClick = (starId: number) => {
    if (selectedStar === null) {
      setSelectedStar(starId)
    } else if (selectedStar === starId) {
      setSelectedStar(null)
    } else {
      // Create connection
      const newConnection = { from: selectedStar, to: starId }
      const reverseConnection = { from: starId, to: selectedStar }

      // Check if connection already exists
      const exists = connections.some(
        (conn) =>
          (conn.from === newConnection.from && conn.to === newConnection.to) ||
          (conn.from === newConnection.to && conn.to === newConnection.from),
      )

      if (!exists) {
        const newConnections = [...connections, newConnection]
        setConnections(newConnections)
        setScore(score + 10)

        // Check if pattern is complete
        if (checkPatternComplete(newConnections)) {
          setIsComplete(true)
          setScore(score + 100)
        }
      }

      setSelectedStar(null)
    }
  }

  const checkPatternComplete = (currentConnections: Connection[]) => {
    // Check if all target connections are made
    return targetPattern.every((target) =>
      currentConnections.some(
        (conn) =>
          (conn.from === target.from && conn.to === target.to) || (conn.from === target.to && conn.to === target.from),
      ),
    )
  }

  const nextLevel = () => {
    setLevel(level + 1)
    generateLevel()
  }

  const resetLevel = () => {
    setConnections([])
    setSelectedStar(null)
    setScore(Math.max(0, score - 50))
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl mx-auto bg-gradient-to-b from-indigo-900 to-purple-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Chòm Sao Tình Yêu ✨</h3>
              <p className="text-sm opacity-90">Nối các ngôi sao để tạo thành hình trái tim!</p>
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
        <div className="bg-purple-800/50 p-4 flex justify-between items-center text-white">
          <div className="text-lg font-bold">Điểm: {score}</div>
          <div className="text-lg font-bold">Cấp độ: {level}</div>
          <div className="flex gap-2">
            <Button onClick={resetLevel} variant="outline" size="sm" className="text-white border-white">
              Làm lại
            </Button>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative h-96 bg-gradient-to-b from-indigo-900 to-purple-900 overflow-hidden">
          {/* Stars */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Connections */}
            {connections.map((conn, index) => {
              const fromStar = stars.find((s) => s.id === conn.from)
              const toStar = stars.find((s) => s.id === conn.to)
              if (!fromStar || !toStar) return null

              return (
                <line
                  key={index}
                  x1={`${fromStar.x}%`}
                  y1={`${fromStar.y}%`}
                  x2={`${toStar.x}%`}
                  y2={`${toStar.y}%`}
                  stroke="#ff69b4"
                  strokeWidth="3"
                  className="animate-pulse"
                />
              )
            })}

            {/* Target pattern preview (faint) */}
            {targetPattern.map((conn, index) => {
              const fromStar = stars.find((s) => s.id === conn.from)
              const toStar = stars.find((s) => s.id === conn.to)
              if (!fromStar || !toStar) return null

              const isConnected = connections.some(
                (c) => (c.from === conn.from && c.to === conn.to) || (c.from === conn.to && c.to === conn.from),
              )

              if (isConnected) return null

              return (
                <line
                  key={`target-${index}`}
                  x1={`${fromStar.x}%`}
                  y1={`${fromStar.y}%`}
                  x2={`${toStar.x}%`}
                  y2={`${toStar.y}%`}
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  opacity="0.3"
                />
              )
            })}
          </svg>

          {/* Stars */}
          {stars.map((star) => (
            <button
              key={star.id}
              className={`absolute w-6 h-6 rounded-full transition-all duration-200 ${
                star.isTarget
                  ? selectedStar === star.id
                    ? "bg-pink-400 scale-150 shadow-lg shadow-pink-400/50"
                    : "bg-yellow-300 hover:bg-yellow-200 hover:scale-125"
                  : selectedStar === star.id
                    ? "bg-blue-400 scale-150 shadow-lg shadow-blue-400/50"
                    : "bg-blue-300 hover:bg-blue-200 hover:scale-125"
              } border-2 border-white shadow-lg`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleStarClick(star.id)}
            >
              <Star className="w-full h-full p-1 text-white" />
            </button>
          ))}

          {/* Completion Overlay */}
          {isComplete && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">💖</div>
                <h4 className="text-2xl font-bold text-pink-600 mb-2">Hoàn thành!</h4>
                <p className="text-lg text-gray-700 mb-4">Bạn đã tạo ra chòm sao tình yêu!</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={nextLevel}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  >
                    Cấp độ tiếp theo
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
