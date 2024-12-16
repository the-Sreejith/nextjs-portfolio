import prisma from "@/lib/prisma"


export async function GET(request: Request, { params }: { params: Promise<{ id: string }>} ) { 
  const id = (await params).id

  const project = await prisma.project.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  return Response.json(project)

}