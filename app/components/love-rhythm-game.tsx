"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { X, Play } from "lucide-react"

interface Note {
  id: number
  lane: number
  y: number
  hit: boolean
}

interface LoveRhythmGameProps {
  onClose: () => void
  onEnergyGain: (amount: number) => void
}

export default function LoveRhythmGame({ onClose, onEnergyGain }: LoveRhythmGameProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [gameTime, setGameTime] = useState(30)

  const lanes = [0, 1, 2, 3] // 4 lanes
  const laneKeys = ["A", "S", "D", "F"]
  const noteEmojis = ["💕", "💖", "💗", "💘"]

  const createNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now() + Math.random(),
      lane: Math.floor(Math.random() * 4),
      y: -10,
      hit: false,
    }
    setNotes((prev) => [...prev, newNote])
  }, [])

  useEffect(() => {
    if (!gameActive) return

    const noteInterval = setInterval(createNote, 800)
    const gameTimer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(noteInterval)
      clearInterval(gameTimer)
    }
  }, [gameActive, createNote])

  useEffect(() => {
    if (!gameActive) return

    const animationInterval = setInterval(() => {
      setNotes((prevNotes) =>
        prevNotes
          .map((note) => ({
            ...note,
            y: note.y + 2,
          }))
          .filter((note) => note.y < 110 && !note.hit),
      )
    }, 16)

    return () => clearInterval(animationInterval)
  }, [gameActive])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameActive) return

      const keyIndex = laneKeys.indexOf(e.key.toUpperCase())
      if (keyIndex !== -1) {
        hitNote(keyIndex)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameActive, notes])

  const hitNote = (lane: number) => {
    const targetNotes = notes.filter((note) => note.lane === lane && !note.hit && note.y > 70 && note.y < 90)

    if (targetNotes.length > 0) {
      const closestNote = targetNotes.reduce((closest, note) =>
        Math.abs(note.y - 80) < Math.abs(closest.y - 80) ? note : closest,
      )

      setNotes((prev) => prev.map((note) => (note.id === closestNote.id ? { ...note, hit: true } : note)))

      const distance = Math.abs(closestNote.y - 80)
      let points = 0
      if (distance < 5) {
        points = 100 // Perfect
      } else if (distance < 10) {
        points = 50 // Good
      } else {
        points = 25 // OK
      }

      setScore((prev) => prev + points)
      setCombo((prev) => prev + 1)
      onEnergyGain(3) // Reduced from 5 to 3 for 300 max energy
    } else {
      setCombo(0) // Reset combo on miss
    }
  }

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setCombo(0)
    setGameTime(30)
    setNotes([])
  }

  const pauseGame = () => {
    setGameActive(false)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-rose-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Nhịp Điệu Tình Yêu 🎵</h3>
              <p className="text-sm opacity-90">Nhấn A, S, D, F khi nốt nhạc đến vạch!</p>
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
        <div className="bg-red-50 p-4 flex justify-between items-center">
          <div className="text-lg font-bold text-red-600">Điểm: {score}</div>
          <div className="text-lg font-bold text-rose-600">Combo: {combo}</div>
          <div className="text-lg font-bold text-purple-600">Thời gian: {gameTime}s</div>
        </div>

        {/* Game Area */}
        <div className="relative h-96 bg-gradient-to-b from-purple-900 to-red-900 overflow-hidden">
          {/* Lanes */}
          {lanes.map((lane) => (
            <div
              key={lane}
              className="absolute w-1/4 h-full border-r border-white/20"
              style={{ left: `${lane * 25}%` }}
            >
              {/* Hit line */}
              <div className="absolute bottom-16 w-full h-1 bg-yellow-400 shadow-lg"></div>

              {/* Key indicator */}
              <div className="absolute bottom-4 w-full text-center">
                <div className="inline-block bg-white/20 rounded-lg px-3 py-2 text-white font-bold">
                  {laneKeys[lane]}
                </div>
              </div>
            </div>
          ))}

          {/* Notes */}
          {notes.map((note) => (
            <div
              key={note.id}
              className={`absolute w-12 h-12 text-3xl flex items-center justify-center transition-all duration-100 ${
                note.hit ? "scale-150 opacity-50" : ""
              }`}
              style={{
                left: `${note.lane * 25 + 12.5}%`,
                top: `${note.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {noteEmojis[note.lane]}
            </div>
          ))}

          {/* Game Controls */}
          {!gameActive && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 text-center">
                {gameTime === 0 ? (
                  <>
                    <div className="text-6xl mb-4">🎉</div>
                    <h4 className="text-2xl font-bold text-red-600 mb-2">Kết thúc!</h4>
                    <p className="text-lg text-gray-700 mb-4">Điểm số: {score}</p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🎵</div>
                    <h4 className="text-2xl font-bold text-red-600 mb-2">Nhịp Điệu Tình Yêu</h4>
                    <p className="text-gray-700 mb-4">Sẵn sàng chơi nhạc tình yêu?</p>
                  </>
                )}
                <Button
                  onClick={startGame}
                  className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600"
                >
                  <Play className="mr-2 h-5 w-5" />
                  {gameTime === 0 ? "Chơi lại" : "Bắt đầu"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
