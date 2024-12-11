import { NextRequest, NextResponse } from 'next/server'

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Pregsee - Flutter app",
    category: "Mobile App",
    description: "A comprehensive pregnancy tracking and health monitoring mobile application built with Flutter.",
    image: "/project-thumbnails/pregsee.png",
    technologies: ["Figma","Flutter", "Dart", "Firebase"],
    githubLink: "https://github.com/sreejithns-2002/pregsee",
    liveLink: "https://pregsee.app"
  },
  {
    id: 2,
    title: "Hireflex - Landing Page",
    category: "Web Development",
    description: "Landing Page created using Tailwindcss and react for running initial campaingns",
    image: "/project-thumbnails/hireflex.png",
    technologies: ["Next.js", "React", "JavaScript", "Tailwind CSS"],
    githubLink: "https://github.com/username/flexyhire",
    liveLink: "https://hireflex.vercel.app/"
  },
  {
    id: 3,
    title: "XDLINX Website",
    category: "Wordpress Development",
    description: "Wordpress website created for leading satalite manufacturing company",
    image: "/project-thumbnails/xdlinx.png",
    technologies: ["Wordpress", "CMS", "Javascript", "CSS"],
    liveLink: "https://xdlinx.space"
  },
  {
    id: 4,
    title: "Click Go",
    category: "UI/UX Design",
    description: "Food and ecommerce supplier app prototype created part of a client requirement",
    image: "/project-thumbnails/clickgo.png",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    liveLink: "https://www.figma.com/proto/NPwLIKgFCogw2agXp9tqBm/Click-Go?node-id=305-1016&node-type=canvas&t=LY3FJubLH9RiuC63-1&scaling=min-zoom&content-scaling=fixed&page-id=7%3A3&starting-point-node-id=302%3A919"
  },
  // {
  //   id: 5,
  //   title: "Data Visualization Dashboard",
  //   category: "Data Science",
  //   description: "Interactive dashboard for real-time data analysis with dynamic charting and insights.",
  //   image: "/placeholder.svg",
  //   technologies: ["React", "D3.js", "Node.js", "MongoDB"],
  //   githubLink: "https://github.com/username/data-dashboard"
  // },
  // {
  //   id: 6,
  //   title: "Social Media Analytics Tool",
  //   category: "Web Development",
  //   description: "Comprehensive social media performance tracking and analytics platform.",
  //   image: "/placeholder.svg",
  //   technologies: ["Next.js", "React", "TypeScript", "Chart.js"],
  //   githubLink: "https://github.com/username/social-analytics"
  // }
]

export async function GET(request: NextRequest) {
  try {
    // Optional: Add query parameter support for filtering
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let filteredProjects = projectsData

    if (category) {
      filteredProjects = projectsData.filter(
        project => project.category.toLowerCase() === category.toLowerCase()
      )
    }

    return NextResponse.json(filteredProjects)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' }, 
      { status: 500 }
    )
  }
}