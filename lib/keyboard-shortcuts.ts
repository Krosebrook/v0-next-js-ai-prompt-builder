export interface KeyboardShortcut {
  key: string
  ctrlOrCmd?: boolean
  shift?: boolean
  alt?: boolean
  callback: () => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void {
  if (typeof window === "undefined") return

  const handler = (event: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0
    
    for (const shortcut of shortcuts) {
      const ctrlOrCmdPressed = shortcut.ctrlOrCmd
        ? isMac
          ? event.metaKey
          : event.ctrlKey
        : true
      const shiftPressed = shortcut.shift ? event.shiftKey : !event.shiftKey
      const altPressed = shortcut.alt ? event.altKey : !event.altKey

      if (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        ctrlOrCmdPressed &&
        shiftPressed &&
        altPressed
      ) {
        event.preventDefault()
        shortcut.callback()
        break
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [shortcuts])
}
