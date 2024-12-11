// app/projects/[id]/page.tsx
import { Project } from '@/types/Project';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';


// async function fetchProjects(): Promise<Project[]> {
  
// }


export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const id = params.id

  return <div>Project Detail Page</div>

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        
//         <p className="text-gray-600 mb-6">{project.description}</p>
        
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Technologies</h2>
//           <div className="flex flex-wrap gap-2">
//             {project.technologies.map(tech => (
//               <span 
//                 key={tech} 
//                 className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>
        
//         {project.images && project.images.length > 0 && (
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Project Screenshots</h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               {project.images.map((img, index) => (
//                 <Image
//                   key={index}
//                   src={img}
//                   alt={`${project.title} screenshot ${index + 1}`}
//                   width={600}
//                   height={400}
//                   className="rounded-lg shadow-md"
//                 />
//               ))}
//             </div>
//           </div>
//         )}
        
//         <div className="flex space-x-4">
//           {project.githubLink && (
//             <Link 
//               href={project.githubLink} 
//               target="_blank" 
//               className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
//             >
//               GitHub
//             </Link>
//           )}
          
//           {project.liveLink && (
//             <Link 
//               href={project.liveLink} 
//               target="_blank" 
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
//             >
//               Live Site
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
}

// // Generate metadata for SEO
// export async function generateMetadata({ params }: ProjectDetailPageProps) {
//   const project = getProjectById(params.id);
  
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