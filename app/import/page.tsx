"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { storage } from "@/lib/storage"
import { parseShareableURL } from "@/lib/export-utils"
import { toast } from "@/components/ui/use-toast"
import { Download, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { Prompt } from "@/lib/types"

export default function ImportPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isImporting, setIsImporting] = useState(false)

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) {
      setError("No import data found in URL")
      return
    }

    const parsed = parseShareableURL(hash)
    if (!parsed) {
      setError("Invalid or corrupted share link")
      return
    }

    setPrompt(parsed)
  }, [])

  const handleImport = async () => {
    if (!prompt) return

    setIsImporting(true)
    try {
      await storage.savePrompt(prompt)
      toast({
        title: "Import successful",
        description: `"${prompt.name}" has been added to your library`,
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to import the prompt",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
    }
  }

  if (error) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Import Failed</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </Card>
      </div>
    )
  }

  if (!prompt) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <div className="animate-pulse mb-4">Loading...</div>
          <p className="text-muted-foreground">Parsing import data</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-6">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Import Prompt</h1>
          <p className="text-muted-foreground">
            Review the prompt details before importing
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">{prompt.name}</h2>
            {prompt.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {prompt.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Template</h3>
            <div className="bg-muted p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">
              {prompt.template}
            </div>
          </div>

          {prompt.variables.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">
                Variables ({prompt.variables.length})
              </h3>
              <div className="space-y-2">
                {prompt.variables.map((variable) => (
                  <div
                    key={variable.id}
                    className="flex justify-between items-center bg-muted/50 p-3 rounded"
                  >
                    <span className="font-medium">{variable.name}</span>
                    <Badge variant="outline">{variable.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleImport}
            disabled={isImporting}
          >
            <Download className="mr-2 h-4 w-4" />
            {isImporting ? "Importing..." : "Import Prompt"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
