"use client"

import { useState } from 'react'
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Pointer } from "@/components/magicui/pointer" // Ensure this path is correct
import { motion, AnimatePresence } from "framer-motion" // Use motion from framer-motion
import { Project } from '@/types/Project' // Ensure this path is correct
import ProjectDetailModal from '@/components/HomePage/ProjectDetailModal' // Ensure this path is correct

// Project data
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Pregsee",
    badge: "Flutter",
    description: "Cross-platform mobile app with video playback and user tracking.",
    longDescription: "Pregsee is a comprehensive mobile application built with Flutter, offering seamless video playback and advanced user tracking features. Designed for cross-platform compatibility, it provides a rich user experience on both iOS and Android devices. This project involved complex state management, native API integrations, and a focus on performance optimization to deliver a fluid and responsive interface for pregnancy health monitoring.",
    image: "/images/projects/mindspace.jpg", // Replace with actual Pregsee image
    links: [
      { type: 'github', url: 'https://github.com/the-Sreejith/pregsee', label: 'View on GitHub' },
      // { type: 'website', url: '#', label: 'Live Demo' } // Example
    ],
    size: "large",
    tags: ["Mobile App", "Flutter", "Dart", "User Tracking"]
  },
  {
    id: 2,
    title: "Portfolio Landing Page",
    badge: "Next.js",
    description: "Sleek landing page built with Next.js and Tailwind CSS.",
    longDescription: "This project is a modern, responsive landing page created using Next.js for server-side rendering and static site generation capabilities, styled with Tailwind CSS for rapid UI development. It showcases a clean design, smooth animations, and is optimized for performance and SEO. The page serves as a personal portfolio to highlight skills and projects.",
    image: "/images/projects/ecotrack.jpg", // Replace with actual Landing Page image
    links: [
      { type: 'website', url: 'https://sreejithksivan.dev', label: 'View Live' },
      { type: 'github', url: 'https://github.com/the-Sreejith/sreejithksivan.dev', label: 'GitHub Repo' }
    ],
    size: "small"
  },
  {
    id: 3,
    title: "E-commerce UX/UI",
    badge: "UX/UI Design",
    description: "Complete wireframes and prototypes for an e-commerce platform.",
    longDescription: "A comprehensive UX/UI design project for an e-commerce application, covering both customer-facing and supplier management interfaces. This involved user research, persona creation, journey mapping, wireframing, and high-fidelity prototyping using Figma. The focus was on creating an intuitive, accessible, and engaging shopping experience.",
    image: "/images/projects/nexusvault.jpg", // Replace with actual E-commerce UX image
    links: [
      { type: 'figma', url: '#', label: 'View Figma Designs' }, // Replace with actual Figma link
      { type: 'behance', url: '#', label: 'Behance Case Study' } // Replace with actual Behance link
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
    image: "/images/projects/dataviz.jpg", // Replace with actual XDLinx image
    links: [
      { type: 'website', url: 'https://xdlinx.space', label: 'Visit XDLinx.space' }
    ],
    size: "large",
    tags: ["Web Development", "Corporate Website", "Responsive Design"]
  }
];


