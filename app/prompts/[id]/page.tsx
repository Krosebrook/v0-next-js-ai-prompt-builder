"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PromptPreview from "@/components/prompt-preview"
import CopyButton from "@/components/copy-button"
import ExportImportButtons from "@/components/export-import-buttons"
import RevisionHistoryDialog from "@/components/revision-history-dialog"
import ExportFormatDialog from "@/components/export-format-dialog"
import type { Prompt } from "@/lib/types"
import { storage } from "@/lib/storage"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Edit, Trash2, Share2, Copy } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { interpolateTemplate, getDefaultValues } from "@/lib/prompt-utils"
import { generateShareableURL } from "@/lib/export-utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function PromptPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [variableValues, setVariableValues] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const loadPrompt = async () => {
      try {
        const loadedPrompt = await storage.getPromptById(params.id)
        if (loadedPrompt) {
          setPrompt(loadedPrompt)
          setVariableValues(getDefaultValues(loadedPrompt.variables))
        } else {
          toast({
            title: "Prompt not found",
            description: "The requested prompt could not be found.",
            variant: "destructive",
          })
          router.push("/")
        }
      } catch (error) {
        toast({
          title: "Error loading prompt",
          description: "There was an error loading the prompt. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPrompt()
  }, [params.id, router])

  const handleVariableValueChange = (name: string, value: any) => {
    setVariableValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const getFilledPrompt = (): string => {
    if (!prompt) return ""
    return interpolateTemplate(prompt.template, variableValues)
  }

  const handleDelete = async () => {
    if (!prompt) return
    
    setIsDeleting(true)
    try {
      await storage.deletePrompt(prompt.id)
      toast({
        title: "Deleted",
        description: "Prompt deleted successfully",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete prompt",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleShare = () => {
    if (!prompt) return
    
    const url = generateShareableURL(prompt)
    navigator.clipboard.writeText(url)
    
    toast({
      title: "Link copied",
      description: "Shareable link copied to clipboard",
    })
  }

  const handleDuplicate = async () => {
    if (!prompt) return
    
    try {
      const duplicated = await storage.duplicatePrompt(prompt.id)
      toast({
        title: "Prompt duplicated",
        description: "A copy has been created",
      })
      router.push(`/prompts/${duplicated.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate prompt",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-muted-foreground">Loading prompt...</div>
        </div>
      </div>
    )
  }

  if (!prompt) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Prompt not found</h2>
          <p className="text-muted-foreground mb-4">The requested prompt could not be found.</p>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-balance">{prompt.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Created {new Date(prompt.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <ExportImportButtons prompt={prompt} />
            <RevisionHistoryDialog 
              promptId={prompt.id} 
              promptName={prompt.name}
              onRestore={() => window.location.reload()}
            />
            <ExportFormatDialog prompt={prompt} />
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
            <Button variant="outline" onClick={() => router.push(`/prompts/${prompt.id}/edit`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" onClick={() => setShowDeleteDialog(true)} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {prompt.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <PromptPreview
              prompt={prompt}
              variableValues={variableValues}
              onVariableValueChange={handleVariableValueChange}
            />
          </Card>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Generated Prompt</h2>
                <CopyButton text={getFilledPrompt()} />
              </div>
              <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm leading-relaxed min-h-[200px]">
                {getFilledPrompt() || <span className="text-muted-foreground italic">Fill in the variables to generate your prompt</span>}
              </div>
            </Card>

            {prompt.variables.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Variable Summary</h3>
                <div className="space-y-2">
                  {prompt.variables.map((variable) => (
                    <div key={variable.id} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{variable.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {variable.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Prompt</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{prompt.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
