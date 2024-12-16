

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon, LinkedinIcon, DribbbleIcon, Facebook, Twitter, Instagram, Code, Paintbrush, Lightbulb, CalendarDays, Rocket, Puzzle, Menu, FileCode2, Database, Server, Figma, Zap, Cloud } from "lucide-react"

import profile from "@/assets/profile-pic.jpg"
import Navbar from '@/components/common/navbar'
import SocialLogo from '@/components/socialLogo'

import ProjectsSection from '@/components/HomePage/ProjectsSection'
// import BlogSection from '@/components/HomePage/BlogSection'
import ContactSection from "@/components/HomePage/ContactSection"


const skills = [
  { name: "React.js", icon: <FileCode2 className="h-8 w-8" /> },
  { name: "Next.js", icon: <Zap className="h-8 w-8" /> },
  { name: "Node.js", icon: <Server className="h-8 w-8" /> },
  { name: "Flutter", icon: <Rocket className="h-8 w-8" /> },
  { name: "Figma", icon: <Figma className="h-8 w-8" /> },
  { name: "Firebase", icon: <Zap className="h-8 w-8" /> },
  { name: "AWS", icon: <Cloud className="h-8 w-8" /> },
  { name: "HTML/CSS", icon: <Code className="h-8 w-8" /> },
  { name: "JavaScript", icon: <FileCode2 className="h-8 w-8" /> },
  { name: "TypeScript", icon: <FileCode2 className="h-8 w-8" /> },
  { name: "Git", icon: <GithubIcon className="h-8 w-8" /> },
  { name: "SQL", icon: <Database className="h-8 w-8" /> },
]


export default async function Home() {
  return (
    <div className="bg-zinc-950">
      <Navbar />
      <div className="container mx-auto ">

        {/* Hero Section */}
        <div className="container min-h-screen  px-4 py-12 flex items-center">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left Column - Image */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden w-[400px] px-8 py-10 mx-auto">
              <div>
                <Image
                  src={profile}
                  alt="Profile"
                  width={500}
                  height={500}
                  className="rounded-lg aspect-square object-cover"
                  priority
                />
              </div>
              <div className=" space-y-4 mt-8">
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <div className="h-2 w-2 bg-green-400 rounded-full font-semibold" />
                  <span>AVAILABLE FOR FREELANCE</span>
                </div>
                <h3 className="text-white text-xl font-bold">Sreejith Sreejayan</h3>
                <SocialLogo />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-12 pr-24">
              <h1 className="text-white text-4xl lg:text-6xl font-bold leading-tight">
                Hello, I'm{" "}
                <span className="text-blue-600">Sreejith Sreejayan</span>, Flutter/ React Developer and{" "}
                <span className="inline-block">UX / UI Designer</span> Based in Banglore.
              </h1>
              <Button variant="outline" className="h-14 px-8 font-bold text-lg">
                Contact Me
              </Button>
            </div>
          </div>

        </div>


        {/* Skills Section */}
        <section className="w-full bg-zinc-900 py-12 md:py-24 rounded-xl px-24">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h3 className="text-zinc-400 text-lg uppercase tracking-wider">MY SKILLS</h3>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Expertise in{" "}
                <span className="text-[#00BFFF]">Modern Technologies</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors">
                  <div className="text-[#00BFFF] mb-2">
                    {skill.icon}
                  </div>
                  <span className="text-white text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <div className="bg-zinc-950">
          <div className="container mx-auto">
            <ProjectsSection />
          </div>
        </div>
        
        
        {/* Blog Section */}
        {/* <div className="bg-zinc-950">
          <div className="container mx-auto">
            <BlogSection />
          </div>
        </div> */}

        
        <ContactSection />
      </div>
    </div>
  )
}
// Metadata for the page
export const metadata = {
  title: 'My Projects | Sreejith Sreejayan',
  description: 'Explore my portfolio of web development, mobile app, and UI/UX design projects.',
}