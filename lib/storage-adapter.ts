import type { Prompt, StorageAdapter, PromptRevision } from "./types"

export abstract class BaseStorageAdapter implements StorageAdapter {
  abstract getPrompts(): Promise<Prompt[]>
  abstract getPromptById(id: string): Promise<Prompt | null>
  abstract savePrompt(prompt: Prompt, changeDescription?: string): Promise<Prompt>
  abstract deletePrompt(id: string): Promise<void>
  abstract searchPrompts(query: string): Promise<Prompt[]>
  abstract filterPromptsByTags(tags: string[]): Promise<Prompt[]>
  abstract getPromptRevisions(id: string): Promise<PromptRevision[]>
  abstract restoreRevision(promptId: string, revisionId: string): Promise<Prompt>
  abstract bulkExport(): Promise<Prompt[]>
  abstract bulkImport(prompts: Prompt[]): Promise<void>
  abstract duplicatePrompt(id: string): Promise<Prompt>
}

export class StorageFactory {
  private static adapter: StorageAdapter | null = null

  static setAdapter(adapter: StorageAdapter): void {
    this.adapter = adapter
  }

  static getAdapter(): StorageAdapter {
    if (!this.adapter) {
      throw new Error("Storage adapter not initialized")
    }
    return this.adapter
  }

  static isInitialized(): boolean {
    return this.adapter !== null
  }
}

export interface SupabaseAdapterConfig {
  supabaseUrl: string
  supabaseKey: string
}

export interface NeonAdapterConfig {
  connectionString: string
}

// Migration utilities for future database integrations
export interface MigrationResult {
  success: boolean
  migratedCount: number
  errors: string[]
}

export async function migrateToDatabase(
  source: StorageAdapter,
  target: StorageAdapter
): Promise<MigrationResult> {
  const errors: string[] = []
  let migratedCount = 0

  try {
    const prompts = await source.bulkExport()
    
    for (const prompt of prompts) {
      try {
        await target.savePrompt(prompt)
        migratedCount++
      } catch (error) {
        errors.push(`Failed to migrate prompt ${prompt.id}: ${error}`)
      }
    }

    return {
      success: errors.length === 0,
      migratedCount,
      errors,
    }
  } catch (error) {
    return {
      success: false,
      migratedCount: 0,
      errors: [`Migration failed: ${error}`],
    }
  }
}
