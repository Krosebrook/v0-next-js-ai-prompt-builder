"use client"

import { Badge } from "@/components/ui/badge"

interface TagFilterProps {
  allTags: string[]
  selectedTags: string[]
  onTagSelect: (tag: string) => void
}

export default function TagFilter({ allTags, selectedTags, onTagSelect }: TagFilterProps) {
  if (allTags.length === 0) {
    return <div className="text-sm text-muted-foreground">No tags available</div>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onTagSelect(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
