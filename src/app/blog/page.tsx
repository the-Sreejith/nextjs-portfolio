// src/app/blog/page.tsx
// import Link from 'next/link'
// import Image from 'next/image'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { CalendarDays } from 'lucide-react'
// import Navbar from '@/components/common/navbar'

export default function BlogSection() {
  return(
    <div>
      Under development
    </div>
  )

  // return (
  //   <div className="bg-zinc-950 min-h-screen">
  //     <Navbar />
  //     <div className="container mx-auto px-4 py-12">
  //       <h1 className="text-4xl font-bold text-white mb-12">Blog Posts</h1>
  //       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {blogPosts.map((post) => (
  //           <Card key={post.id} className="bg-zinc-900 border-zinc-800">
  //             <CardHeader>
  //               {post.imageUrl && (
  //                 <Image
  //                   src={post.imageUrl}
  //                   alt={post.title}
  //                   width={400}
  //                   height={200}
  //                   className="rounded-t-lg object-cover h-48 w-full"
  //                 />
  //               )}
  //             </CardHeader>
  //             <CardContent className="space-y-4">
  //               <div className="flex items-center gap-2 text-zinc-400 text-sm">
  //                 <CalendarDays className="h-4 w-4" />
  //                 <span>{post.publishedAt.toLocaleDateString()}</span>
  //               </div>
  //               <CardTitle className="text-white">{post.title}</CardTitle>
  //               <CardDescription className="text-zinc-400">
  //                 {post.excerpt}
  //               </CardDescription>
  //             </CardContent>
  //             <CardFooter>
  //               <Link href={`/blog/${post.slug}`}>
  //                 <Button variant="outline">Read More →</Button>
  //               </Link>
  //             </CardFooter>
  //           </Card>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // )
}