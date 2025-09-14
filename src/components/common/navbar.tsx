"use client"

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubOutlined, LinkedinOutlined, BehanceOutlined, MediumOutlined, MenuOutlined } from '@ant-design/icons'
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className={`sticky top-5 max-w-6xl mx-auto z-50 bg-background/80 backdrop-blur-sm border-2 shadow-md shadow-[#1173E2]/30 px-6 ${mobileMenuOpen ? "rounded-xl" : "rounded-full"}`}    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          {/* Left: Name */}
          <div className="flex-1">
            <Link href="/" className="text-foreground text-xl font-bold">
              Sreejith Sreejayan
            </Link>
          </div>

          {/* Center: Social Icons (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
            <Link href="https://behance.net/thesreejith" target='_blank' className="text-muted-foreground hover:text-foreground rounded-xl shadow-sm border">
              <BehanceOutlined className="text-xl p-2" />
            </Link>
            <Link href="https://github.com/the-sreejith" target='_blank' className="text-muted-foreground hover:text-foreground rounded-xl shadow-sm border">
              <GithubOutlined className="text-xl p-2" />
            </Link>
            <Link href="https://linkedin.com/in/thesreejith" target='_blank' className="text-muted-foreground hover:text-foreground rounded-xl shadow-sm border">
              <LinkedinOutlined className="text-xl p-2" />
            </Link>
            <Link href="https://medium.com/@the-sreejith" target='_blank' className="text-muted-foreground hover:text-foreground rounded-xl shadow-sm border">
              <MediumOutlined className="text-xl p-2" />
            </Link>
          </div>

          {/* Right: CTA Button, Theme Toggle and Mobile Menu Toggle */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <ThemeToggle />
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <MenuOutlined className="text-lg" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="https://behance.net/thesreejith" className="block text-muted-foreground hover:text-foreground">
              Behance
            </Link>
            <Link href="https://github.com/the-sreejith" className="block text-muted-foreground hover:text-foreground">
              GitHub
            </Link>
            <Link href="https://linkedin.com/in/thesreejith" className="block text-muted-foreground hover:text-foreground">
              LinkedIn
            </Link>
            <Link href="https://medium.com/@the-sreejith" className="block text-muted-foreground hover:text-foreground">
              Medium
            </Link>
            <Button variant="outline" className="w-full" scrollTo='contact'>
              Contact Me
            </Button>
          </div>
        )}
      </div>
    </nav >
  )
}