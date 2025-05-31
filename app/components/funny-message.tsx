"use client"

import { useEffect, useState } from "react"

interface FunnyMessageProps {
  message: string
}

export default function FunnyMessage({ message }: FunnyMessageProps) {
  const [visible, setVisible] = useState(true)
  const [animation, setAnimation] = useState("animate-slide-in-right")

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation("animate-slide-out-left")
      setTimeout(() => setVisible(false), 500)
    }, 4500)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className={`p-3 rounded-lg bg-yellow-100 border-2 border-yellow-300 text-yellow-800 font-medium ${animation} overflow-hidden`}
    >
      {message}
    </div>
  )
}
