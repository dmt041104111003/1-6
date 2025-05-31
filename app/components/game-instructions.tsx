"use client"

import { Button } from "@/components/ui/button"
import { X, Play } from "lucide-react"

interface GameInstructionsProps {
  gameType: string
  onStart: () => void
  onClose: () => void
}

const gameInstructions = {
  "heart-catch": {
    title: "Bắt Trái Tim 💕",
    instructions: [
      "Di chuyển chuột để điều khiển giỏ",
      "Bắt các trái tim rơi xuống để ghi điểm:",
      "• Trái tim lớn: 30 điểm",
      "• Trái tim vừa: 20 điểm",
      "• Trái tim nhỏ: 10 điểm",
      "⚠️ Tránh quả bom! Sẽ bị trừ 10-50 điểm",
      "Thời gian: 30 giây",
      "🔋 Mỗi trái tim bắt được +5 năng lượng",
    ],
  },
  "love-memory": {
    title: "Trí Nhớ Tình Yêu 🧠",
    instructions: [
      "Lật các thẻ để tìm cặp giống nhau",
      "Nhớ vị trí các thẻ đã lật",
      "Ghép đúng cặp để ghi điểm",
      "Hoàn thành tất cả cặp để thắng",
      "Càng ít lượt lật càng điểm cao!",
      "🔋 Mỗi cặp đúng +10 năng lượng",
    ],
  },
  "love-puzzle": {
    title: "Ghép Hình Tình Yêu 🧩",
    instructions: [
      "Nhấn vào 2 mảnh để hoán đổi vị trí",
      "Sắp xếp theo thứ tự đúng như mẫu",
      "Mảnh đúng vị trí sẽ có viền xanh",
      "Hoàn thành puzzle để ghi điểm cao",
      "Càng ít nước đi càng nhiều điểm!",
      "🔋 Hoàn thành puzzle +30 năng lượng",
    ],
  },
  "love-rhythm": {
    title: "Nhịp Điệu Tình Yêu 🎵",
    instructions: [
      "Nhấn phím A, S, D, F khi nốt nhạc đến vạch vàng",
      "Nhấn đúng thời điểm để ghi điểm:",
      "• Perfect (vàng): 100 điểm",
      "• Good (xanh): 50 điểm",
      "• OK (xám): 25 điểm",
      "Giữ combo để nhân điểm!",
      "🔋 Mỗi nốt đúng +3 năng lượng",
    ],
  },
}

export default function GameInstructions({ gameType, onStart, onClose }: GameInstructionsProps) {
  const game = gameInstructions[gameType as keyof typeof gameInstructions]

  if (!game) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">{game.title}</h3>
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

        {/* Instructions */}
        <div className="p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Hướng dẫn chơi:</h4>
          <ul className="space-y-2 mb-6">
            {game.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700 leading-relaxed">
                {instruction}
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            <Button
              onClick={onStart}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              <Play className="mr-2 h-5 w-5" />
              Bắt đầu chơi
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Hủy
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
