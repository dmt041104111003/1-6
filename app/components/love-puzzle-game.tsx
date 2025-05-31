"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, RotateCw } from "lucide-react"

interface PuzzlePiece {
  id: number
  currentPosition: number
  correctPosition: number
  image: string
}

interface LovePuzzleGameProps {
  onClose: () => void
  onEnergyGain: (amount: number) => void
}

export default function LovePuzzleGame({ onClose, onEnergyGain }: LovePuzzleGameProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const puzzleImages = ["💕", "💖", "💗", "💘", "💝", "💞", "💟", "❤️", "🧡"]

  useEffect(() => {
    initializePuzzle()
  }, [])

  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = puzzleImages.map((image, index) => ({
      id: index,
      currentPosition: index,
      correctPosition: index,
      image,
    }))

    // Shuffle pieces
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = newPieces[i].currentPosition
      newPieces[i].currentPosition = newPieces[j].currentPosition
      newPieces[j].currentPosition = temp
    }

    setPieces(newPieces)
    setSelectedPiece(null)
    setScore(0)
    setMoves(0)
    setGameComplete(false)
  }

  const handlePieceClick = (pieceId: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(pieceId)
    } else if (selectedPiece === pieceId) {
      setSelectedPiece(null)
    } else {
      // Swap pieces
      setPieces((prev) => {
        const newPieces = [...prev]
        const piece1 = newPieces.find((p) => p.id === selectedPiece)!
        const piece2 = newPieces.find((p) => p.id === pieceId)!

        const tempPosition = piece1.currentPosition
        piece1.currentPosition = piece2.currentPosition
        piece2.currentPosition = tempPosition

        return newPieces
      })

      setMoves(moves + 1)
      setSelectedPiece(null)

      // Check if puzzle is complete
      setTimeout(() => {
        checkCompletion()
      }, 100)
    }
  }

  const checkCompletion = () => {
    const isComplete = pieces.every((piece) => piece.currentPosition === piece.correctPosition)
    if (isComplete && !gameComplete) {
      setGameComplete(true)
      const finalScore = Math.max(1000 - moves * 10, 100)
      setScore(finalScore)
      onEnergyGain(30) // Reduced from 50 to 30 for 300 max energy
    }
  }

  const getPieceAtPosition = (position: number) => {
    return pieces.find((piece) => piece.currentPosition === position)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Ghép Hình Tình Yêu 🧩</h3>
              <p className="text-sm opacity-90">Sắp xếp các mảnh ghép theo thứ tự đúng!</p>
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
        <div className="bg-pink-50 p-4 flex justify-between items-center">
          <div className="text-lg font-bold text-pink-600">Điểm: {score}</div>
          <div className="text-lg font-bold text-rose-600">Nước: {moves}</div>
          <Button onClick={initializePuzzle} variant="outline" size="sm" className="flex items-center gap-2">
            <RotateCw className="h-4 w-4" />
            Trộn lại
          </Button>
        </div>

        {/* Puzzle Grid */}
        <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {Array.from({ length: 9 }, (_, index) => {
              const piece = getPieceAtPosition(index)
              return (
                <button
                  key={index}
                  onClick={() => piece && handlePieceClick(piece.id)}
                  className={`aspect-square rounded-xl border-2 text-4xl font-bold transition-all duration-200 ${
                    piece
                      ? selectedPiece === piece.id
                        ? "bg-yellow-200 border-yellow-400 scale-105 shadow-lg"
                        : piece.currentPosition === piece.correctPosition
                          ? "bg-green-100 border-green-300"
                          : "bg-white border-pink-300 hover:bg-pink-50 hover:scale-105"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  {piece?.image}
                </button>
              )
            })}
          </div>

          {/* Reference Pattern */}
          <div className="mt-6">
            <h4 className="text-center text-sm font-bold text-gray-600 mb-2">Mẫu tham khảo:</h4>
            <div className="grid grid-cols-3 gap-1 max-w-32 mx-auto">
              {puzzleImages.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded text-lg flex items-center justify-center">
                  {image}
                </div>
              ))}
            </div>
          </div>

          {/* Game Complete Overlay */}
          {gameComplete && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className="text-2xl font-bold text-pink-600 mb-2">Hoàn thành!</h4>
                <p className="text-lg text-gray-700 mb-2">Điểm số: {score}</p>
                <p className="text-md text-gray-600 mb-4">Số nước: {moves}</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={initializePuzzle}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                  >
                    Chơi lại
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
