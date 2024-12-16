// app/blog/[id]/page.tsx
import { BlogPost, ContentBlock } from '@/types/BlogPost';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function fetchBlogPost(slug: string): Promise<BlogPost> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const blogPost = await fetchBlogPost(slug);

  return (
    <div className="container mx-auto px-4 py-8 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-white">{blogPost.title}</h1>

        <p className="mb-4 text-gray-400 text-sm">
          Published on {new Date(blogPost.publishedAt).toLocaleDateString()} by {blogPost.author}
        </p>

        {blogPost.imageUrl && (
          <div className="mb-6">
            <Image
              src={blogPost.imageUrl}
              alt={blogPost.title}
              width={800}
              height={400}
              className="rounded-lg"
            />
          </div>
        )}

        <p className="mb-6 text-white">{blogPost.excerpt}</p>

        <div className="mb-6">
          {blogPost.content && (
            <div className="text-white">
              {JSON.parse(blogPost.content).map((block: ContentBlock, index: number) => {
                if (block.type === 'text') {
                  return (
                    <p key={index} style={{ fontSize: '1.2rem', margin: '1rem 0', color: 'white' }}>
                      {block.content}
                    </p>
                  );
                }

                if (block.type === 'image') {
                  return (
                    <div key={index} style={{ margin: '1.5rem 0' }}>
                      <img
                        src={block.src}
                        alt={block.alt}
                        style={{ maxWidth: '100%', borderRadius: '8px', border: '2px solid white' }}
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          {blogPost.tags && (
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.split(',').map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


