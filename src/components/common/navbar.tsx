"use client"

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubOutlined, LinkedinOutlined, BehanceOutlined, XOutlined, MediumOutlined, MenuOutlined } from '@ant-design/icons'
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className={`sticky top-5 max-w-6xl mx-auto z-50 bg-background/80 backdrop-blur-sm border-2 shadow-md shadow-[#1173E2]/30 px-6 ${mobileMenuOpen ? "rounded-xl" : "rounded-full"}`}    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Name */}
          <Link href="/" className="text-foreground text-2xl font-bold">
            Sreejith Sreejayan
          </Link>

          {/* Center: Social Icons (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="https://behance.net/thesreejith" target='_blank' className="text-muted-foreground hover:text-foreground">
              <BehanceOutlined className="text-2xl rounded-xl shadow-sm border p-2" />
            </Link>
            <Link href="https://github.com/the-sreejith" target='_blank' className="text-muted-foreground hover:text-foreground">
              <GithubOutlined className="text-2xl rounded-xl shadow-sm border p-2" />
            </Link>
            <Link href="https://linkedin.com/in/thesreejith" target='_blank' className="text-muted-foreground hover:text-foreground">
              <LinkedinOutlined className="text-2xl rounded-xl shadow-sm border p-2" />
            </Link>
            <Link href="https://medium.com/@the-sreejith" target='_blank' className="text-muted-foreground hover:text-foreground">
              <MediumOutlined className="text-2xl rounded-xl shadow-sm border p-2" />
            </Link>
            <Link
              href="https://x.com/thesreejith_"
              target='_blank'
              className="text-muted-foreground hover:text-foreground"
            >
              <XOutlined className="text-2xl rounded-xl shadow-sm border p-2" />
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