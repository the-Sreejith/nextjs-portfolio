

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


import ProjectsSection, { Project } from '@/components/HomePage/ProjectsSection'
import { BlogPost } from '@/types/BlogPost'
import BlogSection from '@/components/HomePage/BlogSection'

const siteurl = 'https://www.thesreejith.in/';

// Function to fetch projects from API
async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`https://www.thesreejith.in/api/projects`, {
      next: {
        revalidate: 3600 // Revalidate every hour
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

async function fetchBlogs(): Promise<BlogPost[]> {
  const response = await fetch(`https://www.thesreejith.in/api/blogs`, {
      cache: 'no-store' // or 'force-cache' based on your needs
  })
  const blogs = await response.json()

  return blogs.map((blog: BlogPost) => ({
    ...blog,
    publishedAt: new Date(blog.publishedAt)
}))
}



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
  const initialProjects = await fetchProjects()
  const blogPosts = await fetchBlogs()


  return (
    <div className="bg-zinc-950">
      <Navbar/>
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
            <ProjectsSection initialProjects={initialProjects} />
          </div>
        </div>

{/* TODO: Complete the blog section */}
        {/* Blog Section */}
        {/* <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-white">Latest Blog Posts</h2>
              <Button variant="outline">View All Posts</Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogSection blogPosts={blogPosts} />
            </div>
          </div>
        </section> */}

        {/* Contact Section */}
        <section className="w-full bg-zinc-950 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-zinc-400 text-lg uppercase tracking-wider">GET IN TOUCH</h3>
                  <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Let is make your brand brilliant!
                  </h2>
                  <p className="text-zinc-400 text-lg">
                    If you would like to work with me or just want to get in touch, I&apos;d love to hear from you!
                  </p>
                </div>
                <Link
                  href="mailto:ssjksreejith@gmail.com"
                  className="text-[#00BFFF] text-2xl md:text-3xl font-bold hover:underline inline-block"
                >
                  SSJKSREEJITH@GMAIL.COM
                </Link>
                <SocialLogo/>
              </div>
              <div className="space-y-4">
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                      placeholder="Name"
                    />
                    <Input
                      className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <Input
                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                    placeholder="Subject"
                  />
                  <Textarea
                    className="min-h-[150px] bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                    placeholder="Message"
                  />
                  <Button
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white border-l-4  border-[#00BFFF]"
                    size="lg"
                  >
                    SEND A MESSAGE
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
// Metadata for the page
export const metadata = {
  title: 'My Projects | Sreejith Sreejayan',
  description: 'Explore my portfolio of web development, mobile app, and UI/UX design projects.',
}