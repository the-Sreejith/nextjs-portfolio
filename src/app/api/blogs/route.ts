// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const blogs = await prisma.blogPost.findMany({
    where: {
        slug: undefined
    }
  })

  try {
    // Add query parameter support for filtering
    // const { searchParams } = new URL(request.url)
    // const category = searchParams.get('category')

    let filteredBlogs = blogs

    // if (category) {
    //   filteredBlogs = blogs.filter(
    //     (blog: any) => blog.category.toLowerCase() === category.toLowerCase()
    //   )
    // }

    return NextResponse.json(filteredBlogs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blogs' }, 
      { status: 500 }
    )
  }
}

