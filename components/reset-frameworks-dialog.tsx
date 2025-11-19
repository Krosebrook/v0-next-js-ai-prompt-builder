"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { RotateCcw } from 'lucide-react'
import { resetFrameworksToDefaults } from "@/lib/seed-frameworks"
import { toast } from "@/components/ui/use-toast"

interface ResetFrameworksDialogProps {
  onReset: () => void
}

export default function ResetFrameworksDialog({ onReset }: ResetFrameworksDialogProps) {
  const [isResetting, setIsResetting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleReset = async () => {
    setIsResetting(true)
    try {
      await resetFrameworksToDefaults()
      toast({
        title: "Frameworks Reset",
        description: "All framework templates have been restored to defaults. Your custom prompts are preserved.",
      })
      setOpen(false)
      onReset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset frameworks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Frameworks
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset Framework Templates</AlertDialogTitle>
          <AlertDialogDescription>
            This will restore all 25 framework templates to their default state. Your custom prompts will not be affected. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isResetting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset} disabled={isResetting}>
            {isResetting ? "Resetting..." : "Reset Frameworks"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
