"use client"

import { useState } from 'react'
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Pointer } from "@/components/magicui/pointer" 
import { motion, AnimatePresence } from "framer-motion" 
import { Project } from '@/types/Project' 
import ProjectDetailModal from '@/components/HomePage/ProjectDetailModal' 

// Project data
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Pregsee",
    badge: "Flutter",
    description: "Cross-platform mobile app with video playback and user tracking.",
    longDescription: "Pregsee is a comprehensive mobile application built with Flutter, offering seamless video playback and advanced user tracking features. Designed for cross-platform compatibility, it provides a rich user experience on both iOS and Android devices. This project involved complex state management, native API integrations, and a focus on performance optimization to deliver a fluid and responsive interface for pregnancy health monitoring.",
    image: "/images/projects/pregsee.jpg", 
    links: [
      { type: 'github', url: 'https://github.com/the-Sreejith/pregsee', label: 'View on GitHub' },
    ],
    size: "large",
    tags: ["Mobile App", "Flutter", "Dart", "User Tracking"]
  },
  {
    id: 2,
    title: "Flickwise website",
    badge: "Frontend",
    description: "Sleek landing page built with Great UI and UX design.",
    longDescription: "This project is a modern, responsive digital marketing and media production agency website with a sleek design and smooth animations.",
    image: "/images/projects/flickwise.png", 
    links: [
      { type: 'website', url: 'https://flickwise.in', label: 'View Live' }
    ],
    size: "small"
  },
  {
    id: 3,
    title: "E-commerce UX/UI",
    badge: "UX/UI Design",
    description: "Complete wireframes and prototypes for an e-commerce platform.",
    longDescription: "A comprehensive UX/UI design project for an e-commerce application, covering both customer-facing and supplier management interfaces. This involved user research, persona creation, journey mapping, wireframing, and high-fidelity prototyping using Figma. The focus was on creating an intuitive, accessible, and engaging shopping experience.",
    image: "/images/projects/hireflex.jpg",
    links: [
      { type: 'figma', url: '#', label: 'View Figma Designs' }, 
      { type: 'behance', url: '#', label: 'Behance Case Study' } 
    ],
    size: "small",
    tags: ["UX Design", "UI Design", "Figma", "Prototyping"]
  },
  {
    id: 4,
    title: "XDLinx.space",
    badge: "Web Application",
    description: "Official website for XDLinx, a satellite communications company.",
    longDescription: "Developed the official web presence for XDLinx, a company specializing in satellite communication solutions. The website was built to be informative, professional, and to clearly articulate the company's services and technological capabilities. Key features include responsive design, service showcases, and contact forms for inquiries.",
    image: "/images/projects/xdlinx.jpg", 
    links: [
      { type: 'website', url: 'https://xdlinx.space', label: 'Visit XDLinx.space' }
    ],
    size: "large",
    tags: ["Web Development", "Corporate Website", "Responsive Design"]
  }
];


export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null); 
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getAspectRatio = (size?: string) => {
    switch(size) {
      case "large": return "aspect-[16/9]";
      case "small": return "aspect-square";
      default: return "aspect-[16/9]"; 
    }
  };

  const getCustomPointerContent = () => {
    return (
      <motion.div
        className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-gray-200 dark:border-gray-700"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.95, 1, 0.95],
          opacity: 1,
          y: [0, -2, 0] 
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <span>View Details</span> 
        <motion.div
          animate={{ x: [0, 3, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
    );
  };

  const handleProjectCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <>
      <div className="py-20 bg-background relative">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Projects</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              My Recent{" "}
              <span className="text-[#1173E2]">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 auto-rows-[minmax(0,_1fr)]"> 
            {PROJECTS.map((project) => {
              let colSpan = "md:col-span-3 lg:col-span-2"; 
              if (project.size === "large") colSpan = "md:col-span-3 lg:col-span-4";

              return (
                <div 
                  key={project.id}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer ${colSpan} 
                              transition-all duration-300 hover:shadow-2xl focus-visible:outline-none 
                              focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
                              focus-visible:ring-offset-background`}
                  onClick={() => handleProjectCardClick(project)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  tabIndex={0} 
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleProjectCardClick(project);}}
                >
                  <div className={`relative w-full h-full overflow-hidden ${getAspectRatio(project.size)}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 
                                    opacity-80 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gray-900/20 z-10 
                                    transition-all duration-300 group-hover:bg-gray-900/60" />
                    
                    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content: Initially hidden, appears on hover */}
                    <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end
                                    opacity-0 group-hover:opacity-100 
                                    transform translate-y-4 group-hover:translate-y-0 
                                    transition-all duration-300 ease-out">
                      <div>
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-full mb-2 shadow-sm">
                          {project.badge}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 shadow-black [text-shadow:_0_1px_3px_var(--tw-shadow-color)]">
                          {project.title}
                        </h3>
                         <p className="text-white/80 text-sm md:text-base mb-0 line-clamp-2  shadow-black [text-shadow:_0_1px_2px_var(--tw-shadow-color)]">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  

                    {/* Custom "View Details" Pointer, appears on hover over card */}
                    <Pointer className="absolute inset-0 z-30"> {/* Ensure Pointer takes className to be positioned */}
                      {hoveredProject === project.id && getCustomPointerContent()}
                    </Pointer>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
