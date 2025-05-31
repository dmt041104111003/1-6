"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const questions = [
  {
    question: "Điều gì làm cho tình yêu của chúng ta đặc biệt?",
    options: ["Sự hiểu biết", "Niềm tin tưởng", "Cả hai", "Tình cảm chân thành"],
    correct: 2,
  },
  {
    question: "Khi nào chúng ta cảm thấy hạnh phúc nhất?",
    options: ["Khi ở bên nhau", "Khi chia sẻ", "Khi cười cùng nhau", "Tất cả đều đúng"],
    correct: 3,
  },
  {
    question: "Tương lai của chúng ta sẽ như thế nào?",
    options: ["Tràn đầy yêu thương", "Luôn bên nhau", "Hạnh phúc mãi mãi", "Tất cả đều đúng"],
    correct: 3,
  },
]

interface LoveQuizProps {
  onClose: () => void
}

export default function LoveQuiz({ onClose }: LoveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    if (answered) return

    setSelectedAnswer(answerIndex)
    setAnswered(true)

    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setAnswered(false)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnswered(false)
  }

  const getResultMessage = () => {
    if (score === questions.length) {
      return "Hoàn hảo! Tình yêu của chúng ta thật tuyệt vời! 💕"
    } else if (score >= questions.length / 2) {
      return "Tuyệt vời! Chúng ta hiểu nhau rất tốt! ❤️"
    } else {
      return "Chúng ta cần tìm hiểu nhau nhiều hơn nữa! 💖"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Câu Hỏi Tình Yêu 💜</h3>
              <p className="text-sm opacity-90">Khám phá tình yêu của chúng ta!</p>
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

        <div className="p-6">
          {!showResult ? (
            <>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>
                    Câu hỏi {currentQuestion + 1}/{questions.length}
                  </span>
                  <span>Điểm: {score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4">{questions[currentQuestion].question}</h4>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={answered}
                      className={`w-full p-4 text-left justify-start h-auto ${
                        answered
                          ? index === questions[currentQuestion].correct
                            ? "bg-green-500 hover:bg-green-500 text-white"
                            : index === selectedAnswer
                              ? "bg-red-500 hover:bg-red-500 text-white"
                              : "bg-gray-200 hover:bg-gray-200 text-gray-600"
                          : "bg-gray-100 hover:bg-purple-100 text-gray-800"
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Results */
            <div className="text-center py-8">
              <div className="text-6xl mb-4">
                {score === questions.length ? "🏆" : score >= questions.length / 2 ? "💕" : "💖"}
              </div>
              <h4 className="text-2xl font-bold text-purple-600 mb-4">Kết quả</h4>
              <p className="text-lg text-gray-700 mb-2">
                Bạn trả lời đúng {score}/{questions.length} câu hỏi
              </p>
              <p className="text-lg text-purple-600 font-medium mb-6">{getResultMessage()}</p>
              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 mr-4"
              >
                Chơi lại
              </Button>
              <Button onClick={onClose} variant="outline">
                Đóng
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
