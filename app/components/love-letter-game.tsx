"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface LoveLetterGameProps {
  onClose: () => void
}

const wordBank = [
  "yêu",
  "thương",
  "em",
  "anh",
  "mãi mãi",
  "hạnh phúc",
  "tình yêu",
  "trái tim",
  "ngọt ngào",
  "đẹp",
  "dễ thương",
  "tuyệt vời",
  "hoàn hảo",
  "bên nhau",
  "cùng nhau",
  "mơ ước",
  "hy vọng",
  "tin tưởng",
  "chân thành",
  "chăm sóc",
]

const templates = [
  { text: "Anh ___ em rất nhiều!", answer: "yêu" },
  { text: "Em là người ___ nhất!", answer: "đẹp" },
  { text: "Chúng ta sẽ ___ bên nhau!", answer: "mãi mãi" },
  { text: "Trái tim anh chỉ ___ em!", answer: "yêu" },
  { text: "Em làm anh cảm thấy ___!", answer: "hạnh phúc" },
]

export default function LoveLetterGame({ onClose }: LoveLetterGameProps) {
  const [currentTemplate, setCurrentTemplate] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [completedSentences, setCompletedSentences] = useState<string[]>([])
  const [gameComplete, setGameComplete] = useState(false)

  const handleWordClick = (word: string) => {
    const template = templates[currentTemplate]

    if (word === template.answer) {
      // Correct word
      const completedSentence = template.text.replace("___", word)
      setCompletedSentences((prev) => [...prev, completedSentence])
      setScore(score + 50)

      if (currentTemplate < templates.length - 1) {
        setCurrentTemplate(currentTemplate + 1)
      } else {
        setGameComplete(true)
      }
    } else {
      // Wrong word - small penalty
      setScore(Math.max(0, score - 10))
    }
  }

  const resetGame = () => {
    setCurrentTemplate(0)
    setSelectedWords([])
    setScore(0)
    setCompletedSentences([])
    setGameComplete(false)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Thư Tình 💌</h3>
              <p className="text-sm opacity-90">Chọn từ đúng để hoàn thành câu tình yêu!</p>
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
          <div className="text-lg font-bold text-red-600">
            Câu: {currentTemplate + 1}/{templates.length}
          </div>
        </div>

        <div className="p-6">
          {!gameComplete ? (
            <>
              {/* Current Template */}
              <div className="mb-6 p-4 bg-gradient-to-r from-pink-100 to-red-100 rounded-xl">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Hoàn thành câu:</h4>
                <p className="text-lg text-gray-700 font-medium">{templates[currentTemplate].text}</p>
              </div>

              {/* Word Bank */}
              <div className="mb-6">
                <h5 className="text-lg font-bold text-gray-800 mb-3">Chọn từ phù hợp:</h5>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {wordBank.map((word, index) => (
                    <Button
                      key={index}
                      onClick={() => handleWordClick(word)}
                      variant="outline"
                      className="p-2 text-sm hover:bg-pink-100 hover:border-pink-300"
                    >
                      {word}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Completed Sentences */}
              {completedSentences.length > 0 && (
                <div className="bg-green-50 rounded-xl p-4">
                  <h5 className="text-lg font-bold text-green-700 mb-2">Câu đã hoàn thành:</h5>
                  {completedSentences.map((sentence, index) => (
                    <p key={index} className="text-green-600 mb-1">
                      ✓ {sentence}
                    </p>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Game Complete */
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💕</div>
              <h4 className="text-2xl font-bold text-pink-600 mb-4">Thư tình hoàn thành!</h4>
              <div className="bg-pink-50 rounded-xl p-4 mb-6">
                <h5 className="text-lg font-bold text-pink-700 mb-3">Bức thư của bạn:</h5>
                {completedSentences.map((sentence, index) => (
                  <p key={index} className="text-pink-600 mb-2 text-lg">
                    {sentence}
                  </p>
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-6">Điểm số: {score}</p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  Viết thư mới
                </Button>
                <Button onClick={onClose} variant="outline">
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
