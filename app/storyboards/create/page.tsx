"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Sparkles } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

const PLATFORMS = [
  { id: 'desktop', label: 'Desktop' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'tablet', label: 'Tablet' }
]

const STYLE_VARIANTS = [
  { value: 'minimalist', label: 'Minimalist Flat', description: 'Clean, simple design with flat colors' },
  { value: 'cinematic', label: 'Cinematic Realism', description: 'Rich, photorealistic visual style' },
  { value: 'futuristic', label: 'Futuristic Neon', description: 'Bold, glowing neon aesthetics' }
]

const THEME_MODES = [
  { value: 'light', label: 'Light Mode' },
  { value: 'dark', label: 'Dark Mode' },
  { value: 'both', label: 'Both Themes' }
]

export default function CreateStoryboardPage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    platforms: ['desktop', 'mobile', 'tablet'],
    styleVariant: 'minimalist',
    themeMode: 'both'
  })

  const handlePlatformToggle = (platformId: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }))
  }

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a storyboard name')
      return
    }

    if (formData.platforms.length === 0) {
      toast.error('Please select at least one platform')
      return
    }

    setIsCreating(true)

    try {
      const { data, error } = await supabase
        .from('storyboards')
        .insert({
          name: formData.name,
          description: formData.description || null,
          platform_targets: formData.platforms,
          style_variant: formData.styleVariant,
          theme_mode: formData.themeMode,
          status: 'draft',
          color_palette: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      toast.success('Storyboard created successfully!')
      router.push(`/storyboards/${data.id}`)
    } catch (error) {
      console.error('Error creating storyboard:', error)
      toast.error('Failed to create storyboard')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Create New Storyboard</h1>
        </div>
        <p className="text-muted-foreground">
          Design a complete multi-platform app experience with workflow visualization
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>
              Basic details about your app experience project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                placeholder="e.g., E-Commerce Mobile App"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your app concept, target audience, and key features..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Targets</CardTitle>
            <CardDescription>
              Select the platforms you want to design for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {PLATFORMS.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform.id}
                    checked={formData.platforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                  />
                  <Label
                    htmlFor={platform.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {platform.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visual Style</CardTitle>
            <CardDescription>
              Choose the design aesthetic for your app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="style">Style Variant</Label>
              <Select
                value={formData.styleVariant}
                onValueChange={(value) => setFormData({ ...formData, styleVariant: value })}
              >
                <SelectTrigger id="style">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STYLE_VARIANTS.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      <div>
                        <div className="font-medium">{style.label}</div>
                        <div className="text-xs text-muted-foreground">{style.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="theme">Theme Mode</Label>
              <Select
                value={formData.themeMode}
                onValueChange={(value) => setFormData({ ...formData, themeMode: value })}
              >
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {THEME_MODES.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Storyboard'}
          </Button>
        </div>
      </div>
    </div>
  )
}
