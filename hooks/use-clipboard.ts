import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export function useClipboard() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string, message = "Copied to clipboard") => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Success",
        description: message,
      })
      
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  return { copied, copyToClipboard }
}
