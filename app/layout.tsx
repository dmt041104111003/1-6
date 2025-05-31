import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "1/6 - Ngày Đặc Biệt",
  description: "Một kỷ niệm đáng nhớ",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Global background music */}
        <script dangerouslySetInnerHTML={{ 
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const audio = new Audio('/music.mp3');
              audio.loop = true;
              audio.volume = 0.7;
              
              // Try to play immediately
              const playPromise = audio.play();
              if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                  console.error("Autoplay prevented:", error);
                  
                  // Try on user interaction
                  const playAudio = function() {
                    audio.play().catch(function(e) {
                      console.error("Error playing audio:", e);
                    });
                    document.removeEventListener('click', playAudio);
                    document.removeEventListener('touchstart', playAudio);
                  };
                  
                  document.addEventListener('click', playAudio);
                  document.addEventListener('touchstart', playAudio);
                });
              }
            });
          `
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
