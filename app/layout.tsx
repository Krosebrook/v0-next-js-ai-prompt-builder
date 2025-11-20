import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "sonner"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Prompt Builder - Create & Manage AI Prompts",
  description: "Create and manage reusable AI prompt templates with dynamic variables. Professional prompt engineering made simple.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <main className="min-h-screen bg-background">{children}</main>
            <Toaster />
            <Sonner />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
