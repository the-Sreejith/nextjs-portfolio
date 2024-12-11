"use client"

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogPost } from '@/types/BlogPost'

// Categories for filtering
const BLOG_CATEGORIES = [
  'All',
  'Technology',
  'Design',
  'Product',
  'Tutorials'
] as const;

type BlogCategory = typeof BLOG_CATEGORIES[number];


async function fetchBlogs(): Promise<BlogPost[]> {
  const response = await fetch(`https://www.thesreejith.in/api/blogs`, {
    cache: 'no-store' // or 'force-cache' based on your needs
  })
  const blogs = await response.json()

  return blogs.map((blog: BlogPost) => ({
    ...blog,
    publishedAt: new Date(blog.publishedAt)
  }))
}


export default async function BlogSection() {

  const blogPosts = await fetchBlogs()
  const [blogs, setBlogs] = useState<BlogPost[]>(blogPosts)
  const [filter, setFilter] = useState<BlogCategory>('All')

  const handleFilter = (category: BlogCategory) => {
    setFilter(category)
    if (category === 'All') {
      setBlogs(blogPosts)
    } else {
      setBlogs(
        blogPosts.filter(blog => blog.category === category)
      )
    }
  }

  return (
    <section className="w-full bg-zinc-950 py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-white mb-8">Blog Posts</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8 flex-wrap">
          {BLOG_CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => handleFilter(category)}
              variant={filter === category ? "default" : "outline"}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="bg-zinc-900 border-zinc-800 transition-transform duration-300 hover:scale-105"
            >
              {/* Blog Image */}
              <CardHeader>
                <Image
                  src={blog.img}
                  alt={blog.title}
                  width={400}
                  height={200}
                  className="rounded-t-lg object-cover h-48 w-full"
                />
              </CardHeader>

              {/* Blog Details */}
              <CardContent className="space-y-2">
                <CardTitle className="text-white">{blog.title}</CardTitle>
                <CardDescription className="text-zinc-400">
                  {blog.category} | {blog.publishedAt.toLocaleDateString()}
                </CardDescription>
                <p className="text-zinc-300 text-sm line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                {blog.tags && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>

              {/* Blog Actions */}
              <CardFooter className="flex justify-between items-center">
                <div className="text-zinc-400 text-sm">
                  By {blog.author}
                </div>
                <Link href={`/blog/${blog.id}`}>
                  <Button variant="outline">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Blogs Found */}
        {blogs.length === 0 && (
          <div className="text-center text-zinc-400 py-12">
            No blog posts found in this category.
          </div>
        )}
      </div>
    </section>
  )
}