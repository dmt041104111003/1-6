"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface Card {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

interface LoveMemoryGameProps {
  onClose: () => void
  onEnergyGain: (energy: number) => void
}

const symbols = ["💕", "💖", "💗", "💘", "💝", "💞", "💟", "❤️"]

export default function LoveMemoryGame({ onClose, onEnergyGain }: LoveMemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const gameSymbols = [...symbols, ...symbols] // Duplicate for pairs
    const shuffled = gameSymbols.sort(() => Math.random() - 0.5)

    const newCards: Card[] = shuffled.map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }))

    setCards(newCards)
    setFlippedCards([])
    setScore(0)
    setMoves(0)
    setGameComplete(false)
  }

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return
    if (flippedCards.includes(cardId)) return
    if (cards[cardId].isMatched) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    // Update card state
    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlippedCards
      const firstCard = cards[firstId]
      const secondCard = cards[secondId]

      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card)),
          )
          setScore(score + 100)
          onEnergyGain(10) // Add energy for each match
          setFlippedCards([])

          // Check if game is complete
          const newMatchedCount = cards.filter((c) => c.isMatched).length + 2
          if (newMatchedCount === cards.length) {
            setGameComplete(true)
            onEnergyGain(50) // Bonus energy for completing game
          }
        }, 1000)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Trí Nhớ Tình Yêu 🧠</h3>
              <p className="text-sm opacity-90">Tìm các cặp trái tim giống nhau!</p>
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
        <div className="bg-purple-50 p-4 flex justify-between items-center">
          <div className="text-lg font-bold text-purple-600">Điểm: {score}</div>
          <div className="text-lg font-bold text-indigo-600">Lượt: {moves}</div>
        </div>

        {/* Game Area */}
        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isMatched || flippedCards.length === 2}
                className={`aspect-square rounded-xl border-2 text-3xl font-bold transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? "bg-white border-purple-300 shadow-lg"
                    : "bg-gradient-to-br from-purple-400 to-indigo-400 border-purple-500 hover:from-purple-300 hover:to-indigo-300"
                }`}
              >
                {card.isFlipped || card.isMatched ? card.symbol : "?"}
              </button>
            ))}
          </div>

          {/* Game Complete Overlay */}
          {gameComplete && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className="text-2xl font-bold text-purple-600 mb-2">Hoàn thành!</h4>
                <p className="text-lg text-gray-700 mb-2">Điểm số: {score}</p>
                <p className="text-md text-gray-600 mb-4">Số lượt: {moves}</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={initializeGame}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
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
