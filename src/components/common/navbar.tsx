import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon, DribbbleIcon, Menu } from "lucide-react"



export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  

  return (
      <nav className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Left: Name */}
            <Link href="/" className="text-white text-2xl font-bold">
              the-sreejith
            </Link>

            {/* Center: Social Icons (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="https://behance.net/thesreejith" className="text-zinc-400 hover:text-white">
                Be
              </Link>
              <Link href="https://github.com/the-sreejith" className="text-zinc-400 hover:text-white">
                <GithubIcon className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com/in/thesreejith" className="text-zinc-400 hover:text-white">
                <LinkedinIcon className="h-5 w-5" />
              </Link>
              <Link href="https://dribbble.com/sreejith_sreejayan" className="text-zinc-400 hover:text-white">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
            </div>

            {/* Right: CTA Button and Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <Button variant="outline" className="hidden font-semibold md:inline-flex">
                Contact Me
              </Button>
              <button
                className="md:hidden text-white"
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
              <Link href="https://behance.net" className="block text-zinc-400 hover:text-white">
                Behance
              </Link>
              <Link href="https://github.com" className="block text-zinc-400 hover:text-white">
                GitHub
              </Link>
              <Link href="https://linkedin.com" className="block text-zinc-400 hover:text-white">
                LinkedIn
              </Link>
              <Link href="https://dribbble.com" className="block text-zinc-400 hover:text-white">
                Dribbble
              </Link>
              <Button variant="outline" className="w-full">
                Contact Me
              </Button>
            </div>
          )}
        </div>
      </nav>
  )
}