export default function ProjectsSection() {
  // hoveredProject state is kept for the magic pointer, if it uses it.
  // If not, it can be removed. The custom pointer below doesn't seem to use it.
  const [hoveredProject, setHoveredProject] = useState<number | null>(null); 
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getAspectRatio = (size?: string) => {
    switch(size) {
      case "large": return "aspect-[16/9]";
      // case "medium": return "aspect-[4/3]"; // You can uncomment and use this
      case "small": return "aspect-square";
      default: return "aspect-[16/9]"; // Default to 16/9 if medium is not used often
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
          y: [0, -2, 0] // Subtle bobbing animation
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <span>View Details</span> {/* Changed from "View Project" */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 auto-rows-[minmax(0,_1fr)]"> {/* Changed auto-rows for better height control */}
            {PROJECTS.map((project) => {
              let colSpan = "md:col-span-3 lg:col-span-2"; // Default for small
              if (project.size === "large") colSpan = "md:col-span-3 lg:col-span-4";
              // if (project.size === "medium") colSpan = "md:col-span-3 lg:col-span-3"; // Uncomment if you add medium size

              return (
                <div // Changed from Link to div, click opens modal
                  key={project.id}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer ${colSpan} 
                              transition-all duration-300 hover:shadow-2xl focus-visible:outline-none 
                              focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
                              focus-visible:ring-offset-background`}
                  onClick={() => handleProjectCardClick(project)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  tabIndex={0} // Make it focusable
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
                    
                    {/* Always visible content at the bottom right for title, could be an alternative design */}
                    {/* <div className="absolute bottom-0 right-0 z-20 p-4 md:p-6 text-right">
                       <h3 className="text-lg font-bold text-white mb-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300 [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]">
                         {project.title}
                       </h3>
                    </div> */}

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


// "use client"

// import { useState } from 'react'
// import Link from "next/link"
// import Image from "next/image"
// import { ArrowRight } from "lucide-react"
// import { Pointer } from "@/components/magicui/pointer"
// import { motion } from "motion/react"
// import { Project } from '@/types/Project'

// // Project data
// const PROJECTS: Project[] = [
//   {
//     id: 1,
//     title: "Pregsee",
//     badge: "Flutter",
//     description: "Video Playing, Usertracking, Fully Fledged Cross Platform Mobile App",
//     image: "/images/projects/mindspace.jpg",
//     externalLink: "https://github.com/the-Sreejith/pregsee",
//     size: "large" // Spans 2 columns
//   },
//   {
//     id: 2,
//     title: "Landing Page",
//     badge: "NextJs",
//     description: "Landing page created in NextJs",
//     image: "/images/projects/ecotrack.jpg",
//     externalLink: "https://ecotrack-app.com",
//     size: "small" // Square, spans 1 column
//   },
//   {
//     id: 3,
//     title: "Ecommerce",
//     badge: "UX/UI Design",
//     description: "Complete wireframe of Ecommerce app both supplier and custommer",
//     image: "/images/projects/nexusvault.jpg",
//     externalLink: "#",
//     size: "small" // Square, spans 1 column
//   },
//   {
//     id: 4,
//     title: "XDLinx.space",
//     badge: "Web Application",
//     description: "Website for XDLinx satalite Company",
//     image: "/images/projects/dataviz.jpg",
//     externalLink: "https://xdlinx.space",
//     size: "large" // Spans 2 columns, but shorter height
//   }
// ];

// export default function ProjectsSection() {
//   const [hoveredProject, setHoveredProject] = useState<number | null>(null);

//   // Helper function to determine the aspect ratio based on project size
//   const getAspectRatio = (size?: string) => {
//     switch(size) {
//       case "large": return "aspect-[16/9]";
//       case "medium": return "aspect-[4/3]";
//       case "small": return "aspect-square";
//       default: return "aspect-[4/3]";
//     }
//   };

//   // Custom "View Project" pointer with subtle animations
//   const getCustomPointer = () => {
//     return (
//       <motion.div
//         className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-gray-200 dark:border-gray-700"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ 
//           scale: [0.95, 1, 0.95],
//           opacity: 1,
//           y: [0, -2, 0]
//         }}
//         transition={{
//           scale: {
//             duration: 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           },
//           y: {
//             duration: 1.5,
//             repeat: Infinity,
//             ease: "easeInOut",
//           },
//           opacity: {
//             duration: 0.3,
//             ease: "easeOut"
//           }
//         }}
//       >
//         <span>View Project</span>
//         <motion.div
//           animate={{ 
//             x: [0, 3, 0],
//             rotate: [0, 5, 0]
//           }}
//           transition={{
//             duration: 1.8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         >
//           <ArrowRight className="h-4 w-4" />
//         </motion.div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="py-20 bg-background relative">
//       <div className="container max-w-7xl mx-auto px-4">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-4">
//             <span className="text-sm font-medium">Featured Projects</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
//             My Recent{" "}
//             <span className="text-[#1173E2]">Works</span>
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Discover my latest projects showcasing creative problem-solving and technical expertise
//           </p>
//         </div>

//         {/* Bento Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 auto-rows-auto">
//           {PROJECTS.map((project) => {
//             // Determine grid column span based on project size
//             let colSpan = "md:col-span-3 lg:col-span-2";
//             if (project.size === "large") colSpan = "md:col-span-3 lg:col-span-4";
//             if (project.size === "medium") colSpan = "md:col-span-3 lg:col-span-3";
            
//             return (
//               <Link
//                 key={project.id}
//                 href={project.externalLink || "#"}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`group relative overflow-hidden rounded-lg ${colSpan}`}
//                 onMouseEnter={() => setHoveredProject(project.id)}
//                 onMouseLeave={() => setHoveredProject(null)}
//               >
//                 <div className={`relative w-full h-full overflow-hidden ${getAspectRatio(project.size)}`}>
//                   {/* Background Image */}
//                   <div className="absolute inset-0 bg-gray-900/20 z-10 transition-opacity duration-300 group-hover:opacity-50" />
                  
//                   <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
//                     <Image
//                       src={project.image}
//                       alt={project.title}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between">
//                     <div>
//                       <span className="inline-block px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white rounded-full mb-2">
//                         {project.badge}
//                       </span>
//                       <h3 className="text-2xl font-bold text-white mb-1">
//                         {project.title}
//                         <span className="text-lg ml-1 align-super">™</span>
//                       </h3>
//                     </div>
                    
//                     <div>
//                       <p className="text-white/90 text-sm md:text-base mb-4">
//                         {project.description}
//                       </p>

//                     </div>
//                   </div>

//                   {/* Custom "View Project" Pointer */}
//                   <Pointer>
//                     {getCustomPointer()}
//                   </Pointer>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }
