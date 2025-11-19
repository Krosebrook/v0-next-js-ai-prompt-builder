"use client"

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreVertical, Trash2, Download, Eye, Star, Copy, Sparkles } from 'lucide-react'
import type { Prompt } from "@/lib/types"
import { storage } from "@/lib/storage"
import { toast } from "@/components/ui/use-toast"
import { usePromptExport } from "@/hooks/use-prompt-export"
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
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PromptCardProps {
  prompt: Prompt
  onUpdate?: () => void
  isCombination?: boolean
}

export default function PromptCard({ prompt, onUpdate, isCombination = false }: PromptCardProps) {
  const router = useRouter()
  const { exportPrompt } = usePromptExport()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isCombination) {
      const searchParams = new URLSearchParams({
        template: prompt.template,
        name: prompt.name,
        tags: prompt.tags.join(','),
        variables: JSON.stringify(prompt.variables)
      })
      router.push(`/create?${searchParams.toString()}`)
    } else {
      router.push(`/prompts/${prompt.id}`)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isCombination) {
      handleView(e)
    } else {
      router.push(`/prompts/${prompt.id}/edit`)
    }
  }

  const handleExport = (e: React.MouseEvent) => {
    e.stopPropagation()
    exportPrompt(prompt)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await storage.deletePrompt(prompt.id)
      toast({
        title: "Deleted",
        description: "Prompt deleted successfully",
      })
      onUpdate?.()
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  const truncateTemplate = (template: string, maxLength = 100) => {
    if (template.length <= maxLength) return template
    return template.substring(0, maxLength) + "..."
  }

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isCombination) {
      toast({
        title: "Save first",
        description: "Save this combination prompt to add it to favorites",
      })
      return
    }
    try {
      await storage.toggleFavorite(prompt.id)
      toast({
        title: prompt.isFavorite ? "Removed from favorites" : "Added to favorites",
        description: prompt.isFavorite
          ? "Prompt removed from your favorites"
          : "Prompt added to your favorites",
      })
      onUpdate?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      })
    }
  }

  const handleSaveCombination = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const newPrompt: Prompt = {
        ...prompt,
        id: `prompt-${Date.now()}`,
        isFramework: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      await storage.savePrompt(newPrompt)
      toast({
        title: "Saved",
        description: "Combination prompt saved successfully",
      })
      onUpdate?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save combination prompt",
        variant: "destructive",
      })
    }
  }

  const handleDuplicate = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const duplicatedPrompt: Prompt = {
        ...prompt,
        id: `prompt-${Date.now()}`,
        name: `${prompt.name} (Copy)`,
        isFramework: false,
        category: prompt.category || "text",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      await storage.savePrompt(duplicatedPrompt)
      toast({
        title: "Duplicated",
        description: "Prompt duplicated successfully",
      })
      onUpdate?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate prompt",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Card className={cn(
        "h-full flex flex-col hover:shadow-md transition-shadow group relative",
        isCombination && "border-primary/50 bg-gradient-to-br from-primary/5 to-background"
      )}>
        {isCombination ? (
          <div className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center z-10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10",
              prompt.isFavorite && "opacity-100"
            )}
            onClick={handleToggleFavorite}
          >
            <Star
              className={cn("h-4 w-4", prompt.isFavorite && "fill-yellow-400 text-yellow-400")}
            />
            <span className="sr-only">Toggle favorite</span>
          </Button>
        )}

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2 pr-8">
            <CardTitle
              className="text-lg cursor-pointer hover:text-primary transition-colors"
              onClick={handleView}
            >
              {prompt.name}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isCombination ? (
                  <>
                    <DropdownMenuItem onClick={handleSaveCombination}>
                      <Download className="h-4 w-4 mr-2" />
                      Save as New Prompt
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleView}>
                      <Edit className="h-4 w-4 mr-2" />
                      Use as Template
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleView}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEdit}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDuplicate}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDeleteDialog(true)
                      }}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex gap-2 flex-wrap">
            {isCombination && (
              <Badge variant="default" className="w-fit text-xs bg-primary/80">
                <Sparkles className="h-3 w-3 mr-1" />
                Dynamic Combination
              </Badge>
            )}
            {prompt.isFramework && !isCombination && (
              <Badge variant="outline" className="w-fit text-xs">
                Framework
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow cursor-pointer" onClick={handleView}>
          <p className="text-muted-foreground text-sm mb-4">{truncateTemplate(prompt.template)}</p>
          <div className="flex flex-wrap gap-2">
            {prompt.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {prompt.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{prompt.tags.length - 3}
              </Badge>
            )}
          </div>
          {prompt.variables.length > 0 && (
            <div className="mt-3 text-xs text-muted-foreground">
              {prompt.variables.length} variable{prompt.variables.length !== 1 ? 's' : ''}
            </div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground pt-2 border-t">
          {isCombination ? (
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI-generated from tag selection
            </span>
          ) : (
            <>Updated: {formatDate(prompt.updatedAt)}</>
          )}
        </CardFooter>
      </Card>

      {!isCombination && (
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
      )}
    </>
  )
}
