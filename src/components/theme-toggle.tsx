"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="h-9 w-9 border-2 border-black dark:border-white flex items-center justify-center"
        disabled
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Loading theme...</span>
      </button>
    )
  }

  const cycleTheme = () => {
    if (theme === "light" || resolvedTheme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  return (
    <button
      onClick={cycleTheme}
      className="h-9 w-9 border-2 border-black dark:border-white flex items-center justify-center hover:bg-[#1173E2] hover:text-white hover:border-[#1173E2] transition-all"
      title={`Current theme: ${resolvedTheme}. Click to toggle.`}
    >
      {resolvedTheme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
