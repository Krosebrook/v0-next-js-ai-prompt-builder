"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import TagInput from "@/components/tag-input"

interface PromptFormProps {
  name: string
  template: string
  tags: string[]
  onChange: (name: string, template: string, tags: string[]) => void
}

export default function PromptForm({ name, template, tags, onChange }: PromptFormProps) {
  const [localName, setLocalName] = useState(name)
  const [localTemplate, setLocalTemplate] = useState(template)
  const [localTags, setLocalTags] = useState<string[]>(tags)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setLocalName(newName)
    onChange(newName, localTemplate, localTags)
  }

  const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTemplate = e.target.value
    setLocalTemplate(newTemplate)
    onChange(localName, newTemplate, localTags)
  }

  const handleTagsChange = (newTags: string[]) => {
    setLocalTags(newTags)
    onChange(localName, localTemplate, newTags)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="prompt-name">Prompt Name</Label>
        <Input
          id="prompt-name"
          placeholder="Enter a name for your prompt"
          value={localName}
          onChange={handleNameChange}
        />
      </div>

      <div>
        <Label htmlFor="prompt-template">Template (use {"{variable_name}"} for variables)</Label>
        <Textarea
          id="prompt-template"
          placeholder="Write your prompt template here..."
          className="min-h-[200px]"
          value={localTemplate}
          onChange={handleTemplateChange}
        />
      </div>

      <div>
        <Label htmlFor="prompt-tags">Tags</Label>
        <TagInput id="prompt-tags" tags={localTags} onChange={handleTagsChange} />
      </div>
    </div>
  )
}
