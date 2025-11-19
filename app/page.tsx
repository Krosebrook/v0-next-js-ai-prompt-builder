"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Upload, X } from 'lucide-react'
import PromptCard from "@/components/prompt-card"
import TagFilter from "@/components/tag-filter"
import CategorySidebar from "@/components/category-sidebar"
import SortDropdown, { type SortOption } from "@/components/sort-dropdown"
import ResetFrameworksDialog from "@/components/reset-frameworks-dialog"
import BulkOperationsMenu from "@/components/bulk-operations-menu"
import { storage } from "@/lib/storage"
import type { Prompt } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { usePromptExport } from "@/hooks/use-prompt-export"
import { seedPromptFrameworks } from "@/lib/seed-frameworks"
import { useDebounce } from "@/hooks/use-debounce"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const router = useRouter()
  const { importPrompt } = usePromptExport()
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOption, setSortOption] = useState<SortOption>("updated-desc")
  const [allTags, setAllTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const debouncedSearch = useDebounce(searchQuery, 300)

  const loadPrompts = async () => {
    setIsLoading(true)
    const loadedPrompts = await storage.getPrompts()
    setPrompts(loadedPrompts)

    // Extract all unique tags
    const tags = loadedPrompts.flatMap((p) => p.tags)
    setAllTags([...new Set(tags)])
    setIsLoading(false)
  }

  useEffect(() => {
    const initializeApp = async () => {
      await seedPromptFrameworks()
      await loadPrompts()
    }
    initializeApp()
  }, [])

  const categoryCounts = useMemo(() => {
    return {
      all: prompts.length,
      favorites: prompts.filter((p) => p.isFavorite).length,
      video: prompts.filter((p) => p.category === "video").length,
      frameworks: prompts.filter((p) => p.isFramework).length,
      custom: prompts.filter((p) => !p.isFramework).length,
      recent: prompts.slice(0, 10).length,
    }
  }, [prompts])

  useEffect(() => {
    let result = [...prompts]

    // Filter by category
    if (selectedCategory === "favorites") {
      result = result.filter((p) => p.isFavorite)
    } else if (selectedCategory === "video") {
      result = result.filter((p) => p.category === "video")
    } else if (selectedCategory === "frameworks") {
      result = result.filter((p) => p.isFramework)
    } else if (selectedCategory === "custom") {
      result = result.filter((p) => !p.isFramework)
    } else if (selectedCategory === "recent") {
      result = result.slice(0, 10)
    }

    // Filter by search query
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      result = result.filter(
        (prompt) =>
          prompt.name.toLowerCase().includes(query) ||
          prompt.template.toLowerCase().includes(query) ||
          prompt.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      result = result.filter((prompt) =>
        selectedTags.every((tag) => prompt.tags.includes(tag))
      )
    }

    // Sort results
    switch (sortOption) {
      case "updated-desc":
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        break
      case "updated-asc":
        result.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "created-desc":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "created-asc":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
    }

    setFilteredPrompts(result)
  }, [debouncedSearch, selectedTags, selectedCategory, sortOption, prompts])

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setSelectedCategory("all")
  }

  const handleCreatePrompt = () => {
    router.push("/create")
  }

  const handleImportPrompt = async (prompt: Prompt) => {
    await storage.savePrompt(prompt)
    await loadPrompts()
  }

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedCategory !== "all"

  if (isLoading) {
    return (
      <div className="flex h-screen">
        {/* Sidebar skeleton */}
        <aside className="w-64 border-r bg-muted/10 p-4 hidden lg:block">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </aside>

        {/* Main content skeleton */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-8 px-4">
            <Skeleton className="h-12 w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 border-r bg-muted/10 hidden lg:block overflow-auto">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryCounts={categoryCounts}
        />
      </aside>

      {/* Main content area */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-balance">AI Prompt Builder</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage reusable AI prompt templates
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <BulkOperationsMenu onRefresh={loadPrompts} />
              <ResetFrameworksDialog onReset={loadPrompts} />
              <Button variant="outline" onClick={() => importPrompt(handleImportPrompt)}>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button onClick={handleCreatePrompt}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Prompt
              </Button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search prompts by name, content, or tags..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <SortDropdown value={sortOption} onChange={setSortOption} />
            </div>

            {/* Tag filter */}
            {allTags.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-medium">Filter by tags:</h2>
                  {selectedTags.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTags([])}
                      className="h-auto py-1"
                    >
                      Clear tags
                    </Button>
                  )}
                </div>
                <TagFilter
                  allTags={allTags}
                  selectedTags={selectedTags}
                  onTagSelect={handleTagSelect}
                />
              </div>
            )}

            {/* Active filters display */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("all")}>
                    {selectedCategory} <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                    Search: {searchQuery} <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-auto py-1">
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredPrompts.length} of {prompts.length} prompts
          </div>

          {/* Prompt grid */}
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <h3 className="text-xl font-medium mb-2">No prompts found</h3>
              <p className="text-muted-foreground mb-4">
                {prompts.length === 0
                  ? "Create your first prompt to get started"
                  : "Try adjusting your search or filters"}
              </p>
              {prompts.length === 0 ? (
                <Button onClick={handleCreatePrompt}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Prompt
                </Button>
              ) : (
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} onUpdate={loadPrompts} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
