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
    id: 5,
    title: "Cave Gen Studio",
    badge: "AI Platform",
    category: "Web App",
    description: "AI-Powered Media Generation Platform.",
    longDescription: "Cave Gen Studio is an AI-Powered Media Generation Platform where users can design characters, scenes, and cinematic shots using the latest video and image models. Build your visual universe from scratch or remix community assets. Launching early 2026.",
    image: "/images/projects/cavegenstudio.png",
    links: [
      { type: 'website', url: 'https://www.cavegenstudio.com', label: 'Join Waitlist' }
    ],
    size: "medium",
    tags: ["AI", "Media Generation", "Web App"]
  },
  {
    id: 1,
    title: "Pregsee",
    badge: "Flutter",
    category: "Mobile App",
    description: "Cross-platform mobile app with video playback and user tracking.",
    longDescription: "Pregsee is a comprehensive mobile application built with Flutter, offering seamless video playback and advanced user tracking features. Designed for cross-platform compatibility, it provides a rich user experience on both iOS and Android devices. This project involved complex state management, native API integrations, and a focus on performance optimization to deliver a fluid and responsive interface for pregnancy health monitoring.",
    image: "/images/projects/pregsee.jpg",
    links: [
      { type: 'github', url: 'https://github.com/the-Sreejith/pregsee', label: 'View on GitHub' },
    ],
    size: "medium",
    tags: ["Mobile App", "Flutter", "Dart", "User Tracking"]
  },
  {
    id: 2,
    title: "Flickwise website",
    badge: "Frontend",
    category: "Website",
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
    title: "SAAS Dashboard",
    badge: "Web Application",
    category: "Web App",
    description: "SAAS application for managing e-commerce.",
    longDescription: "",
    image: "/images/projects/hireflex.jpg",
    links: [
      { type: 'website', url: 'app.komkits.com', label: 'View Live' }
    ],
    size: "small",
    tags: ["UX Design", "UI Design", "Figma", "Prototyping"]
  },
  {
    id: 4,
    title: "XDLinx.space",
    badge: "Web Application",
    category: "Website",
    description: "Official website for XDLinx, a satellite communications company.",
    longDescription: "Developed the official web presence for XDLinx, a company specializing in satellite communication solutions. The website was built to be informative, professional, and to clearly articulate the company's services and technological capabilities. Key features include responsive design, service showcases, and contact forms for inquiries.",
    image: "/images/projects/xdlinx.jpg",
    links: [
      { type: 'website', url: 'https://xdlinx.space', label: 'Visit XDLinx.space' }
    ],
    size: "small",
    tags: ["Web Development", "Corporate Website", "Responsive Design"]
  }
];

const FILTER_CATEGORIES = ["All", "Web App", "Website", "Mobile App"];

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = PROJECTS.filter(project =>
    activeCategory === "All" || project.category === activeCategory
  );

  const getAspectRatio = (size?: string) => {
    switch (size) {
      case "large": return "aspect-[16/9]";
      case "medium": return "aspect-[16/9]";
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
          <div className="text-center mb-12">
            <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Projects</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              My Recent{" "}
              <span className="text-[#1173E2]">Works</span>
            </h2>

            {/* Filter Buttons */}
            <div id="projects-filter" className="relative z-20 flex flex-wrap justify-center gap-2 mb-8">
              {FILTER_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                    ${activeCategory === category
                      ? "bg-[#1173E2] text-white border-[#1173E2] shadow-md transform scale-105"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 auto-rows-[minmax(0,_1fr)]"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => {
                let colSpan = "md:col-span-3 lg:col-span-2"; // small: 2 cols
                if (project.size === "large") colSpan = "md:col-span-3 lg:col-span-4";
                if (project.size === "medium") colSpan = "md:col-span-3 lg:col-span-3"; // medium: 3 cols

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={project.id}
                    className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer ${colSpan} 
                              transition-all duration-300 hover:shadow-2xl focus-visible:outline-none 
                              focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
                              focus-visible:ring-offset-background h-full`} // Added h-full to ensure equal height behavior if needed
                    onClick={() => handleProjectCardClick(project)}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleProjectCardClick(project); }}
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
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
