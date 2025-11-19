"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PromptForm from "@/components/prompt-form"
import VariableForm from "@/components/variable-form"
import PromptPreview from "@/components/prompt-preview"
import type { Prompt, Variable } from "@/lib/types"
import { storage } from "@/lib/storage"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Save } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function EditPromptPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("template")
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [changeDescription, setChangeDescription] = useState("")
  const [variableValues, setVariableValues] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadPrompt = async () => {
      try {
        const loadedPrompt = await storage.getPromptById(params.id)
        if (loadedPrompt) {
          setPrompt(loadedPrompt)
        } else {
          toast({
            title: "Prompt not found",
            variant: "destructive",
          })
          router.push("/")
        }
      } catch (error) {
        toast({
          title: "Error loading prompt",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPrompt()
  }, [params.id, router])

  const extractVariables = (template: string): string[] => {
    const regex = /{([^{}]+)}/g
    const matches = template.match(regex) || []
    return matches.map((match) => match.slice(1, -1))
  }

  const handleTemplateChange = (name: string, template: string, tags: string[]) => {
    if (!prompt) return

    const extractedVarNames = extractVariables(template)
    const updatedVariables = prompt.variables.filter((v) => extractedVarNames.includes(v.name))

    extractedVarNames.forEach((varName) => {
      if (!updatedVariables.some((v) => v.name === varName)) {
        updatedVariables.push({
          id: crypto.randomUUID(),
          name: varName,
          type: "text",
        })
      }
    })

    setPrompt({
      ...prompt,
      name,
      template,
      tags,
      variables: updatedVariables,
      updatedAt: new Date(),
    })
  }

  const handleVariableChange = (updatedVariable: Variable) => {
    if (!prompt) return

    setPrompt({
      ...prompt,
      variables: prompt.variables.map((v) => (v.id === updatedVariable.id ? updatedVariable : v)),
      updatedAt: new Date(),
    })
  }

  const handleVariableValueChange = (name: string, value: any) => {
    setVariableValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSavePrompt = async () => {
    if (!prompt) return

    setIsSaving(true)
    try {
      await storage.savePrompt(prompt, changeDescription || undefined)
      toast({
        title: "Changes saved",
        description: "Your prompt has been updated successfully.",
      })
      router.push(`/prompts/${prompt.id}`)
    } catch (error) {
      toast({
        title: "Error saving changes",
        description: "There was an error saving your changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-12 w-64 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[500px]" />
          <Skeleton className="h-[500px]" />
        </div>
      </div>
    )
  }

  if (!prompt) {
    return null
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.push(`/prompts/${prompt.id}`)} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Edit Prompt</h1>
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

          <Card className="p-4 mt-4">
            <Label htmlFor="change-description">Change Description (Optional)</Label>
            <Input
              id="change-description"
              placeholder="Describe what you changed..."
              value={changeDescription}
              onChange={(e) => setChangeDescription(e.target.value)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              This will be saved in the version history
            </p>
          </Card>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.push(`/prompts/${prompt.id}`)}>
              Cancel
            </Button>
            <Button onClick={handleSavePrompt} disabled={!prompt.name || !prompt.template || isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
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
