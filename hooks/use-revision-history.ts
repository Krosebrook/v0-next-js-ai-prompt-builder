import { useState, useEffect } from "react"
import { storage } from "@/lib/storage"
import type { PromptRevision } from "@/lib/types"

export function useRevisionHistory(promptId: string | null) {
  const [revisions, setRevisions] = useState<PromptRevision[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!promptId) {
      setRevisions([])
      return
    }

    const loadRevisions = async () => {
      setIsLoading(true)
      try {
        const history = await storage.getPromptRevisions(promptId)
        setRevisions(history)
      } catch (error) {
        console.error("Error loading revisions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRevisions()
  }, [promptId])

  const restoreRevision = async (revisionId: string) => {
    if (!promptId) return null
    
    try {
      const restored = await storage.restoreRevision(promptId, revisionId)
      return restored
    } catch (error) {
      console.error("Error restoring revision:", error)
      return null
    }
  }

  return { revisions, isLoading, restoreRevision }
}
