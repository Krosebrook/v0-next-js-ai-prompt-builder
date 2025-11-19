import type { Prompt, Variable } from "./types"

/**
 * Extract variable placeholders from a template string
 * @param template - The template string with {variable} placeholders
 * @returns Array of unique variable names
 */
export function extractVariableNames(template: string): string[] {
  const regex = /{([^{}]+)}/g
  const matches = template.match(regex) || []
  const names = matches.map((match) => match.slice(1, -1))
  return [...new Set(names)] // Remove duplicates
}

/**
 * Replace variables in template with actual values
 * @param template - The template string
 * @param values - Object mapping variable names to their values
 * @returns The interpolated string
 */
export function interpolateTemplate(template: string, values: Record<string, any>): string {
  let result = template
  
  Object.entries(values).forEach(([key, value]) => {
    const placeholder = `{${key}}`
    const stringValue = formatVariableValue(value)
    result = result.replaceAll(placeholder, stringValue)
  })
  
  return result
}

/**
 * Format a variable value for display in the template
 */
function formatVariableValue(value: any): string {
  if (value === null || value === undefined) return ""
  if (Array.isArray(value)) return value.join(", ")
  if (value instanceof Date) return value.toLocaleDateString()
  if (typeof value === "boolean") return value ? "Yes" : "No"
  return String(value)
}

/**
 * Validate that all required variables have values
 */
export function validateVariableValues(
  variables: Variable[],
  values: Record<string, any>
): { valid: boolean; missing: string[] } {
  const missing: string[] = []
  
  variables.forEach((variable) => {
    const value = values[variable.name]
    const hasValue = value !== undefined && value !== null && value !== ""
    
    if (!hasValue && !variable.defaultValue) {
      missing.push(variable.name)
    }
  })
  
  return {
    valid: missing.length === 0,
    missing,
  }
}

/**
 * Get default values for all variables
 */
export function getDefaultValues(variables: Variable[]): Record<string, any> {
  const defaults: Record<string, any> = {}
  
  variables.forEach((variable) => {
    if (variable.defaultValue !== undefined) {
      defaults[variable.name] = variable.defaultValue
    } else {
      // Set sensible defaults based on type
      switch (variable.type) {
        case "checkbox":
          defaults[variable.name] = []
          break
        case "switch":
          defaults[variable.name] = false
          break
        case "number":
        case "slider":
          defaults[variable.name] = variable.min ?? 0
          break
        default:
          defaults[variable.name] = ""
      }
    }
  })
  
  return defaults
}

/**
 * Export prompt to JSON string
 */
export function exportPromptToJSON(prompt: Prompt): string {
  return JSON.stringify(prompt, null, 2)
}

/**
 * Import prompt from JSON string
 */
export function importPromptFromJSON(json: string): Prompt {
  const parsed = JSON.parse(json)
  return {
    ...parsed,
    id: crypto.randomUUID(), // Generate new ID for imported prompt
    createdAt: new Date(parsed.createdAt),
    updatedAt: new Date(parsed.updatedAt),
  }
}

/**
 * Generate a shareable URL for a prompt (for future implementation)
 */
export function generateShareableURL(promptId: string): string {
  if (typeof window === "undefined") return ""
  return `${window.location.origin}/prompts/${promptId}`
}
