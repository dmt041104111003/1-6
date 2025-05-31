"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  { id: 1, src: "/images/memory1.png", alt: "Kỷ niệm 1", title: "Kỷ niệm đầu tiên" },
  { id: 2, src: "/images/memory2.png", alt: "Kỷ niệm 2", title: "Những ngày đầu bên nhau" },
  { id: 3, src: "/images/memory3.png", alt: "Kỷ niệm 3", title: "Chuyến đi đáng nhớ" },
  { id: 4, src: "/images/memory4.png", alt: "Kỷ niệm 4", title: "Khoảnh khắc hạnh phúc" },
  { id: 5, src: "/images/memory5.png", alt: "Kỷ niệm 5", title: "Tình yêu vĩnh cửu" },
]

interface FlyingImagesProps {
  onImageClick: (index: number) => void
}

export default function FlyingImages({ onImageClick }: FlyingImagesProps) {
  const [visibleImages, setVisibleImages] = useState<number[]>([])
  const [imagesPositioned, setImagesPositioned] = useState(false)

  useEffect(() => {
    // Show images one by one with delay
    images.forEach((_, index) => {
      setTimeout(() => {
        setVisibleImages((prev) => [...prev, index])
      }, index * 500)
    })

    // After all images are visible, position them horizontally
    setTimeout(
      () => {
        setImagesPositioned(true)
      },
      images.length * 500 + 1000,
    )
  }, [])

  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      {/* Container for horizontal layout */}
      <div className="flex gap-4 justify-center items-center flex-wrap max-w-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`transition-all duration-1000 ease-out cursor-pointer ${
              visibleImages.includes(index) ? "opacity-100" : "opacity-0"
            } ${
              imagesPositioned
                ? "relative transform-none" // Final position
                : "absolute top-full left-1/2 transform -translate-x-1/2" // Start position
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
            onClick={() => onImageClick(index)}
          >
            <div className="relative group">
              {/* Image container */}
              <div className="w-20 h-20 md:w-24 md:h-24 relative overflow-hidden rounded-xl shadow-lg border-3 border-white/70 backdrop-blur-sm bg-white/20 hover:scale-110 transition-transform duration-300">
                <Image
                  src={image.src || "/placeholder.svg?height=96&width=96"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-xs font-bold text-center px-1">{image.title}</div>
                </div>

                {/* Click indicator */}
                <div className="absolute inset-0 border-2 border-pink-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>

              {/* Floating hearts around images */}
              <div className="absolute -top-1 -right-1 text-red-400 text-sm animate-bounce">💕</div>
              <div className="absolute -bottom-1 -left-1 text-pink-400 text-sm animate-bounce delay-500">💖</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
