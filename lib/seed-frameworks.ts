import { storage } from "./storage"
import { promptFrameworks } from "./prompt-frameworks"
import type { Prompt } from "./types"

const FRAMEWORK_VERSION = "4.0.0"
const VERSION_KEY = "ai-prompt-builder-framework-version"

export async function seedPromptFrameworks(): Promise<void> {
  if (typeof window === "undefined") return

  const SEED_FLAG_KEY = "ai-prompt-builder-seeded"
  const hasSeeded = localStorage.getItem(SEED_FLAG_KEY)
  const currentVersion = localStorage.getItem(VERSION_KEY)

  if (hasSeeded && currentVersion === FRAMEWORK_VERSION) {
    return
  }

  try {
    const existingPrompts = await storage.getPrompts()

    const userPrompts = existingPrompts.filter((p) => !p.isFramework)
    if (existingPrompts.length > 0 && hasSeeded && userPrompts.length === existingPrompts.length) {
      localStorage.setItem(SEED_FLAG_KEY, "true")
      localStorage.setItem(VERSION_KEY, FRAMEWORK_VERSION)
      return
    }

    const now = new Date()
    const promptsToSeed: Prompt[] = promptFrameworks.map((framework, index) => ({
      ...framework,
      id: `framework-${index + 1}`,
      isFramework: true,
      category: framework.category || "frameworks",
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
      version: 1,
      revisions: [],
    }))

    const prompts = existingPrompts.filter((p) => !p.isFramework)
    
    for (const prompt of promptsToSeed) {
      await storage.savePrompt(prompt)
    }

    localStorage.setItem(SEED_FLAG_KEY, "true")
    localStorage.setItem(VERSION_KEY, FRAMEWORK_VERSION)
    console.log(`✓ Seeded ${promptsToSeed.length} prompt frameworks (v${FRAMEWORK_VERSION})`)
  } catch (error) {
    console.error("Error seeding prompt frameworks:", error)
  }
}

export async function resetFrameworksToDefaults(): Promise<void> {
  if (typeof window === "undefined") return

  try {
    const now = new Date()
    const defaultFrameworks: Prompt[] = promptFrameworks.map((framework, index) => ({
      ...framework,
      id: `framework-${index + 1}`,
      isFramework: true,
      category: framework.category || "frameworks",
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
    }))

    await storage.resetFrameworks(defaultFrameworks)
    
    localStorage.setItem("ai-prompt-builder-seeded", "true")
    localStorage.setItem(VERSION_KEY, FRAMEWORK_VERSION)
    
    console.log(`✓ Reset ${defaultFrameworks.length} frameworks to defaults`)
  } catch (error) {
    console.error("Error resetting frameworks:", error)
    throw error
  }
}

export function clearSeedFlag(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("ai-prompt-builder-seeded")
  localStorage.removeItem(VERSION_KEY)
}
