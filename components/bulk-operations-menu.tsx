"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Download, Upload } from 'lucide-react'
import { storage } from "@/lib/storage"
import { exportPromptsAsZip, downloadFile } from "@/lib/export-utils"
import { validateImportedPrompt } from "@/lib/validation"
import { toast } from "@/components/ui/use-toast"

interface BulkOperationsMenuProps {
  onRefresh?: () => void
}

export default function BulkOperationsMenu({ onRefresh }: BulkOperationsMenuProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleBulkExport = async () => {
    setIsExporting(true)
    try {
      const prompts = await storage.bulkExport()
      const zipBlob = await exportPromptsAsZip(prompts)
      downloadFile(zipBlob, `prompts-backup-${Date.now()}.zip`, "application/zip")
      
      toast({
        title: "Export successful",
        description: `Exported ${prompts.length} prompts`,
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export prompts",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleBulkImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.multiple = true
    
    input.onchange = async (e: any) => {
      const files = e.target.files
      if (!files || files.length === 0) return

      try {
        const prompts: any[] = []
        const errors: string[] = []
        
        for (const file of files) {
          const text = await file.text()
          const data = JSON.parse(text)
          
          const validated = validateImportedPrompt(data)
          if (validated) {
            prompts.push(validated)
          } else {
            errors.push(`Invalid prompt in ${file.name}`)
          }
        }

        if (prompts.length > 0) {
          await storage.bulkImport(prompts)
          
          toast({
            title: "Import successful",
            description: `Imported ${prompts.length} prompts${errors.length > 0 ? `, ${errors.length} failed` : ''}`,
          })
          
          onRefresh?.()
        } else {
          toast({
            title: "Import failed",
            description: "No valid prompts found in selected files",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Failed to import prompts. Please check file format.",
          variant: "destructive",
        })
      }
    }
    
    input.click()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Bulk Operations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleBulkExport} disabled={isExporting}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export All (ZIP)"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleBulkImport}>
          <Upload className="mr-2 h-4 w-4" />
          Import Multiple
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
