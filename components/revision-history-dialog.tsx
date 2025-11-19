"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { History, Undo2 } from 'lucide-react'
import { useRevisionHistory } from "@/hooks/use-revision-history"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface RevisionHistoryDialogProps {
  promptId: string
  promptName: string
  onRestore?: () => void
}

export default function RevisionHistoryDialog({
  promptId,
  promptName,
  onRestore,
}: RevisionHistoryDialogProps) {
  const { revisions, isLoading, restoreRevision } = useRevisionHistory(promptId)

  const handleRestore = async (revisionId: string, version: number) => {
    const restored = await restoreRevision(revisionId)
    if (restored) {
      toast({
        title: "Revision restored",
        description: `Restored to version ${version}`,
      })
      onRestore?.()
    } else {
      toast({
        title: "Error",
        description: "Failed to restore revision",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="h-4 w-4 mr-2" />
          History ({revisions.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Revision History</DialogTitle>
          <DialogDescription>
            View and restore previous versions of "{promptName}"
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading history...
            </div>
          ) : revisions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No revision history available
            </div>
          ) : (
            <div className="space-y-4">
              {revisions.map((revision) => (
                <div
                  key={revision.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">v{revision.version}</Badge>
                        <span className="font-medium">{revision.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(revision.timestamp).toLocaleString()}
                      </p>
                      {revision.changeDescription && (
                        <p className="text-sm italic">"{revision.changeDescription}"</p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRestore(revision.id, revision.version)}
                    >
                      <Undo2 className="h-4 w-4 mr-1" />
                      Restore
                    </Button>
                  </div>
                  <div className="text-sm bg-muted p-2 rounded font-mono overflow-x-auto">
                    {revision.template.slice(0, 200)}
                    {revision.template.length > 200 && "..."}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
