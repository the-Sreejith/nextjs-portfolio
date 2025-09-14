"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 overflow-hidden"
        disabled
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Sun className="h-4 w-4" />
        </div>
        <span className="sr-only">Loading theme...</span>
      </Button>
    )
  }

  const cycleTheme = () => {
    if (theme === "light" || resolvedTheme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (resolvedTheme === "dark") {
      return <Moon className="h-4 w-4" />
    }
    
    return <Sun className="h-4 w-4" />
  }

  const getLabel = () => {
    return resolvedTheme === "light" ? "Light" : "Dark"
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="relative h-9 w-9 overflow-hidden"
      title={`Current theme: ${getLabel()}. Click to cycle through themes.`}
    >
      <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
        {getIcon()}
      </div>
      <span className="sr-only">Toggle theme - Current: {getLabel()}</span>
    </Button>
  )
} 