"use client"

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubOutlined, LinkedinOutlined, BehanceOutlined, MediumOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-4 max-w-6xl mx-auto z-50 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] px-2">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center">
          {/* Left: Name */}
          <div className="flex-1">
            <Link href="/" className="text-foreground text-xl uppercase tracking-widest hover:text-[#1173E2] transition-colors">
              Sreejith.exe
            </Link>
          </div>

          {/* Center: Social Icons (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
            <Link href="https://behance.net/thesreejith" target='_blank' className="text-muted-foreground hover:text-[#1173E2] border-2 border-black dark:border-white hover:bg-[#1173E2] hover:text-white transition-all">
              <BehanceOutlined className="text-lg p-1.5" />
            </Link>
            <Link href="https://github.com/the-sreejith" target='_blank' className="text-muted-foreground hover:text-[#1173E2] border-2 border-black dark:border-white hover:bg-[#1173E2] hover:text-white transition-all">
              <GithubOutlined className="text-lg p-1.5" />
            </Link>
            <Link href="https://linkedin.com/in/thesreejith" target='_blank' className="text-muted-foreground hover:text-[#1173E2] border-2 border-black dark:border-white hover:bg-[#1173E2] hover:text-white transition-all">
              <LinkedinOutlined className="text-lg p-1.5" />
            </Link>
            <Link href="https://medium.com/@the-sreejith" target='_blank' className="text-muted-foreground hover:text-[#1173E2] border-2 border-black dark:border-white hover:bg-[#1173E2] hover:text-white transition-all">
              <MediumOutlined className="text-lg p-1.5" />
            </Link>
          </div>

          {/* Right: Theme Toggle and Mobile Menu Toggle */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <ThemeToggle />
            <button
              className="md:hidden text-foreground border-2 border-black dark:border-white p-1.5 hover:bg-[#1173E2] hover:text-white transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <CloseOutlined className="text-lg" /> : <MenuOutlined className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t-4 border-black dark:border-white pt-4 space-y-2">
            <Link href="https://behance.net/thesreejith" className="block text-muted-foreground hover:text-[#1173E2] uppercase tracking-wider py-1">
              {'>'} Behance
            </Link>
            <Link href="https://github.com/the-sreejith" className="block text-muted-foreground hover:text-[#1173E2] uppercase tracking-wider py-1">
              {'>'} GitHub
            </Link>
            <Link href="https://linkedin.com/in/thesreejith" className="block text-muted-foreground hover:text-[#1173E2] uppercase tracking-wider py-1">
              {'>'} LinkedIn
            </Link>
            <Link href="https://medium.com/@the-sreejith" className="block text-muted-foreground hover:text-[#1173E2] uppercase tracking-wider py-1">
              {'>'} Medium
            </Link>
            <Button variant="outline" className="w-full border-2 border-black dark:border-white uppercase tracking-wider mt-2" scrollTo='contact'>
              Contact Me
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
