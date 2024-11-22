// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { BlogPost } from '@/types/BlogPost'

const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Introduction to TypeScript',
        slug: 'intro-typescript',
        content: 'TypeScript extends JavaScript by adding type definitions...',
        excerpt: 'Learn the basics of TypeScript and its advantages',
        publishedAt: new Date('2024-01-15'),
        author: 'John Doe',
        tags: ['typescript', 'programming'],
        imageUrl: '/images/typescript-cover.jpg'
    },
    {
        id: '2',
        title: 'Next.js 15 Best Practices',
        slug: 'nextjs-best-practices',
        content: 'Explore the latest features and optimization techniques...',
        excerpt: 'Improve your Next.js application performance and structure',
        publishedAt: new Date('2024-02-20'),
        author: 'Jane Smith',
        tags: ['nextjs', 'web development'],
        imageUrl: '/images/nextjs-cover.jpg'
    }
]

export async function GET(request: NextRequest) {
    return NextResponse.json(blogPosts)
}