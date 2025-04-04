import type React from "react"
import { TranslationProvider } from "@/hooks/use-translation"
import { AuthProvider } from "@/hooks/use-auth"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TranslationProvider>{children}</TranslationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
