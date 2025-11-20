"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AVATAR_STYLES } from "@/lib/scene-templates"
import { User, Plus, Trash2, Mic } from "lucide-react"
import { toast } from "sonner"

interface ScriptLine {
  id: string
  text: string
  timestamp: number
}

interface AvatarConfiguratorProps {
  storyboardId: string
  onAvatarCreate: () => void
}

export function AvatarConfigurator({ storyboardId, onAvatarCreate }: AvatarConfiguratorProps) {
  const [name, setName] = useState('')
  const [style, setStyle] = useState(AVATAR_STYLES[0].style)
  const [scriptLines, setScriptLines] = useState<ScriptLine[]>([
    { id: '1', text: '', timestamp: 0 }
  ])
  const [isCreating, setIsCreating] = useState(false)

  const selectedStyle = AVATAR_STYLES.find(s => s.style === style)

  const addScriptLine = () => {
    const lastTimestamp = scriptLines.length > 0
      ? scriptLines[scriptLines.length - 1].timestamp
      : 0
    setScriptLines([
      ...scriptLines,
      { id: Date.now().toString(), text: '', timestamp: lastTimestamp + 5 }
    ])
  }

  const removeScriptLine = (id: string) => {
    if (scriptLines.length > 1) {
      setScriptLines(scriptLines.filter(line => line.id !== id))
    }
  }

  const updateScriptLine = (id: string, text: string) => {
    setScriptLines(scriptLines.map(line =>
      line.id === id ? { ...line, text } : line
    ))
  }

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error('Please enter an avatar name')
      return
    }

    const hasContent = scriptLines.some(line => line.text.trim())
    if (!hasContent) {
      toast.error('Please add at least one script line')
      return
    }

    setIsCreating(true)

    setIsCreating(false)
    toast.success('Avatar created successfully!')
    setName('')
    setScriptLines([{ id: '1', text: '', timestamp: 0 }])
    onAvatarCreate()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Avatar Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AVATAR_STYLES.map((avatarStyle) => (
            <Card
              key={avatarStyle.style}
              className={`cursor-pointer transition-all ${
                style === avatarStyle.style ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setStyle(avatarStyle.style)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <User className="h-6 w-6" />
                  {style === avatarStyle.style && (
                    <Badge variant="default">Selected</Badge>
                  )}
                </div>
                <CardTitle>{avatarStyle.label}</CardTitle>
                <CardDescription>{avatarStyle.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {Object.entries(avatarStyle.features).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{key}:</span>
                      <Badge variant="outline">{value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Avatar Details</CardTitle>
          <CardDescription>
            Configure virtual guide with voice profile and script
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="avatar-name">Avatar Name</Label>
            <Input
              id="avatar-name"
              placeholder="e.g., Guide Assistant"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="style-select">Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger id="style-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AVATAR_STYLES.map((s) => (
                  <SelectItem key={s.style} value={s.style}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Script & Dialogue</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addScriptLine}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Line
              </Button>
            </div>

            <div className="space-y-3">
              {scriptLines.map((line, index) => (
                <div key={line.id} className="flex gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {line.timestamp}s
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Line {index + 1}
                      </span>
                    </div>
                    <Textarea
                      placeholder="Enter dialogue text..."
                      value={line.text}
                      onChange={(e) => updateScriptLine(line.id, e.target.value)}
                      rows={2}
                    />
                  </div>
                  {scriptLines.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeScriptLine(line.id)}
                      className="mt-7"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Mic className="h-4 w-4" />
              <h4 className="font-medium text-sm">Voice Profile</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Voice synthesis and lip-sync will be automatically generated based on the script
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Voice Type:</span>
                <Badge variant="outline">Natural AI</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lip Sync:</span>
                <Badge variant="outline">Automatic</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Language:</span>
                <Badge variant="outline">English</Badge>
              </div>
            </div>
          </div>

          {selectedStyle && (
            <div className="p-4 border rounded-lg bg-primary/5">
              <h4 className="font-medium text-sm mb-2">Rendering Features</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {Object.entries(selectedStyle.features).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-muted-foreground capitalize">{key}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleCreate}
            disabled={!name.trim() || isCreating}
            className="w-full"
          >
            <User className="mr-2 h-4 w-4" />
            {isCreating ? 'Creating...' : 'Create Avatar'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
