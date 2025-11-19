"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, FileJson, FileText, FileCode } from 'lucide-react'
import type { Prompt, ExportFormat } from "@/lib/types"
import { exportPrompt, downloadFile } from "@/lib/export-utils"
import { toast } from "@/components/ui/use-toast"

interface ExportFormatDialogProps {
  prompt: Prompt
}

const formats: { value: ExportFormat; label: string; icon: any; extension: string }[] = [
  { value: "json", label: "JSON", icon: FileJson, extension: "json" },
  { value: "yaml", label: "YAML", icon: FileCode, extension: "yaml" },
  { value: "markdown", label: "Markdown", icon: FileText, extension: "md" },
]

export default function ExportFormatDialog({ prompt }: ExportFormatDialogProps) {
  const [format, setFormat] = useState<ExportFormat>("json")
  const [open, setOpen] = useState(false)

  const handleExport = () => {
    try {
      const content = exportPrompt(prompt, format)
      const sanitizedName = prompt.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
      const extension = formats.find((f) => f.value === format)?.extension || "txt"
      
      downloadFile(content, `${sanitizedName}.${extension}`)
      
      toast({
        title: "Exported successfully",
        description: `Prompt exported as ${format.toUpperCase()}`,
      })
      
      setOpen(false)
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export prompt",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Prompt</DialogTitle>
          <DialogDescription>
            Choose a format to export "{prompt.name}"
          </DialogDescription>
        </DialogHeader>

        <RadioGroup value={format} onValueChange={(v) => setFormat(v as ExportFormat)}>
          <div className="space-y-3">
            {formats.map((fmt) => {
              const Icon = fmt.icon
              return (
                <div key={fmt.value} className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-muted/50" onClick={() => setFormat(fmt.value)}>
                  <RadioGroupItem value={fmt.value} id={fmt.value} />
                  <Label htmlFor={fmt.value} className="flex items-center gap-2 cursor-pointer flex-1">
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{fmt.label}</span>
                    <span className="text-xs text-muted-foreground ml-auto">.{fmt.extension}</span>
                  </Label>
                </div>
              )
            })}
          </div>
        </RadioGroup>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
