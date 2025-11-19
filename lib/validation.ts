import { z } from "zod"

// Variable validation schemas
export const variableOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
})

export const variableSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Variable name is required"),
  type: z.enum([
    "text",
    "number",
    "file",
    "textarea",
    "select",
    "radio",
    "checkbox",
    "switch",
    "date",
    "dateRange",
    "combobox",
    "slider",
  ]),
  options: z.array(variableOptionSchema).optional(),
  defaultValue: z.any().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  placeholder: z.string().optional(),
})

export const promptRevisionSchema = z.object({
  id: z.string(),
  version: z.number().positive(),
  name: z.string(),
  template: z.string(),
  variables: z.array(variableSchema),
  tags: z.array(z.string()),
  timestamp: z.date(),
  changeDescription: z.string().optional(),
})

// Prompt validation schema
export const promptSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Prompt name is required").max(100, "Name too long"),
  template: z.string().min(1, "Template is required").max(10000, "Template too long"),
  variables: z.array(variableSchema),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed"),
  category: z.string().optional(),
  isFavorite: z.boolean().optional(),
  isFramework: z.boolean().optional(),
  version: z.number().optional(),
  revisions: z.array(promptRevisionSchema).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ValidatedPrompt = z.infer<typeof promptSchema>
export type ValidatedVariable = z.infer<typeof variableSchema>
export type ValidatedPromptRevision = z.infer<typeof promptRevisionSchema>

export function validatePrompt(prompt: unknown): { 
  success: boolean
  data?: ValidatedPrompt
  errors?: string[] 
} {
  try {
    const validated = promptSchema.parse(prompt)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      }
    }
    return { success: false, errors: ["Unknown validation error"] }
  }
}

export function validateVariable(variable: unknown): {
  success: boolean
  data?: ValidatedVariable
  errors?: string[]
} {
  try {
    const validated = variableSchema.parse(variable)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      }
    }
    return { success: false, errors: ["Unknown validation error"] }
  }
}

export function validateImportedPrompt(data: unknown): ValidatedPrompt | null {
  const result = validatePrompt(data)
  if (result.success && result.data) {
    return result.data
  }
  console.error("Import validation failed:", result.errors)
  return null
}
