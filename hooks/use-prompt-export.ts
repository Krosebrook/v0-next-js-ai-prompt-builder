import { useCallback } from "react"
import type { Prompt } from "@/lib/types"
import { exportPromptToJSON, importPromptFromJSON } from "@/lib/prompt-utils"
import { toast } from "@/components/ui/use-toast"

export function usePromptExport() {
  const exportPrompt = useCallback((prompt: Prompt) => {
    try {
      const json = exportPromptToJSON(prompt)
      const blob = new Blob([json], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${prompt.name.toLowerCase().replace(/\s+/g, "-")}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast({
        title: "Exported",
        description: "Prompt exported successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export prompt",
        variant: "destructive",
      })
    }
  }, [])

  const importPrompt = useCallback(
    (onImport: (prompt: Prompt) => void) => {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "application/json"
      
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) return
        
        try {
          const text = await file.text()
          const prompt = importPromptFromJSON(text)
          onImport(prompt)
          
          toast({
            title: "Imported",
            description: "Prompt imported successfully",
          })
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to import prompt. Invalid file format.",
            variant: "destructive",
          })
        }
      }
      
      input.click()
    },
    []
  )

  return { exportPrompt, importPrompt }
}
