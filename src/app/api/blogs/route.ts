// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { BlogPost } from '@/types/BlogPost'


export async function GET(request: NextRequest) {
    // return NextResponse.json(blogPosts)
    return NextResponse.json({ message: 'Under development' })

}
