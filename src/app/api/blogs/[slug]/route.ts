import prisma from "@/lib/prisma"


export async function GET(request: Request, { params }: { params: Promise<{ slug: string }>} ) { 
  const slug = (await params).slug

  const project = await prisma.blogPost.findUnique({
    where: {
      slug: slug
    }
  })
  return Response.json(project)

}