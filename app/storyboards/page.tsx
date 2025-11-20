"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Film, Palette, Sparkles } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"
import { Skeleton } from "@/components/ui/skeleton"

type Storyboard = Database['public']['Tables']['storyboards']['Row']

export default function StoryboardsPage() {
  const router = useRouter()
  const [storyboards, setStoryboards] = useState<Storyboard[]>([])
  const [filteredStoryboards, setFilteredStoryboards] = useState<Storyboard[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStoryboards()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      setFilteredStoryboards(
        storyboards.filter((sb) =>
          sb.name.toLowerCase().includes(query) ||
          sb.description?.toLowerCase().includes(query)
        )
      )
    } else {
      setFilteredStoryboards(storyboards)
    }
  }, [searchQuery, storyboards])

  const loadStoryboards = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('storyboards')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error loading storyboards:', error)
    } else {
      setStoryboards(data || [])
    }
    setIsLoading(false)
  }

  const handleCreateStoryboard = () => {
    router.push('/storyboards/create')
  }

  const handleViewStoryboard = (id: string) => {
    router.push(`/storyboards/${id}`)
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

  const getStyleIcon = (variant: string) => {
    switch (variant) {
      case 'cinematic':
        return <Film className="h-4 w-4" />
      case 'futuristic':
        return <Sparkles className="h-4 w-4" />
      default:
        return <Palette className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">App Experience Studio</h1>
          <p className="text-muted-foreground">
            Create stunning multi-platform app concepts with cinematic animation
          </p>
        </div>
        <Button onClick={handleCreateStoryboard} size="lg">
          <PlusCircle className="mr-2 h-5 w-5" />
          New Storyboard
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search storyboards..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredStoryboards.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-muted rounded-full">
              <Film className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {storyboards.length === 0 ? "No storyboards yet" : "No matches found"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {storyboards.length === 0
                  ? "Create your first storyboard to start building amazing app experiences"
                  : "Try adjusting your search query"}
              </p>
              {storyboards.length === 0 && (
                <Button onClick={handleCreateStoryboard}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Storyboard
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStoryboards.map((storyboard) => (
            <Card
              key={storyboard.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleViewStoryboard(storyboard.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{storyboard.name}</CardTitle>
                  {getStyleIcon(storyboard.style_variant)}
                </div>
                <CardDescription className="line-clamp-2">
                  {storyboard.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getStatusColor(storyboard.status)}>
                    {storyboard.status.replace('_', ' ')}
                  </Badge>
                  <Badge variant="outline">{storyboard.style_variant}</Badge>
                  <Badge variant="outline">{storyboard.theme_mode}</Badge>
                </div>
                <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                  {storyboard.platform_targets.map((platform) => (
                    <span key={platform} className="px-2 py-1 bg-muted rounded">
                      {platform}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Updated {new Date(storyboard.updated_at).toLocaleDateString()}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
