"use client"

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon, DribbbleIcon, XIcon, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-5 rounded-full max-w-6xl mx-auto z-50 bg-background/80 backdrop-blur-sm border-2 shadow-md shadow-[#1173E2]/30 px-6">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Name */}
          <Link href="/" className="text-foreground text-2xl font-bold">
            Sreejith Sreejayan
          </Link>

          {/* Center: Social Icons (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="https://behance.net/thesreejith" target='_blank' className="text-muted-foreground hover:text-foreground">
              Be
            </Link>
            <Link href="https://github.com/the-sreejith" target='_blank' className="text-muted-foreground hover:text-foreground">
              <GithubIcon className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com/in/thesreejith" target='_blank' className="text-muted-foreground hover:text-foreground">
              <LinkedinIcon className="h-5 w-5" />
            </Link>
            <Link href="https://dribbble.com/sreejith_sreejayan" target='_blank' className="text-muted-foreground hover:text-foreground">
              <DribbbleIcon className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/thesreejith_"
              target='_blank'
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Right: CTA Button, Theme Toggle and Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" className="hidden font-semibold md:inline-flex" scrollTo='footer'>
              Contact Me
            </Button>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="https://behance.net" className="block text-muted-foreground hover:text-foreground">
              Behance
            </Link>
            <Link href="https://github.com" className="block text-muted-foreground hover:text-foreground">
              GitHub
            </Link>
            <Link href="https://linkedin.com" className="block text-muted-foreground hover:text-foreground">
              LinkedIn
            </Link>
            <Link href="https://dribbble.com" className="block text-muted-foreground hover:text-foreground">
              Dribbble
            </Link>
            <Button variant="outline" className="w-full" scrollTo='contact'>
              Contact Me
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}