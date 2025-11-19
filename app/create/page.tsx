"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PromptForm from "@/components/prompt-form"
import VariableForm from "@/components/variable-form"
import PromptPreview from "@/components/prompt-preview"
import type { Prompt, Variable } from "@/lib/types"
import { storage } from "@/lib/storage"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Save } from "lucide-react"

export default function CreatePromptPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("template")
  const [prompt, setPrompt] = useState<Prompt>({
    id: crypto.randomUUID(),
    name: "",
    template: "",
    variables: [],
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  const [variableValues, setVariableValues] = useState<Record<string, any>>({})

  // Extract variable placeholders from the template
  const extractVariables = (template: string): string[] => {
    const regex = /{([^{}]+)}/g
    const matches = template.match(regex) || []
    return matches.map((match) => match.slice(1, -1))
  }

  const handleTemplateChange = (name: string, template: string, tags: string[]) => {
    const extractedVarNames = extractVariables(template)

    // Keep existing variables that are still in the template
    const updatedVariables = prompt.variables.filter((v) => extractedVarNames.includes(v.name))

    // Add new variables that don't exist yet
    extractedVarNames.forEach((varName) => {
      if (!updatedVariables.some((v) => v.name === varName)) {
        updatedVariables.push({
          id: crypto.randomUUID(),
          name: varName,
          type: "text",
        })
      }
    })

    setPrompt((prev) => ({
      ...prev,
      name,
      template,
      tags,
      variables: updatedVariables,
      updatedAt: new Date(),
    }))
  }

  const handleVariableChange = (updatedVariable: Variable) => {
    setPrompt((prev) => ({
      ...prev,
      variables: prev.variables.map((v) => (v.id === updatedVariable.id ? updatedVariable : v)),
      updatedAt: new Date(),
    }))
  }

  const handleVariableValueChange = (name: string, value: any) => {
    setVariableValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSavePrompt = async () => {
    try {
      await storage.savePrompt(prompt)
      toast({
        title: "Prompt saved",
        description: "Your prompt has been saved successfully.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error saving prompt",
        description: "There was an error saving your prompt. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/")} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Create Prompt</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="variables">Variables</TabsTrigger>
            </TabsList>
            <TabsContent value="template" className="mt-4">
              <Card className="p-4">
                <PromptForm
                  name={prompt.name}
                  template={prompt.template}
                  tags={prompt.tags}
                  onChange={handleTemplateChange}
                />
              </Card>
            </TabsContent>
            <TabsContent value="variables" className="mt-4">
              <Card className="p-4">
                {prompt.variables.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Add variables to your template using {"{variable_name}"} syntax
                  </div>
                ) : (
                  <div className="space-y-4">
                    {prompt.variables.map((variable) => (
                      <VariableForm key={variable.id} variable={variable} onChange={handleVariableChange} />
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSavePrompt} disabled={!prompt.name || !prompt.template}>
              <Save className="mr-2 h-4 w-4" />
              Save Prompt
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <Card className="p-4">
            <PromptPreview
              prompt={prompt}
              variableValues={variableValues}
              onVariableValueChange={handleVariableValueChange}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
