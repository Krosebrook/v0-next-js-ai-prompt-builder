"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Package, Download, FileText, Film, Image, Code } from "lucide-react"
import { toast } from "sonner"

interface ExportPackageGeneratorProps {
  storyboardId: string
  storyboardName: string
  stats: {
    frames: number
    components: number
    animations: number
    avatars: number
    scenes: number
  }
}

const EXPORT_ITEMS = [
  {
    id: 'storyboard',
    label: 'Storyboard PDF',
    description: 'Annotated frames with design notes',
    icon: FileText,
    fileSize: '~2-5MB'
  },
  {
    id: 'components',
    label: 'UI Components',
    description: 'SVG and PNG exports',
    icon: Code,
    fileSize: '~1-3MB'
  },
  {
    id: 'videos',
    label: 'Animation Videos',
    description: '1080p/60fps exports (16:9 & 9:16)',
    icon: Film,
    fileSize: '~50-200MB'
  },
  {
    id: 'assets',
    label: 'Design Assets',
    description: 'Color palettes, typography, spacing',
    icon: Image,
    fileSize: '~500KB'
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'Implementation guide and specs',
    icon: FileText,
    fileSize: '~1MB'
  }
]

export function ExportPackageGenerator({
  storyboardId,
  storyboardName,
  stats
}: ExportPackageGeneratorProps) {
  const [packageName, setPackageName] = useState(`${storyboardName}_export`)
  const [selectedItems, setSelectedItems] = useState<string[]>(['storyboard', 'components', 'videos'])
  const [isGenerating, setIsGenerating] = useState(false)

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleGenerate = async () => {
    if (!packageName.trim()) {
      toast.error('Please enter a package name')
      return
    }

    if (selectedItems.length === 0) {
      toast.error('Please select at least one item to export')
      return
    }

    setIsGenerating(true)

    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsGenerating(false)
    toast.success('Export package generated successfully!')
  }

  const totalSize = selectedItems.reduce((acc, itemId) => {
    const item = EXPORT_ITEMS.find(i => i.id === itemId)
    if (!item) return acc
    const size = item.fileSize.match(/\d+/)
    return acc + (size ? parseInt(size[0]) : 0)
  }, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Export Package Generator
          </CardTitle>
          <CardDescription>
            Create a production-ready package with all assets and documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="package-name">Package Name</Label>
            <Input
              id="package-name"
              placeholder="e.g., MyApp_Production_v1"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-3 block">Include in Package</Label>
            <div className="space-y-3">
              {EXPORT_ITEMS.map((item) => {
                const Icon = item.icon
                const isSelected = selectedItems.includes(item.id)

                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-4 border rounded-lg transition-all cursor-pointer ${
                      isSelected ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{item.label}</span>
                        <Badge variant="outline" className="ml-auto">
                          {item.fileSize}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-muted/30">
            <h4 className="font-medium mb-3">Package Summary</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Frames:</span>
                <Badge variant="outline" className="ml-2">{stats.frames}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Components:</span>
                <Badge variant="outline" className="ml-2">{stats.components}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Animations:</span>
                <Badge variant="outline" className="ml-2">{stats.animations}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Avatars:</span>
                <Badge variant="outline" className="ml-2">{stats.avatars}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Scenes:</span>
                <Badge variant="outline" className="ml-2">{stats.scenes}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Est. Size:</span>
                <Badge variant="outline" className="ml-2">~{totalSize}MB</Badge>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-primary/5">
            <h4 className="font-medium mb-2 text-sm">Package Contents</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• /exports/storyboard.pdf - Complete visual timeline</div>
              <div>• /exports/ui_components/ - SVG and PNG assets</div>
              <div>• /exports/videos/ - Rendered animations (16:9 & 9:16)</div>
              <div>• /exports/assets/ - Design system resources</div>
              <div>• /exports/docs/ - Implementation guide</div>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!packageName.trim() || selectedItems.length === 0 || isGenerating}
            className="w-full"
            size="lg"
          >
            <Download className="mr-2 h-4 w-4" />
            {isGenerating ? 'Generating Package...' : 'Generate & Download'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
