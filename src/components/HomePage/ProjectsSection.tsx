"use client"



import { useEffect, useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Project } from '@/types/Project'

// Categories for filtering
const PROJECT_CATEGORIES = [
  'All',
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Full Stack'
] as const;

type ProjectCategory = typeof PROJECT_CATEGORIES[number];


async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects', {
      next: {
        revalidate: 3600 // Revalidate every hour
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    console.log(`response: ${response}`)

    return response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default function ProjectsSection() {
  const router = useRouter()
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState<ProjectCategory>('All')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProjects().then((data) => {
      setAllProjects(data)
      setProjects(data) 
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const handleFilter = (category: ProjectCategory) => {
    setFilter(category)
    if (category === 'All') {
      setProjects(allProjects)
    } else {
      setProjects(
        allProjects.filter(project => project.category === category)
      )
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full bg-zinc-950 py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-white mb-8">My Projects</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8 flex-wrap">
          {PROJECT_CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => handleFilter(category)}
              variant={filter === category ? "default" : "outline"}
              className="mb-2"
            >
              {category === 'Web Development' ? 'Web Dev' :
                category === 'UI/UX Design' ? 'UI/UX' : category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              onClick={() => router.push(`/projects/${project.id}`)}
              className="bg-zinc-900 border-zinc-800 transition-transform duration-300 hover:scale-105"
            >
              {/* Project Image */}
              <CardHeader>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={800}
                  className="rounded-t-lg object-cover h-72 w-full"
                />
              </CardHeader>

              {/* Project Details */}
              <CardContent className="space-y-2">
                <CardTitle className="text-white">{project.title}</CardTitle>
                <CardDescription className="text-zinc-400">
                  {project.category}
                </CardDescription>
                {project.description && (
                  <p className="text-zinc-300 text-sm line-clamp-3">
                    {project.description}
                  </p>
                )}

                {/* Technologies Used */}
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.split(',').map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>

              {/* Project Actions */}
              <CardFooter className="flex justify-between">
                <Link href={`/project/${project.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>

                <div className="flex space-x-2">
                  {project.githubLink && (
                    <Link href={project.githubLink} target="_blank">
                      <Button variant="ghost" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-zinc-400 hover:text-white"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </Button>
                    </Link>
                  )}
                  {project.liveLink && (
                    <Link href={project.liveLink} target="_blank">
                      <Button variant="ghost" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-zinc-400 hover:text-white"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      </Button>
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Projects Found */}
        {projects.length === 0 && (
          <div className="text-center text-zinc-400 py-12">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  )
}