"use client"

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon, LinkedinIcon, DribbbleIcon, Facebook, Twitter, Instagram, Code, Paintbrush, Lightbulb, CalendarDays, Rocket, Puzzle } from "lucide-react"

import profile from "@/assets/profile-pic.jpg"
import Navbar from '@/components/common/navbar'
import SocialLogo from '@/components/socialLogo'


const projectsData = [
  { id: 1, title: "E-commerce Platform", category: "Web Development", image: "/placeholder.svg" },
  { id: 2, title: "Mobile Banking App", category: "Mobile App", image: "/placeholder.svg" },
  { id: 3, title: "AI-Powered Chatbot", category: "AI", image: "/placeholder.svg" },
  { id: 4, title: "Responsive Portfolio", category: "Web Design", image: "/placeholder.svg" },
  { id: 5, title: "Data Visualization Dashboard", category: "Data Science", image: "/placeholder.svg" },
  { id: 6, title: "Social Media Analytics Tool", category: "Web Development", image: "/placeholder.svg" },
]



export default function Home() {

  const [projects, setProjects] = useState(projectsData)
  const [filter, setFilter] = useState('All')

  const handleFilter = (category: string) => {
    setFilter(category)
    if (category === 'All') {
      setProjects(projectsData)
    } else {
      setProjects(projectsData.filter(project => project.category === category))
    }
  }

  return (
    <div className="bg-zinc-950">
      <Navbar></Navbar>
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
                  className="rounded-lg aspect-square object-cover rounded-lg"
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


        {/* Skills/Services Section */}
        <section className="w-full bg-zinc-900 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h3 className="text-zinc-400 text-lg uppercase tracking-wider">OUR SERVICES</h3>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Turn Information{" "}
                <span className="text-[#00BFFF]">Into Actionable</span>{" "}
                Insights
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-800/50 p-8 rounded-lg space-y-4">
                <div className="w-12 h-12">
                  <Paintbrush className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">UI / UX DESIGN</h3>
                <p className="text-zinc-400">
                  Transform user experiences with intuitive and engaging interface designs that prioritize usability and aesthetic appeal.
                </p>
              </div>
              <div className="bg-zinc-800/50 p-8 rounded-lg space-y-4">
                <div className="w-12 h-12">
                  <Code className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">WEB DEVELOPMENT</h3>
                <p className="text-zinc-400">
                  Build robust and scalable web applications using cutting-edge technologies and best practices in modern development.
                </p>
              </div>
              <div className="bg-zinc-800/50 p-8 rounded-lg space-y-4">
                <div className="w-12 h-12">
                  <Rocket className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">SEO / MARKETING</h3>
                <p className="text-zinc-400">
                  Boost your online presence with data-driven SEO strategies and comprehensive digital marketing solutions.
                </p>
              </div>
              <div className="bg-zinc-800/50 p-8 rounded-lg space-y-4">
                <div className="w-12 h-12">
                  <Puzzle className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">TECHNOLOGY SOLUTION</h3>
                <p className="text-zinc-400">
                  Implement tailored technology solutions that address your specific business challenges and drive growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
            <div className="flex justify-center space-x-4 mb-8">
              <Button
                onClick={() => handleFilter('All')}
                variant={filter === 'All' ? "default" : "outline"}
              >
                All
              </Button>
              <Button
                onClick={() => handleFilter('Web Development')}
                variant={filter === 'Web Development' ? "default" : "outline"}
              >
                Web Dev
              </Button>
              <Button
                onClick={() => handleFilter('Mobile App')}
                variant={filter === 'Mobile App' ? "default" : "outline"}
              >
                Mobile
              </Button>
              <Button
                onClick={() => handleFilter('AI')}
                variant={filter === 'AI' ? "default" : "outline"}
              >
                AI
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="rounded-t-lg object-cover h-48 w-full"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <CardDescription className="text-zinc-400">{project.category}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/project/${project.id}`}>
                      <Button variant="outline">View Project</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-white">Latest Blog Posts</h2>
              <Button variant="outline">View All Posts</Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <Image
                    src="/placeholder.svg"
                    alt="Blog post thumbnail"
                    width={400}
                    height={200}
                    className="rounded-t-lg object-cover h-48 w-full"
                  />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CalendarDays className="h-4 w-4" />
                    <span>Jan 20, 2024</span>
                  </div>
                  <CardTitle className="text-white">Understanding Modern Web Architecture</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Explore the fundamentals of modern web architecture and how it shapes the digital landscape.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/blog/1" className="text-[#00BFFF] hover:underline">
                    Read More →
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <Image
                    src="/placeholder.svg"
                    alt="Blog post thumbnail"
                    width={400}
                    height={200}
                    className="rounded-t-lg object-cover h-48 w-full"
                  />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CalendarDays className="h-4 w-4" />
                    <span>Jan 15, 2024</span>
                  </div>
                  <CardTitle className="text-white">The Future of UX Design</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Discover emerging trends and technologies shaping the future of user experience design.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/blog/2" className="text-[#00BFFF] hover:underline">
                    Read More →
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <Image
                    src="/placeholder.svg"
                    alt="Blog post thumbnail"
                    width={400}
                    height={200}
                    className="rounded-t-lg object-cover h-48 w-full"
                  />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CalendarDays className="h-4 w-4" />
                    <span>Jan 10, 2024</span>
                  </div>
                  <CardTitle className="text-white">Optimizing Website Performance</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Learn essential techniques for improving website speed and performance.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/blog/3" className="text-[#00BFFF] hover:underline">
                    Read More →
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

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
                    If you would like to work with us or just want to get in touch, we&apos;d love to hear from you!
                  </p>
                </div>
                <Link
                  href="tel:+18408412569"
                  className="text-[#00BFFF] text-2xl md:text-3xl font-bold hover:underline inline-block"
                >
                  +1 840 841 25 69
                </Link>
                <div className="flex gap-6">
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="Twitter">
                    <Twitter className="h-6 w-6" />
                  </Link>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="h-6 w-6" />
                  </Link>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                  </Link>
                </div>
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