import type { Prompt, StorageAdapter, PromptRevision } from "./types"

// LocalStorage implementation of the StorageAdapter
class LocalStorageAdapter implements StorageAdapter {
  private readonly STORAGE_KEY = "ai-prompt-builder-prompts"
  private readonly VERSION_KEY = "ai-prompt-builder-version"
  private readonly CURRENT_VERSION = "2.0.0" // Updated version for Phase 2

  // Helper to parse dates when retrieving from localStorage
  private parsePromptDates(prompt: Prompt): Prompt {
    return {
      ...prompt,
      createdAt: new Date(prompt.createdAt),
      updatedAt: new Date(prompt.updatedAt),
    }
  }

  private migratePrompt(prompt: any): Prompt {
    return {
      ...prompt,
      category: prompt.category || "uncategorized",
      isFavorite: prompt.isFavorite ?? false,
      isFramework: prompt.isFramework ?? false,
      version: prompt.version ?? 1,
      revisions: prompt.revisions ?? [],
    }
  }

  private async checkAndMigrate(): Promise<void> {
    if (typeof window === "undefined") return

    const currentVersion = localStorage.getItem(this.VERSION_KEY)
    if (currentVersion === this.CURRENT_VERSION) return

    const storedPrompts = localStorage.getItem(this.STORAGE_KEY)
    if (storedPrompts) {
      try {
        const prompts = JSON.parse(storedPrompts)
        const migratedPrompts = prompts.map(this.migratePrompt)
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(migratedPrompts))
        localStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION)
      } catch (error) {
        console.error("Error migrating data:", error)
      }
    } else {
      localStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION)
    }
  }

  // Get all prompts
  async getPrompts(): Promise<Prompt[]> {
    if (typeof window === "undefined") return []

    await this.checkAndMigrate()

    try {
      const storedPrompts = localStorage.getItem(this.STORAGE_KEY)
      if (!storedPrompts) return []

      const prompts: Prompt[] = JSON.parse(storedPrompts)
      return prompts
        .map(this.parsePromptDates)
        .map(this.migratePrompt)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    } catch (error) {
      console.error("Error getting prompts from localStorage:", error)
      return []
    }
  }

  // Get a prompt by ID
  async getPromptById(id: string): Promise<Prompt | null> {
    if (typeof window === "undefined") return null

    try {
      const prompts = await this.getPrompts()
      const prompt = prompts.find((p) => p.id === id)
      return prompt ? this.parsePromptDates(prompt) : null
    } catch (error) {
      console.error(`Error getting prompt ${id} from localStorage:`, error)
      return null
    }
  }

  // Save a prompt (create or update)
  async savePrompt(prompt: Prompt, changeDescription?: string): Promise<Prompt> {
    if (typeof window === "undefined") throw new Error("Cannot save prompt: localStorage not available")

    try {
      const prompts = await this.getPrompts()
      const existingIndex = prompts.findIndex((p) => p.id === prompt.id)
      const existing = existingIndex >= 0 ? prompts[existingIndex] : null

      const updatedPrompt = {
        ...prompt,
        updatedAt: new Date(),
        version: existing ? (existing.version || 1) + 1 : 1,
        revisions: existing?.revisions || [],
      }

      // Create revision from existing prompt
      if (existing) {
        const revision: PromptRevision = {
          id: `${existing.id}-v${existing.version || 1}`,
          version: existing.version || 1,
          name: existing.name,
          template: existing.template,
          variables: existing.variables,
          tags: existing.tags,
          timestamp: new Date(existing.updatedAt),
          changeDescription,
        }
        
        updatedPrompt.revisions = [...(existing.revisions || []), revision].slice(-10) // Keep last 10 revisions
      }

      if (existingIndex >= 0) {
        prompts[existingIndex] = updatedPrompt
      } else {
        prompts.push(updatedPrompt)
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prompts))
      return updatedPrompt
    } catch (error) {
      console.error("Error saving prompt to localStorage:", error)
      throw new Error("Failed to save prompt")
    }
  }

  // Delete a prompt
  async deletePrompt(id: string): Promise<void> {
    if (typeof window === "undefined") throw new Error("Cannot delete prompt: localStorage not available")

    try {
      const prompts = await this.getPrompts()
      const filteredPrompts = prompts.filter((p) => p.id !== id)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredPrompts))
    } catch (error) {
      console.error(`Error deleting prompt ${id} from localStorage:`, error)
      throw new Error("Failed to delete prompt")
    }
  }

  // Search prompts by name
  async searchPrompts(query: string): Promise<Prompt[]> {
    if (typeof window === "undefined") return []

    try {
      const prompts = await this.getPrompts()
      if (!query) return prompts

      const lowerQuery = query.toLowerCase()
      return prompts.filter(
        (prompt) =>
          prompt.name.toLowerCase().includes(lowerQuery) ||
          prompt.template.toLowerCase().includes(lowerQuery) ||
          prompt.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      )
    } catch (error) {
      console.error(`Error searching prompts with query "${query}":`, error)
      return []
    }
  }

  // Filter prompts by tags
  async filterPromptsByTags(tags: string[]): Promise<Prompt[]> {
    if (typeof window === "undefined") return []

    try {
      const prompts = await this.getPrompts()
      if (!tags.length) return prompts

      return prompts.filter((prompt) => tags.every((tag) => prompt.tags.includes(tag)))
    } catch (error) {
      console.error(`Error filtering prompts by tags:`, error)
      return []
    }
  }

  // Toggle favorite status
  async toggleFavorite(id: string): Promise<Prompt | null> {
    if (typeof window === "undefined") return null

    try {
      const prompt = await this.getPromptById(id)
      if (!prompt) return null

      const updatedPrompt = {
        ...prompt,
        isFavorite: !prompt.isFavorite,
        updatedAt: new Date(),
      }

      await this.savePrompt(updatedPrompt)
      return updatedPrompt
    } catch (error) {
      console.error(`Error toggling favorite for prompt ${id}:`, error)
      return null
    }
  }

  // Get prompts by category
  async getPromptsByCategory(category: string): Promise<Prompt[]> {
    if (typeof window === "undefined") return []

    try {
      const prompts = await this.getPrompts()
      if (category === "all") return prompts
      if (category === "favorites") return prompts.filter((p) => p.isFavorite)
      if (category === "frameworks") return prompts.filter((p) => p.isFramework)
      if (category === "custom") return prompts.filter((p) => !p.isFramework)
      
      return prompts.filter((p) => p.category === category)
    } catch (error) {
      console.error(`Error filtering prompts by category "${category}":`, error)
      return []
    }
  }

  // Reset frameworks to defaults
  async resetFrameworks(defaultFrameworks: Prompt[]): Promise<void> {
    if (typeof window === "undefined") return

    try {
      const prompts = await this.getPrompts()
      const userPrompts = prompts.filter((p) => !p.isFramework)
      const combined = [...userPrompts, ...defaultFrameworks]
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(combined))
    } catch (error) {
      console.error("Error resetting frameworks:", error)
      throw new Error("Failed to reset frameworks")
    }
  }

  // Get prompt revision history
  async getPromptRevisions(id: string): Promise<PromptRevision[]> {
    if (typeof window === "undefined") return []

    try {
      const prompt = await this.getPromptById(id)
      return prompt?.revisions || []
    } catch (error) {
      console.error(`Error getting revisions for prompt ${id}:`, error)
      return []
    }
  }

  // Restore a revision
  async restoreRevision(promptId: string, revisionId: string): Promise<Prompt> {
    if (typeof window === "undefined") throw new Error("Cannot restore revision: localStorage not available")

    try {
      const prompt = await this.getPromptById(promptId)
      if (!prompt) throw new Error("Prompt not found")

      const revision = prompt.revisions?.find((r) => r.id === revisionId)
      if (!revision) throw new Error("Revision not found")

      const restoredPrompt: Prompt = {
        ...prompt,
        name: revision.name,
        template: revision.template,
        variables: revision.variables,
        tags: revision.tags,
        updatedAt: new Date(),
      }

      return await this.savePrompt(restoredPrompt, `Restored from version ${revision.version}`)
    } catch (error) {
      console.error(`Error restoring revision ${revisionId}:`, error)
      throw error
    }
  }

  // Bulk export
  async bulkExport(): Promise<Prompt[]> {
    return await this.getPrompts()
  }

  // Bulk import with validation
  async bulkImport(prompts: Prompt[]): Promise<void> {
    if (typeof window === "undefined") throw new Error("Cannot import prompts: localStorage not available")

    try {
      const existingPrompts = await this.getPrompts()
      const existingIds = new Set(existingPrompts.map((p) => p.id))

      // Filter out duplicates and add new prompts
      const newPrompts = prompts.filter((p) => !existingIds.has(p.id))
      const combined = [...existingPrompts, ...newPrompts]

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(combined))
    } catch (error) {
      console.error("Error importing prompts:", error)
      throw new Error("Failed to import prompts")
    }
  }

  // Duplicate a prompt
  async duplicatePrompt(id: string): Promise<Prompt> {
    if (typeof window === "undefined") throw new Error("Cannot duplicate prompt: localStorage not available")

    try {
      const prompt = await this.getPromptById(id)
      if (!prompt) throw new Error("Prompt not found")

      const duplicatedPrompt: Prompt = {
        ...prompt,
        id: crypto.randomUUID(),
        name: `${prompt.name} (Copy)`,
        isFramework: false, // Duplicated prompts are never frameworks
        version: 1,
        revisions: [], // Don't copy revision history
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return await this.savePrompt(duplicatedPrompt)
    } catch (error) {
      console.error(`Error duplicating prompt ${id}:`, error)
      throw error
    }
  }
}

// Export a singleton instance
export const storage = new LocalStorageAdapter()
