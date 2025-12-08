import Image from "next/image"
import Link from "next/link"
import Parser from 'rss-parser';

type BlogPost = {
    title: string;
    link: string;
    pubDate: string;
    content: string;
    contentSnippet: string;
    thumbnail?: string;
    categories?: string[];
}

async function getMediumPosts(): Promise<BlogPost[]> {
    const parser = new Parser();
    try {
        const feed = await parser.parseURL('https://medium.com/feed/@the-sreejith');
        return feed.items.slice(0, 3).map((item: any) => {
            const content = item['content:encoded'] || item.content || '';
            const imgMatch = content.match(/<img[^>]+src=['"]([^'"]+)['"]/);
            let thumbnail = imgMatch ? imgMatch[1] : null;

            return {
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                content: content,
                contentSnippet: item.contentSnippet,
                thumbnail,
                categories: item.categories
            } as BlogPost;
        });
    } catch (error) {
        console.error("Error fetching Medium posts:", error);
        return [];
    }
}

export default async function BlogSection() {
    const posts = await getMediumPosts();

    if (posts.length === 0) return null;

    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <section className="py-24 bg-background relative" id="blog">
            <div className="container max-w-7xl mx-auto px-4">
                {/* Header omitted as per reference style, or can be subtle. 
                Reference image implies a section title might be present but the focus is on content.
                I'll keep a minimal header. */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                        Latest <span className="text-[#1173E2]">Articles</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-12">
                    {/* Featured Post */}
                    <Link
                        href={featuredPost.link ?? ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid md:grid-cols-2 gap-8 items-start"
                    >
                        {/* Image Side */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                            {featuredPost.thumbnail ? (
                                <Image
                                    src={featuredPost.thumbnail}
                                    alt={featuredPost.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full w-full bg-secondary/10 text-secondary">
                                    <span className="text-6xl">✍️</span>
                                </div>
                            )}
                        </div>

                        {/* Content Side */}
                        <div className="flex flex-col h-full py-4">
                            {/* Top Line */}
                            <div className="w-full h-px bg-foreground/20 mb-6 group-hover:bg-[#1173E2] transition-colors duration-300"></div>

                            <h3 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 leading-tight group-hover:text-[#1173E2] transition-colors">
                                {featuredPost.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 text-lg line-clamp-3 mb-8">
                                {featuredPost.contentSnippet}
                            </p>

                            <div className="mt-auto flex items-center gap-4">
                                {featuredPost.categories?.[0] && (
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-foreground">
                                        {featuredPost.categories[0]}
                                    </span>
                                )}
                                <span className="text-sm font-medium text-gray-500">
                                    {formatDate(featuredPost.pubDate)}
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Other Posts Grid */}
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                        {otherPosts.map((post, idx) => (
                            <Link
                                key={idx}
                                href={post.link ?? ""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group grid grid-cols-[1fr_1.5fr] gap-6 items-start"
                            >
                                {/* Image */}
                                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                                    {post.thumbnail ? (
                                        <Image
                                            src={post.thumbnail}
                                            alt={post.title}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full w-full bg-secondary/10">
                                            <span className="text-2xl">✍️</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col h-full">
                                    <div className="w-full h-px bg-foreground/20 mb-3 group-hover:bg-[#1173E2] transition-colors duration-300"></div>
                                    <h3 className="text-xl md:text-2xl font-serif font-light text-foreground mb-3 leading-snug group-hover:text-[#1173E2] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                                        {post.contentSnippet}
                                    </p>

                                    <div className="mt-auto flex items-center gap-3 flex-wrap">
                                        {post.categories?.[0] && (
                                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-medium text-foreground">
                                                {post.categories[0]}
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-500">
                                            {formatDate(post.pubDate)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
