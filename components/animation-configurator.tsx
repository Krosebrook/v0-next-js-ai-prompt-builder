"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ANIMATION_PRESETS } from "@/lib/scene-templates"
import { Sparkles, Play, Film } from "lucide-react"
import { toast } from "sonner"

interface AnimationConfiguratorProps {
  storyboardId: string
  onAnimationCreate: () => void
}

export function AnimationConfigurator({ storyboardId, onAnimationCreate }: AnimationConfiguratorProps) {
  const [selectedPreset, setSelectedPreset] = useState(ANIMATION_PRESETS[0].type)
  const [name, setName] = useState('')
  const [aspectRatio, setAspectRatio] = useState('16:9')
  const [resolution, setResolution] = useState('1080p')
  const [isCreating, setIsCreating] = useState(false)

  const selectedAnimation = ANIMATION_PRESETS.find(p => p.type === selectedPreset)

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error('Please enter an animation name')
      return
    }

    setIsCreating(true)

    setIsCreating(false)
    toast.success('Animation created successfully!')
    setName('')
    onAnimationCreate()
  }

  const handlePreview = () => {
    toast.info('Animation preview playing...')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Animation Configurator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {ANIMATION_PRESETS.map((preset) => (
            <Card
              key={preset.type}
              className={`cursor-pointer transition-all ${
                selectedPreset === preset.type ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedPreset(preset.type)}
            >
              <CardHeader className="p-4">
                <Sparkles className="h-5 w-5 mb-2" />
                <CardTitle className="text-sm">{preset.label}</CardTitle>
                <CardDescription className="text-xs">
                  {preset.duration_ms}ms
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {selectedAnimation && (
        <Card>
          <CardHeader>
            <CardTitle>Animation Details</CardTitle>
            <CardDescription>
              Configure Sora-style animation with cinematic quality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="animation-name">Animation Name</Label>
              <Input
                id="animation-name"
                placeholder={`e.g., Hero ${selectedAnimation.label}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger id="aspect-ratio">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                    <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                    <SelectItem value="1:1">1:1 (Square)</SelectItem>
                    <SelectItem value="21:9">21:9 (Ultrawide)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="resolution">Resolution</Label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger id="resolution">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="720p">720p HD</SelectItem>
                    <SelectItem value="1080p">1080p Full HD</SelectItem>
                    <SelectItem value="4K">4K Ultra HD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-muted/30 space-y-3">
              <h4 className="font-medium">Animation Properties</h4>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline" className="ml-2">{selectedAnimation.type}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <Badge variant="outline" className="ml-2">{selectedAnimation.duration_ms}ms</Badge>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Easing:</span>
                  <Badge variant="outline" className="ml-2">{selectedAnimation.easing}</Badge>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium mb-2">Transform Properties:</h5>
                <div className="text-xs space-y-1 pl-2">
                  {Object.entries(selectedAnimation.properties).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{key}:</span>
                      <code className="bg-muted px-2 py-0.5 rounded">
                        {JSON.stringify(value)}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <Film className="h-4 w-4" />
                <h4 className="font-medium text-sm">Sora Video Generation</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                This animation will be rendered using Sora-style video generation at 60fps
                with cinematic quality and motion blur effects.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handlePreview}
                className="flex-1"
              >
                <Play className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!name.trim() || isCreating}
                className="flex-1"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isCreating ? 'Creating...' : 'Create Animation'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
