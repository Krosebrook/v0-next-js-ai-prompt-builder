"use client"

import type { Prompt } from "@/lib/types"
import VariableField from "@/components/variable-field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { interpolateTemplate } from "@/lib/prompt-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

interface PromptPreviewProps {
  prompt: Prompt
  variableValues: Record<string, any>
  onVariableValueChange: (name: string, value: any) => void
}

export default function PromptPreview({ prompt, variableValues, onVariableValueChange }: PromptPreviewProps) {
  // Get filled prompt with current variable values
  const getFilledPrompt = (): { html: string; hasUnfilled: boolean } => {
    let filledTemplate = prompt.template
    let hasUnfilled = false

    // Replace filled variables
    Object.entries(variableValues).forEach(([name, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        const regex = new RegExp(`{${name}}`, "g")
        filledTemplate = filledTemplate.replace(regex, String(value))
      }
    })

    // Highlight remaining unfilled variables
    const unfilledRegex = /{([^{}]+)}/g
    if (unfilledRegex.test(filledTemplate)) {
      hasUnfilled = true
      filledTemplate = filledTemplate.replace(
        /{([^{}]+)}/g,
        '<span class="bg-yellow-200 dark:bg-yellow-900/50 px-1 py-0.5 rounded text-yellow-900 dark:text-yellow-200 font-medium">{$1}</span>',
      )
    }

    return { html: filledTemplate, hasUnfilled }
  }

  const { html, hasUnfilled } = getFilledPrompt()

  return (
    <div className="space-y-6">
      {prompt.variables.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Fill Variables</h3>
          <div className="space-y-4">
            {prompt.variables.map((variable) => (
              <VariableField
                key={variable.id}
                variable={variable}
                value={variableValues[variable.name] ?? variable.defaultValue ?? ""}
                onChange={(value) => onVariableValueChange(variable.name, value)}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium mb-4">Prompt Preview</h3>
        {hasUnfilled && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Some variables are not filled. They are highlighted in yellow.
            </AlertDescription>
          </Alert>
        )}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{prompt.name || "Untitled Prompt"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
