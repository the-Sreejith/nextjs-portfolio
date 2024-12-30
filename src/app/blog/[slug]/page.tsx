// app/blog/[id]/page.tsx
import { BlogPost, ContentBlock } from '@/types/BlogPost';
import Image from 'next/image';

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
              src={blogPost.img}
              alt={blogPost.title}
              width={800}
              height={400}
              className="rounded-lg w-full"
            />
          </div>
        )}

        <p className="mb-6 text-white">{blogPost.excerpt}</p>

        <div className="mb-6">
          {blogPost.content && (
            <div className="text-white">
              {JSON.parse(blogPost.content).map((block: ContentBlock, index: number) => {

                if (block.type === "title") {
                  return (
                    <h3 key={index} className='text-white text-3xl font-bold mt-8'>
                      {block.content}
                    </h3>
                  );
                }

                if (block.type === 'text') {
                  return (
                    <p key={index} className='text-white my-4 text-justify '>
                      {block.content}
                    </p>
                  );
                }

                if (block.type === 'image') {
                  return (
                    <div key={index} className="mt-6 mb-12">
                      <img
                        src={block.src}
                        alt={block.alt}
                        className=' mx-auto w-full'
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </div>

        <div className="flex space-x-4 mb-24">
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


