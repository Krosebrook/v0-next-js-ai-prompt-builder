export interface Prompt {
  id: string
  name: string
  template: string
  variables: Variable[]
  tags: string[]
  category?: string
  isFavorite?: boolean
  isFramework?: boolean
  version?: number
  revisions?: PromptRevision[]
  createdAt: Date
  updatedAt: Date
}

export interface Variable {
  id: string
  name: string
  type: VariableType
  options?: VariableOption[]
  defaultValue?: any
  min?: number
  max?: number
  step?: number
  placeholder?: string
}

export type VariableType =
  | "text"
  | "number"
  | "file"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "switch"
  | "date"
  | "dateRange"
  | "combobox"
  | "slider"

export interface VariableOption {
  value: string
  label: string
}

export interface PromptRevision {
  id: string
  version: number
  name: string
  template: string
  variables: Variable[]
  tags: string[]
  timestamp: Date
  changeDescription?: string
}

export interface StorageAdapter {
  getPrompts(): Promise<Prompt[]>
  getPromptById(id: string): Promise<Prompt | null>
  savePrompt(prompt: Prompt, changeDescription?: string): Promise<Prompt>
  deletePrompt(id: string): Promise<void>
  searchPrompts(query: string): Promise<Prompt[]>
  filterPromptsByTags(tags: string[]): Promise<Prompt[]>
  getPromptRevisions(id: string): Promise<PromptRevision[]>
  restoreRevision(promptId: string, revisionId: string): Promise<Prompt>
  bulkExport(): Promise<Prompt[]>
  bulkImport(prompts: Prompt[]): Promise<void>
  duplicatePrompt(id: string): Promise<Prompt>
}

export type ExportFormat = "json" | "yaml" | "markdown"

export interface SyncStatus {
  lastSynced: Date | null
  status: "synced" | "pending" | "error"
  provider: "localStorage" | "supabase" | "neon"
}
