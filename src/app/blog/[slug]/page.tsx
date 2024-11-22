// // src/app/blog/[slug]/page.tsx
// import { notFound } from 'next/navigation'
// import Image from 'next/image'
// import { CalendarDays } from 'lucide-react'
// import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog'
// // import Navbar from '@/components/common/navbar'
// import ReactMarkdown from 'react-markdown'

// export async function generateStaticParams() {
//   const posts = getBlogPosts()
//   return posts.map((post) => ({
//     slug: post.slug
//   }))
// }

// export default function BlogPostPage({ 
//   params 
// }: { 
//   params: { slug: string } 
// }) {
//   const post = getBlogPostBySlug(params.slug)

//   if (!post) {
//     notFound()
//   }

//   return (
//     <div className="bg-zinc-950 min-h-screen">
//       {/* <Navbar /> */}
//       <div className="container mx-auto px-4 py-12 max-w-4xl">
//         <article className="prose prose-invert">
//           <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>
          
//           <div className="flex items-center gap-4 mb-8 text-zinc-400">
//             <div className="flex items-center gap-2">
//               <CalendarDays className="h-4 w-4" />
//               <span>{post.publishedAt.toLocaleDateString()}</span>
//             </div>
//             <span>•</span>
//             <span>{post.author}</span>
//           </div>

//           {post.imageUrl && (
//             <Image
//               src={post.imageUrl}
//               alt={post.title}
//               width={1200}
//               height={600}
//               className="rounded-lg mb-8 w-full object-cover"
//             />
//           )}

//           <ReactMarkdown>{post.content}</ReactMarkdown>
//         </article>
//       </div>
//     </div>
//   )
// }


export default function blog(){
  return(
    <div>
      Under development
    </div>
  )
}