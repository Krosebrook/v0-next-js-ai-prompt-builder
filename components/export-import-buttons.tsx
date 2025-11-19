"use client"

import { Download, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import type { Prompt } from "@/lib/types"
import { usePromptExport } from "@/hooks/use-prompt-export"

interface ExportImportButtonsProps {
  prompt?: Prompt
  onImport?: (prompt: Prompt) => void
  variant?: "default" | "ghost" | "outline"
}

export default function ExportImportButtons({ prompt, onImport, variant = "outline" }: ExportImportButtonsProps) {
  const { exportPrompt, importPrompt } = usePromptExport()

  return (
    <div className="flex gap-2">
      {onImport && (
        <Button variant={variant} size="sm" onClick={() => importPrompt(onImport)}>
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
      )}
      {prompt && (
        <Button variant={variant} size="sm" onClick={() => exportPrompt(prompt)}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      )}
    </div>
  )
}
