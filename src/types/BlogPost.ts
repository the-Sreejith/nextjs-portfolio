// src/types/BlogPost.ts
export interface BlogPost {
  id: string
  title: string
  category: string
  img: string
  slug: string
  content: string
  excerpt: string
  publishedAt: Date
  author: string
  tags?: string
  imageUrl?: string
}