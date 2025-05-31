"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const images = [
  {
    id: 1,
    src: "/images/memory1.png",
    alt: "Kỷ niệm 1",
    title: "Kỷ niệm đầu tiên",
    description: "Ngày đầu tiên chúng ta gặp nhau, một khoảnh khắc đáng nhớ mãi mãi.",
  },
  {
    id: 2,
    src: "/images/memory2.png",
    alt: "Kỷ niệm 2",
    title: "Những ngày đầu bên nhau",
    description: "Những buổi hẹn hò đầu tiên, ngọt ngào và đầy ắp tiếng cười.",
  },
  {
    id: 3,
    src: "/images/memory3.png",
    alt: "Kỷ niệm 3",
    title: "Chuyến đi đáng nhớ",
    description: "Chuyến du lịch đầu tiên cùng nhau, tạo nên biết bao kỷ niệm đẹp.",
  },
  {
    id: 4,
    src: "/images/memory4.png",
    alt: "Kỷ niệm 4",
    title: "Khoảnh khắc hạnh phúc",
    description: "Những giây phút bình yên bên nhau, đơn giản nhưng đầy ý nghĩa.",
  },
  {
    id: 5,
    src: "/images/memory5.png",
    alt: "Kỷ niệm 5",
    title: "Tình yêu vĩnh cửu",
    description: "Lời hứa sẽ mãi bên nhau, dù có khó khăn gì đi chăng nữa.",
  },
]

interface ImageSlideshowProps {
  initialIndex: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

export default function ImageSlideshow({ initialIndex, onClose, onIndexChange }: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    onIndexChange(currentIndex)
  }, [currentIndex, onIndexChange])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
      setIsTransitioning(false)
    }, 150)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      setIsTransitioning(false)
    }, 150)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 150)
  }

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Close button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 border-white/30 text-white z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Main image container */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Image */}
          <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
            <Image
              src={currentImage.src || "/placeholder.svg?height=500&width=800"}
              alt={currentImage.alt}
              fill
              className={`object-cover transition-all duration-300 ${
                isTransitioning ? "scale-105 opacity-50" : "scale-100 opacity-100"
              }`}
            />

            {/* Navigation arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Image info */}
          <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentImage.title}</h3>
            <p className="text-gray-600 leading-relaxed">{currentImage.description}</p>
          </div>

          {/* Thumbnail navigation */}
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex gap-2 justify-center overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                    index === currentIndex ? "border-pink-400 scale-110" : "border-gray-300 hover:border-pink-300"
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <Image
                    src={image.src || "/placeholder.svg?height=64&width=64"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  {index === currentIndex && <div className="absolute inset-0 bg-pink-400/20"></div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
