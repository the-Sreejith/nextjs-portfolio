"use client"

import { useState } from 'react'
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Project } from '@/types/Project'
import ProjectDetailModal from '@/components/HomePage/ProjectDetailModal'

const PROJECTS: Project[] = [
  {
    id: 7,
    title: "Huspeep",
    badge: "Mobile App",
    category: "Mobile App",
    description: "Home service marketplace connecting homeowners with verified professionals.",
    longDescription: "Huspeep is a digital marketplace connecting homeowners with background-checked service professionals. Users can post jobs, receive competitive quotations, and hire verified providers in their area. Features include real-time in-app messaging, live job status tracking, transparent pricing, and a rigorous partner approval process. Currently operating in Kochi, Kerala.",
    image: "/images/projects/huspeep.png",
    links: [
      { type: 'website', url: 'https://huspeep.com', label: 'Visit Huspeep' },
      { type: 'playstore', url: 'https://play.google.com/store/apps/details?id=com.huspeep.customer', label: 'Google Play' }
    ],
    size: "medium",
    tags: ["Marketplace", "Mobile App", "Home Services"]
  },
  {
    id: 6,
    title: "VCSailor",
    badge: "AI SaaS",
    category: "Web App",
    description: "AI-powered fundraising co-pilot for startup founders.",
    longDescription: "VCSailor is an AI-powered fundraising co-pilot built for pre-seed and seed-stage founders. It conducts rapid market research by analyzing 236+ sources, generates VC-readiness scores, builds investor-ready pitch decks, and matches founders with relevant venture capital partners. The platform helps quantify TAM, SAM, and SOM metrics and validates business ideas through aggregated data analysis — turning weeks of research into minutes.",
    image: "/images/projects/vcsailor.png",
    links: [
      { type: 'website', url: 'https://vcsailor.com', label: 'Visit VCSailor' }
    ],
    size: "medium",
    tags: ["AI", "SaaS", "Fundraising", "Next.js"]
  },
  {
    id: 8,
    title: "TakoraMart",
    badge: "E-Commerce",
    category: "Mobile App",
    description: "Multi-vendor e-commerce platform with Android and iOS apps.",
    longDescription: "TakoraMart is a multi-vendor e-commerce marketplace offering 27+ product categories including groceries, personal care, electronics, and home goods. Built the complete Android and iOS mobile applications alongside the web platform. Features include vendor registration and dashboards, wallet functionality, product search and filtering, and multi-payment support.",
    image: "/images/projects/takoramart.png",
    links: [
      { type: 'website', url: 'https://takoramart.com', label: 'Visit Website' },
      { type: 'playstore', url: 'https://play.google.com/store/apps/details?id=com.takoramart.android', label: 'Google Play' },
      { type: 'appstore', url: 'https://apps.apple.com/ph/app/takoramart/id6758244454', label: 'App Store' }
    ],
    size: "medium",
    tags: ["E-Commerce", "Android", "iOS", "Multi-Vendor"]
  },
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
    image: "/images/projects/komkits.png",
    links: [
      { type: 'website', url: 'https://app.komkits.com/', label: 'View Live' }
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = PROJECTS.filter(project =>
    activeCategory === "All" || project.category === activeCategory
  );

  return (
    <>
      <section className="py-20 bg-background relative" id="projects">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-[#1173E2] border-4 border-black dark:border-white px-6 py-2 mb-6 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
              <span className="text-white text-lg uppercase tracking-[0.2em]">Quest Log</span>
            </div>
            <h2 className="text-4xl md:text-5xl uppercase tracking-wider text-foreground">
              My Recent{" "}
              <span className="text-[#1173E2]">Works</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {FILTER_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm uppercase tracking-widest border-4 transition-all duration-200
                  ${activeCategory === category
                    ? "bg-[#1173E2] text-white border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]"
                    : "bg-white dark:bg-zinc-900 text-foreground border-black dark:border-white shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff] hover:shadow-[4px_4px_0_0_#000] dark:hover:shadow-[4px_4px_0_0_#fff] hover:-translate-y-0.5"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Cards - Simple equal grid */}
          <motion.div layout className="grid grid-cols-1 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="group cursor-pointer bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] dark:hover:shadow-[10px_10px_0_0_#fff]"
                  onClick={() => setSelectedProject(project)}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project); }}
                >
                  {/* Window Title Bar */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#1173E2] border-b-4 border-black dark:border-white">
                    <div className="flex gap-1.5">
                      <span className="h-3 w-3 bg-white border-2 border-black" />
                      <span className="h-3 w-3 bg-white/50 border-2 border-black" />
                      <span className="h-3 w-3 bg-white/30 border-2 border-black" />
                    </div>
                    <span className="text-white text-sm uppercase tracking-widest ml-2 truncate">
                      {project.title}
                    </span>
                  </div>

                  {/* Two-column: Image left, Text right — match blog card height (369px) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 min-h-0 md:h-[369px]">
                    {/* Project Image - left */}
                    <div className="relative min-h-[220px] md:min-h-0 md:h-full overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 768px) 50vw, (min-width: 1200px) 576px, 100vw"
                      />
                    </div>

                    {/* Project Info - right */}
                    <div className="p-5 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block border-2 border-[#1173E2] text-[#1173E2] px-3 py-0.5 text-xs uppercase tracking-widest">
                          {project.badge}
                        </span>
                        <span className="text-muted-foreground text-xs uppercase tracking-wider">
                          // {project.category}
                        </span>
                      </div>

                      <h3 className="text-xl uppercase tracking-wider text-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Tags */}
                      {project.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map(tag => (
                            <span key={tag} className="border-2 border-black dark:border-white px-2 py-0.5 text-xs uppercase tracking-wider text-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-[#1173E2] text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        <span className="animate-blink">{'>'}</span>
                        <span>View Project</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

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
