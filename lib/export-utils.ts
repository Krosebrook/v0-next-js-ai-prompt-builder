import type { Prompt, ExportFormat } from "./types"
import JSZip from "jszip"

export function exportToJSON(prompt: Prompt): string {
  return JSON.stringify(prompt, null, 2)
}

export function exportToYAML(prompt: Prompt): string {
  const yaml: string[] = []
  
  yaml.push(`name: "${prompt.name}"`)
  yaml.push(`id: "${prompt.id}"`)
  yaml.push(`template: |`)
  prompt.template.split('\n').forEach(line => yaml.push(`  ${line}`))
  
  if (prompt.tags.length > 0) {
    yaml.push(`tags:`)
    prompt.tags.forEach(tag => yaml.push(`  - ${tag}`))
  }
  
  if (prompt.variables.length > 0) {
    yaml.push(`variables:`)
    prompt.variables.forEach(v => {
      yaml.push(`  - name: ${v.name}`)
      yaml.push(`    type: ${v.type}`)
      if (v.defaultValue) yaml.push(`    default: ${v.defaultValue}`)
    })
  }
  
  return yaml.join('\n')
}

export function exportToMarkdown(prompt: Prompt): string {
  const md: string[] = []
  
  md.push(`# ${prompt.name}`)
  md.push('')
  
  if (prompt.tags.length > 0) {
    md.push(`**Tags:** ${prompt.tags.join(', ')}`)
    md.push('')
  }
  
  md.push(`## Template`)
  md.push('')
  md.push('```')
  md.push(prompt.template)
  md.push('```')
  md.push('')
  
  if (prompt.variables.length > 0) {
    md.push(`## Variables`)
    md.push('')
    prompt.variables.forEach(v => {
      md.push(`- **${v.name}** (\`${v.type}\`)`)
      if (v.defaultValue) md.push(`  - Default: ${v.defaultValue}`)
      if (v.placeholder) md.push(`  - Placeholder: ${v.placeholder}`)
    })
    md.push('')
  }
  
  return md.join('\n')
}

export function exportPrompt(prompt: Prompt, format: ExportFormat): string {
  switch (format) {
    case "json":
      return exportToJSON(prompt)
    case "yaml":
      return exportToYAML(prompt)
    case "markdown":
      return exportToMarkdown(prompt)
    default:
      return exportToJSON(prompt)
  }
}

export async function exportPromptsAsZip(prompts: Prompt[]): Promise<Blob> {
  const zip = new JSZip()
  
  prompts.forEach((prompt) => {
    const sanitizedName = prompt.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    zip.file(`${sanitizedName}.json`, exportToJSON(prompt))
  })
  
  return await zip.generateAsync({ type: "blob" })
}

export function downloadFile(content: string | Blob, filename: string, type: string = "application/json") {
  const blob = content instanceof Blob ? content : new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function generateShareableURL(prompt: Prompt): string {
  const data = JSON.stringify({
    name: prompt.name,
    template: prompt.template,
    variables: prompt.variables,
    tags: prompt.tags,
  })
  
  // Use base64 encoding for URL (in production, use compression like LZ-string)
  const encoded = btoa(encodeURIComponent(data))
  return `${window.location.origin}/import#${encoded}`
}

export function parseShareableURL(hash: string): Prompt | null {
  try {
    const decoded = decodeURIComponent(atob(hash.replace('#', '')))
    const data = JSON.parse(decoded)
    
    return {
      ...data,
      id: crypto.randomUUID(),
      isFramework: false,
      version: 1,
      revisions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  } catch (error) {
    console.error("Error parsing shareable URL:", error)
    return null
  }
}
