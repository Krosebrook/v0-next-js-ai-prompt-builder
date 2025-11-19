"use client"

import { Check, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useClipboard } from "@/hooks/use-clipboard"

interface CopyButtonProps {
  text: string
  label?: string
  variant?: "default" | "ghost" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function CopyButton({ text, label = "Copy", variant = "outline", size = "sm" }: CopyButtonProps) {
  const { copied, copyToClipboard } = useClipboard()

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => copyToClipboard(text, "Prompt copied to clipboard")}
      disabled={!text}
    >
      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
      {copied ? "Copied" : label}
    </Button>
  )
}
