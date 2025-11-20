"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Film,
  Palette,
  Sparkles,
  Package,
  User,
  Settings,
  LayoutGrid
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"
import { Skeleton } from "@/components/ui/skeleton"
import { SceneBuilder } from "@/components/scene-builder"
import { ComponentDesigner } from "@/components/component-designer"
import { AnimationConfigurator } from "@/components/animation-configurator"
import { AvatarConfigurator } from "@/components/avatar-configurator"
import { ExportPackageGenerator } from "@/components/export-package-generator"

type Storyboard = Database['public']['Tables']['storyboards']['Row']
type Frame = Database['public']['Tables']['storyboard_frames']['Row']
type UIComponent = Database['public']['Tables']['ui_components']['Row']
type Animation = Database['public']['Tables']['animations']['Row']
type Avatar = Database['public']['Tables']['avatars']['Row']
type Scene = Database['public']['Tables']['workflow_scenes']['Row']

export default function StoryboardDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [storyboard, setStoryboard] = useState<Storyboard | null>(null)
  const [frames, setFrames] = useState<Frame[]>([])
  const [components, setComponents] = useState<UIComponent[]>([])
  const [animations, setAnimations] = useState<Animation[]>([])
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [scenes, setScenes] = useState<Scene[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      loadStoryboardData()
    }
  }, [id])

  const loadStoryboardData = async () => {
    setIsLoading(true)

    const { data: sbData, error: sbError } = await supabase
      .from('storyboards')
      .select('*')
      .eq('id', id)
      .single()

    if (sbError) {
      console.error('Error loading storyboard:', sbError)
      setIsLoading(false)
      return
    }

    setStoryboard(sbData)

    const [framesRes, componentsRes, animationsRes, avatarsRes, scenesRes] = await Promise.all([
      supabase.from('storyboard_frames').select('*').eq('storyboard_id', id).order('scene_number'),
      supabase.from('ui_components').select('*').eq('storyboard_id', id),
      supabase.from('animations').select('*').eq('storyboard_id', id),
      supabase.from('avatars').select('*').eq('storyboard_id', id),
      supabase.from('workflow_scenes').select('*').eq('storyboard_id', id).order('scene_number')
    ])

    setFrames(framesRes.data || [])
    setComponents(componentsRes.data || [])
    setAnimations(animationsRes.data || [])
    setAvatars(avatarsRes.data || [])
    setScenes(scenesRes.data || [])
    setIsLoading(false)
  }

  const getStyleIcon = (variant: string) => {
    switch (variant) {
      case 'cinematic':
        return <Film className="h-5 w-5" />
      case 'futuristic':
        return <Sparkles className="h-5 w-5" />
      default:
        return <Palette className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-700 dark:text-green-400'
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <Skeleton className="h-10 w-32 mb-6" />
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    )
  }

  if (!storyboard) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold">Storyboard not found</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Storyboards
      </Button>

      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              {getStyleIcon(storyboard.style_variant)}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{storyboard.name}</h1>
              <p className="text-muted-foreground">{storyboard.description || 'No description'}</p>
            </div>
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className={getStatusColor(storyboard.status)}>
            {storyboard.status.replace('_', ' ')}
          </Badge>
          <Badge variant="outline">{storyboard.style_variant}</Badge>
          <Badge variant="outline">{storyboard.theme_mode}</Badge>
          {storyboard.platform_targets.map((platform) => (
            <Badge key={platform} variant="secondary">
              {platform}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scenes">Scenes ({scenes.length})</TabsTrigger>
          <TabsTrigger value="components">Components ({components.length})</TabsTrigger>
          <TabsTrigger value="animations">Animations ({animations.length})</TabsTrigger>
          <TabsTrigger value="avatars">Avatars ({avatars.length})</TabsTrigger>
          <TabsTrigger value="frames">Frames ({frames.length})</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Frames
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{frames.length}</div>
                <p className="text-sm text-muted-foreground">Storyboard frames</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5" />
                  Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{components.length}</div>
                <p className="text-sm text-muted-foreground">UI components designed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Animations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{animations.length}</div>
                <p className="text-sm text-muted-foreground">Animated transitions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Avatars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{avatars.length}</div>
                <p className="text-sm text-muted-foreground">Virtual avatars</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Scenes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{scenes.length}</div>
                <p className="text-sm text-muted-foreground">Workflow scenes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Export
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Generate Package</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="frames">
          <Card>
            <CardHeader>
              <CardTitle>Storyboard Frames</CardTitle>
              <CardDescription>
                Visual timeline of your app workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              {frames.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No frames yet. Create your first frame to start building.
                </div>
              ) : (
                <div className="space-y-4">
                  {frames.map((frame) => (
                    <div key={frame.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge>{frame.scene_number}</Badge>
                          <h3 className="font-semibold">{frame.title}</h3>
                        </div>
                        <Badge variant="outline">{frame.scene_type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{frame.description}</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Duration: {frame.duration_seconds}s
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components">
          <ComponentDesigner
            storyboardId={id}
            onComponentCreate={loadStoryboardData}
          />
          {components.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Existing Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {components.map((component) => (
                    <div key={component.id} className="p-4 border rounded-lg">
                      <Badge variant="secondary" className="mb-2">
                        {component.component_type}
                      </Badge>
                      <h3 className="font-semibold">{component.name}</h3>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="animations">
          <AnimationConfigurator
            storyboardId={id}
            onAnimationCreate={loadStoryboardData}
          />
          {animations.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Existing Animations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {animations.map((animation) => (
                    <div key={animation.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{animation.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {animation.animation_type} • {animation.duration_ms}ms • {animation.easing}
                          </p>
                        </div>
                        <Badge variant="outline">{animation.aspect_ratio}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="avatars">
          <AvatarConfigurator
            storyboardId={id}
            onAvatarCreate={loadStoryboardData}
          />
          {avatars.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Existing Avatars</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {avatars.map((avatar) => (
                    <div key={avatar.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{avatar.name}</h3>
                        <Badge variant="outline">{avatar.avatar_style}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="scenes">
          <SceneBuilder
            storyboardId={id}
            existingScenes={scenes.map(s => s.scene_number)}
            onSceneCreate={loadStoryboardData}
          />
          {scenes.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Existing Scenes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scenes.map((scene) => (
                    <div key={scene.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge>{scene.scene_number}</Badge>
                          <h3 className="font-semibold">{scene.title}</h3>
                        </div>
                        <Badge variant="outline">{scene.scene_type}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Duration: {scene.duration_seconds}s • Background: {scene.background_type}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="export">
          <ExportPackageGenerator
            storyboardId={id}
            storyboardName={storyboard.name}
            stats={{
              frames: frames.length,
              components: components.length,
              animations: animations.length,
              avatars: avatars.length,
              scenes: scenes.length
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
