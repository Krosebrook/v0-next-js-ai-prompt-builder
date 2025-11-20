"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SCENE_TYPES } from "@/lib/scene-templates"
import { Film, Plus, Check } from "lucide-react"

interface SceneBuilderProps {
  storyboardId: string
  existingScenes: number[]
  onSceneCreate: () => void
}

export function SceneBuilder({ storyboardId, existingScenes, onSceneCreate }: SceneBuilderProps) {
  const [selectedType, setSelectedType] = useState(SCENE_TYPES[0].type)
  const [title, setTitle] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const selectedTemplate = SCENE_TYPES.find(t => t.type === selectedType)
  const nextSceneNumber = Math.max(0, ...existingScenes) + 1

  const handleCreate = async () => {
    if (!title.trim()) {
      return
    }

    setIsCreating(true)

    setIsCreating(false)
    onSceneCreate()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Create Workflow Scene</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {SCENE_TYPES.map((sceneType) => {
            const isUsed = existingScenes.includes(SCENE_TYPES.indexOf(sceneType) + 1)
            const isSelected = selectedType === sceneType.type

            return (
              <Card
                key={sceneType.type}
                className={`cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-primary' : ''
                } ${isUsed ? 'opacity-50' : ''}`}
                onClick={() => !isUsed && setSelectedType(sceneType.type)}
              >
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Film className="h-5 w-5" />
                    {isUsed && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                  <CardTitle className="text-sm">{sceneType.label}</CardTitle>
                  <CardDescription className="text-xs line-clamp-2">
                    {sceneType.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>

      {selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle>Scene Details</CardTitle>
            <CardDescription>
              Configure scene {nextSceneNumber}: {selectedTemplate.label}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="scene-title">Scene Title</Label>
              <Input
                id="scene-title"
                placeholder={`e.g., ${selectedTemplate.label}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label>Scene Type</Label>
              <div className="mt-2">
                <Badge variant="secondary">{selectedTemplate.type}</Badge>
              </div>
            </div>

            <div>
              <Label>Background</Label>
              <div className="mt-2 p-3 border rounded-lg bg-muted/30">
                <div className="text-sm">
                  <span className="font-medium">Type:</span> {selectedTemplate.template.background_type}
                </div>
              </div>
            </div>

            <div>
              <Label>Duration</Label>
              <div className="mt-2">
                <Badge variant="outline">{selectedTemplate.defaultDuration}s</Badge>
              </div>
            </div>

            <div>
              <Label>Sound Design</Label>
              <div className="mt-2 p-3 border rounded-lg bg-muted/30">
                <div className="text-xs space-y-1">
                  {Object.entries(selectedTemplate.template.sound_design).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium capitalize">{key}:</span>{' '}
                      {Array.isArray(value) ? value.join(', ') : value.toString()}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={handleCreate}
              disabled={!title.trim() || isCreating}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {isCreating ? 'Creating...' : 'Create Scene'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
