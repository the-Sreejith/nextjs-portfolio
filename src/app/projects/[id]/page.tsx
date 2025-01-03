import { Project, ContentBlock } from '@/types/Project';
import Image from 'next/image';
import Link from 'next/link';


async function fetchProjects(id: string): Promise<Project> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}


export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }>}) {
  const id = (await params).id
  const project = await fetchProjects(id)

  return (
    <div className="container mx-auto px-4 lg:px-72 py-20 mb-24 bg-zinc-950">
      <div className="mx-auto">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-white">{project.title}</h1>
        
        <p className="mb-6 lg:w-2/3 text-white">{project.description}</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-white">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies!.split(',').map(tech => (
              <span 
                key={tech} 
                className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <Image className="w-full" src={project.image} alt={project.title} width={500} height={500} />

        <div className="mb-20 mt-20 "> 
          {project.content && (
            <div className="text-white">{JSON.parse(project.content!).map((block: ContentBlock, index: number) => {
              if (block.type === "text") {
                return (
                  <p key={index} className='text-white my-4'>
                    {block.content}
                  </p>
                );
              }
              
              if (block.type === "title") {
                return (
                  <h3 key={index} className='text-white text-3xl font-bold mt-8'>
                    {block.content}
                  </h3>
                );
              }
      
              if (block.type === "image") {
                return (
                  <div key={index} className="my-4">
                    <img
                      src={block.src}
                      alt={block.alt}
                      style={{ maxWidth: "100%", borderRadius: "8px", border: "2px solid white" }}
                    />
                  </div>
                );
              }
      
              return null;
            })}</div>
          )}
        </div>
        

        
        <div className="flex space-x-4  ">
          {project.githubLink && (
            <Link 
              href={project.githubLink} 
              target="_blank" 
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              GitHub
            </Link>
          )}
          
          {project.liveLink && (
            <Link 
              href={project.liveLink} 
              target="_blank" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Live Link
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// // Generate metadata for SEO
// export async function generateMetadata({ params }: { params: Promise<{ id: string }>}) {
//   const id = (await params).id;
//   const project = getProjectById(id);
  
//   return {
//     title: project ? `${project.title} | Your Portfolio` : 'Project Not Found',
//     description: project?.description || 'Project details'
//   };
// }

// // Optional: Static params for better performance
// export async function generateStaticParams() {
//   return projects.map(project => ({
//     id: project.id
//   }));
// }