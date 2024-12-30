import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'



export async function GET(request: NextRequest) {

  const projects = await prisma.project.findMany()

  try {
    // Add query parameter support for filtering
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    let filteredProjects = projects

    if (category) {
      filteredProjects = projects.filter(
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