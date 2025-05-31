"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Gift, GamepadIcon, Music } from "lucide-react"
import GiftBox from "./components/gift-box"
import HeartFireworks from "./components/heart-fireworks"
import FloatingHearts from "./components/floating-hearts"
import RomanticBackground from "./components/romantic-background"
import TypewriterMessage from "./components/typewriter-message"
import HeartCatchingGame from "./components/heart-catching-game"
import LoveMemoryGame from "./components/love-memory-game"
import LovePuzzleGame from "./components/love-puzzle-game"
import LoveRhythmGame from "./components/love-rhythm-game"
import GameInstructions from "./components/game-instructions"
import EnergyBar from "./components/energy-bar"
import FinalMessage from "./components/final-message"

export default function January6Page() {
  const [giftOpened, setGiftOpened] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [showMessage, setShowMessage] = useState(false)
  const [showGames, setShowGames] = useState(false)
  const [showInstructions, setShowInstructions] = useState<string | null>(null)
  const [energy, setEnergy] = useState(0)
  const [showFinalMessage, setShowFinalMessage] = useState(false)

  useEffect(() => {
    // Trigger page load animation
    const timer = setTimeout(() => {
      setPageLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Check if energy reaches 300 (changed from 1000)
    if (energy >= 300 && !showFinalMessage) {
      setShowFinalMessage(true)
    }
  }, [energy, showFinalMessage])

  const handleGiftClick = () => {
    if (giftOpened) return

    setGiftOpened(true)
    setShowMessage(true)

    // Start fireworks
    setTimeout(() => {
      setShowFireworks(true)
    }, 2000)

    // Play romantic music
    const audio = new Audio("/sounds/romantic.mp3")
    audio.play().catch((e) => console.error("Error playing sound:", e))
  }

  const handleMessageComplete = () => {
    setShowMessage(false)
    // Show games after message disappears
    setTimeout(() => {
      setShowGames(true)
    }, 1000)
  }

  const handlePlayNow = () => {
    setShowMessage(false)
    setShowGames(true)
  }

  const resetExperience = () => {
    setGiftOpened(false)
    setShowFireworks(false)
    setShowMessage(false)
    setShowGames(false)
    setCurrentGame(null)
    setShowInstructions(null)
    setEnergy(0)
    setShowFinalMessage(false)
  }

  const startGame = (gameType: string) => {
    setShowInstructions(gameType)
  }

  const confirmStartGame = () => {
    setCurrentGame(showInstructions)
    setShowInstructions(null)
  }

  const closeGame = () => {
    setCurrentGame(null)
  }

  const closeInstructions = () => {
    setShowInstructions(null)
  }

  const addEnergy = (amount: number) => {
    setEnergy((prev) => Math.min(prev + amount, 300)) // Changed max from 1000 to 300
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <RomanticBackground />
      <FloatingHearts />

      {showFireworks && <HeartFireworks />}

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header - Reduced size when message is showing */}
        <div
          className={`text-center transition-all duration-1000 ${
            pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          } ${showMessage ? "py-4" : "py-8"}`}
        >
          <h1
            className={`font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-red-500 bg-clip-text text-transparent mb-2 transition-all duration-500 ${
              showMessage ? "text-2xl md:text-3xl" : "text-4xl md:text-6xl"
            }`}
          >
            1/6
          </h1>
          {!showMessage && (
            <>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-1 flex items-center justify-center">
                <Heart className="mr-2 h-6 w-6 text-red-400" />
                Ngày Đặc Biệt
                <Heart className="ml-2 h-6 w-6 text-red-400" />
              </h2>
              <p className="text-base text-pink-200 flex items-center justify-center">
                <Sparkles className="mr-2 h-4 w-4" />
                Một kỷ niệm đáng nhớ
                <Sparkles className="ml-2 h-4 w-4" />
              </p>
            </>
          )}
        </div>

        {/* Energy Bar - Moved further down */}
        {(showGames || currentGame) && !showMessage && <EnergyBar energy={energy} />}

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col items-center justify-center px-4 transition-all duration-500 ${
            (showGames || currentGame) && !showMessage ? "mt-56" : ""
          }`}
        >
          {/* Gift Box */}
          {!giftOpened && (
            <div
              className={`transition-all duration-1000 delay-500 ${
                pageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            >
              <GiftBox onClick={handleGiftClick} />
              <p className="text-center mt-6 text-white text-lg font-medium animate-pulse">
                <Gift className="inline mr-2 h-5 w-5" />
                Nhấn vào hộp quà để mở!
              </p>
            </div>
          )}

          {/* Games Menu */}
          {showGames && !currentGame && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in-up">
              <Button
                onClick={() => startGame("heart-catch")}
                className="h-24 bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200"
              >
                <Heart className="h-8 w-8" />
                <span className="text-sm font-bold">Bắt Trái Tim</span>
              </Button>

              <Button
                onClick={() => startGame("love-memory")}
                className="h-24 bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200"
              >
                <Sparkles className="h-8 w-8" />
                <span className="text-sm font-bold">Trí Nhớ Tình Yêu</span>
              </Button>

              <Button
                onClick={() => startGame("love-puzzle")}
                className="h-24 bg-gradient-to-br from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200"
              >
                <GamepadIcon className="h-8 w-8" />
                <span className="text-sm font-bold">Ghép Hình Tình Yêu</span>
              </Button>

              <Button
                onClick={() => startGame("love-rhythm")}
                className="h-24 bg-gradient-to-br from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200"
              >
                <Music className="h-8 w-8" />
                <span className="text-sm font-bold">Nhịp Điệu Tình Yêu</span>
              </Button>
            </div>
          )}
        </div>

        {/* Reset Button */}
        {giftOpened && (
          <div className="fixed top-4 right-4 z-20">
            <Button
              onClick={resetExperience}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full p-3 shadow-lg transform hover:scale-110 transition-all duration-200"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Typewriter Message */}
      {showMessage && (
        <TypewriterMessage
          message="Chúc em bé của anh 1/6 thật hạnh phúc! Mãi là em bé của anh nhé! Anh yêu em rất nhiều! 💕"
          onComplete={handleMessageComplete}
          onPlayNow={handlePlayNow}
        />
      )}

      {/* Game Instructions */}
      {showInstructions && (
        <GameInstructions gameType={showInstructions} onStart={confirmStartGame} onClose={closeInstructions} />
      )}

      {/* Game Modals */}
      {currentGame === "heart-catch" && <HeartCatchingGame onClose={closeGame} onEnergyGain={addEnergy} />}
      {currentGame === "love-memory" && <LoveMemoryGame onClose={closeGame} onEnergyGain={addEnergy} />}
      {currentGame === "love-puzzle" && <LovePuzzleGame onClose={closeGame} onEnergyGain={addEnergy} />}
      {currentGame === "love-rhythm" && <LoveRhythmGame onClose={closeGame} onEnergyGain={addEnergy} />}

      {/* Final Message */}
      {showFinalMessage && <FinalMessage onClose={() => setShowFinalMessage(false)} />}
    </main>
  )
}
