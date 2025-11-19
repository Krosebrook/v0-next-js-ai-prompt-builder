"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { LayoutGrid, Star, Sparkles, User, History, Video } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CategorySidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  categoryCounts: Record<string, number>
  className?: string
}

const categories = [
  { id: "all", label: "All Prompts", icon: LayoutGrid },
  { id: "favorites", label: "Favorites", icon: Star },
  { id: "video", label: "Video (Sora)", icon: Video },
  { id: "frameworks", label: "Frameworks", icon: Sparkles },
  { id: "custom", label: "My Prompts", icon: User },
  { id: "recent", label: "Recently Used", icon: History },
]

export default function CategorySidebar({
  selectedCategory,
  onCategoryChange,
  categoryCounts,
  className,
}: CategorySidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon
              const count = categoryCounts[category.id] || 0
              
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => onCategoryChange(category.id)}
                >
                  <span className="flex items-center">
                    <Icon className="mr-2 h-4 w-4" />
                    {category.label}
                  </span>
                  <Badge variant="outline" className="ml-auto">
                    {count}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
