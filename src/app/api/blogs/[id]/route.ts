import prisma from "@/lib/prisma"


export async function GET(request: Request, { params }: { params: Promise<{ id: string }>} ) { 
  const id = (await params).id

  const project = await prisma.blogPost.findUnique({
    where: {
      slug: id
    }
  })
  return Response.json(project)

}