"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon, LinkedinIcon, DribbbleIcon, Facebook, Twitter, Instagram, Code, Paintbrush, Lightbulb, CalendarDays, Rocket, Puzzle, Menu, FileCode2, Database, Server, Figma, Zap, Cloud } from "lucide-react"

import profile from "@/assets/profile-pic.jpg"
import SocialLogo from '@/components/socialLogo'

import ProjectsSection from '@/components/HomePage/ProjectsSection'
// import BlogSection from '@/components/HomePage/BlogSection'

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


export default function Home() {
    return (
        <div className="p-4 my-10">
            <div className="container mx-auto px-2 md:px-4 ">
                <h1 className="text-5xl font-bold text-white mb-8">Portfolio</h1>
                <h3 className=" text-gray-100 mb-8 md:w-2/5">that showcase my skills and experience in web development, including projects built with React, Next.js, Node.js, and more. Please filter through the projects</h3>
             
            </div>
            <div className="container mx-auto">
                <ProjectsSection />
            </div>
        </div>
    )
}