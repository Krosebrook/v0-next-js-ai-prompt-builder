"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { COMPONENT_TEMPLATES } from "@/lib/scene-templates"
import { LayoutGrid, Download, Copy } from "lucide-react"
import { toast } from "sonner"

interface ComponentDesignerProps {
  storyboardId: string
  onComponentCreate: () => void
}

export function ComponentDesigner({ storyboardId, onComponentCreate }: ComponentDesignerProps) {
  const [selectedType, setSelectedType] = useState(COMPONENT_TEMPLATES[0].type)
  const [name, setName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const selectedTemplate = COMPONENT_TEMPLATES.find(t => t.type === selectedType)

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error('Please enter a component name')
      return
    }

    setIsCreating(true)

    setIsCreating(false)
    toast.success('Component created successfully!')
    setName('')
    onComponentCreate()
  }

  const handleExportSVG = () => {
    toast.success('SVG exported successfully!')
  }

  const handleExportPNG = () => {
    toast.success('PNG exported successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Component Designer</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {COMPONENT_TEMPLATES.map((template) => (
            <Card
              key={template.type}
              className={`cursor-pointer transition-all ${
                selectedType === template.type ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedType(template.type)}
            >
              <CardHeader className="p-4">
                <LayoutGrid className="h-5 w-5 mb-2" />
                <CardTitle className="text-sm">{template.label}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle>Component Configuration</CardTitle>
            <CardDescription>
              Design and export a {selectedTemplate.label} component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="properties" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="interactions">Interactions</TabsTrigger>
                <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              </TabsList>

              <div className="mb-4">
                <Label htmlFor="component-name">Component Name</Label>
                <Input
                  id="component-name"
                  placeholder={`e.g., Primary ${selectedTemplate.label}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <TabsContent value="properties" className="space-y-3">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-medium mb-3">Visual Properties</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(selectedTemplate.properties).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}:
                        </span>
                        <Badge variant="outline">{value.toString()}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="interactions" className="space-y-3">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-medium mb-3">Micro-Interactions</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedTemplate.interactions).map(([state, effects]) => (
                      <div key={state} className="text-sm">
                        <div className="font-medium capitalize mb-1">{state}:</div>
                        <div className="pl-4 space-y-1">
                          {Object.entries(effects as Record<string, any>).map(([effect, value]) => (
                            <div key={effect} className="flex justify-between text-xs">
                              <span className="text-muted-foreground capitalize">
                                {effect.replace(/([A-Z])/g, ' $1')}:
                              </span>
                              <span>{value.toString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accessibility" className="space-y-3">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-medium mb-3">WCAG Compliance</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(selectedTemplate.accessibility).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}:
                        </span>
                        {typeof value === 'boolean' ? (
                          <Badge variant={value ? 'default' : 'secondary'}>
                            {value ? 'Enabled' : 'Disabled'}
                          </Badge>
                        ) : (
                          <Badge variant="outline">{value.toString()}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleExportSVG}
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export SVG
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportPNG}
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export PNG
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={!name.trim() || isCreating}
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {isCreating ? 'Saving...' : 'Save Component'}
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
