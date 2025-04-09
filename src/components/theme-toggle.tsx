"use client"

import * as React from "react"
import { RiMoonFill, RiSunFill } from "react-icons/ri"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 transition-colors dark:text-neutral-300 dark:hover:bg-neutral-800"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <RiMoonFill className="h-4 w-4" />
      ) : (
        <RiSunFill className="h-4 w-4" />
      )}
    </button>
  )
}
