// src/lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '@/types/BlogPost'

const blogDirectory = path.join(process.cwd(), 'posts')

export function getBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(blogDirectory)
  
  const blogPosts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    return getBlogPostBySlug(slug)
  }).filter((post): post is BlogPost => post !== null)

  return blogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.md`)
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      id: slug,
      slug,
      title: data.title,
      content: content,
      excerpt: data.excerpt || content.substring(0, 200),
      publishedAt: new Date(data.publishedAt),
      author: data.author,
      tags: data.tags,
      imageUrl: data.imageUrl
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}