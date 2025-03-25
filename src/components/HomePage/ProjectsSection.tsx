"use client"

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Project } from '@/types/Project'
import CustomCursor from '@/components/ui/CustomCursor'

// Project data
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Pregsee",
    badge: "Flutter",
    description: "Video Playing, Usertracking, Fully Fledged Cross Platform Mobile App",
    image: "/images/projects/mindspace.jpg",
    externalLink: "https://github.com/the-Sreejith/pregsee",
    size: "large" // Spans 2 columns
  },
  {
    id: 2,
    title: "Landing Page",
    badge: "NextJs",
    description: "Landing page created in NextJs",
    image: "/images/projects/ecotrack.jpg",
    externalLink: "https://ecotrack-app.com",
    size: "small" // Square, spans 1 column
  },
  {
    id: 3,
    title: "Ecommerce",
    badge: "UX/UI Design",
    description: "Complete wireframe of Ecommerce app both supplier and custommer",
    image: "/images/projects/nexusvault.jpg",
    externalLink: "#",
    size: "small" // Square, spans 1 column
  },
  {
    id: 4,
    title: "XDLinx.space",
    badge: "Web Application",
    description: "Website for XDLinx satalite Company",
    image: "/images/projects/dataviz.jpg",
    externalLink: "https://xdlinx.space",
    size: "large" // Spans 2 columns, but shorter height
  }
];

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Helper function to determine the aspect ratio based on project size
  const getAspectRatio = (size?: string) => {
    switch(size) {
      case "large": return "aspect-[16/9]";
      case "medium": return "aspect-[4/3]";
      case "small": return "aspect-square";
      default: return "aspect-[4/3]";
    }
  };

  return (
    <div className="py-20 bg-background relative">
      {/* Custom Cursor */}
      <CustomCursor hoveredProject={hoveredProject} />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium">Featured Projects</span>
          </div>
          {/* <h2 className="text-4xl md:text-5xl font-bold mb-4">My Recent Work</h2> */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My Recent{" "}
            <span className="text-[#1173E2]">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover my latest projects showcasing creative problem-solving and technical expertise
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 auto-rows-auto">
          {PROJECTS.map((project) => {
            // Determine grid column span based on project size
            let colSpan = "md:col-span-3 lg:col-span-2";
            if (project.size === "large") colSpan = "md:col-span-3 lg:col-span-4";
            if (project.size === "medium") colSpan = "md:col-span-3 lg:col-span-3";
            
            return (
              <Link
                key={project.id}
                href={project.externalLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-lg ${colSpan}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`relative w-full h-full overflow-hidden ${getAspectRatio(project.size)}`}>
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gray-900/20 z-10 transition-opacity duration-300 group-hover:opacity-50" />
                  
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white rounded-full mb-2">
                        {project.badge}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {project.title}
                        <span className="text-lg ml-1 align-super">™</span>
                      </h3>
                    </div>
                    
                    <div>
                      <p className="text-white/90 text-sm md:text-base mb-4">
                        {project.description}
                      </p>

                      {/* View Project Pill */}
                      <div className="flex items-center">
                        <div 
                          className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-full text-sm font-medium transform transition-all duration-300 group-hover:pl-6"
                        >
                          <span>View Project</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Trust Indicators */}
        {/* <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
              />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Trusted by 5,000+ innovators worldwide
          </p>
        </div> */}
      </div>
    </div>
  )
}