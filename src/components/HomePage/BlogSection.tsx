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
            <div className="container max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-12">
                    <div className="inline-block bg-[#1173E2] border-4 border-black dark:border-white px-6 py-2 mb-6 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
                        <span className="text-white text-lg uppercase tracking-[0.2em]">Blog</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl uppercase tracking-wider text-foreground">
                        Latest <span className="text-[#1173E2]">Articles</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-12">
                    {/* Featured Post */}
                    <Link
                        href={featuredPost.link ?? ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid md:grid-cols-2 gap-0 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] overflow-hidden hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] dark:hover:shadow-[12px_12px_0_0_#fff] transition-all duration-200"
                    >
                        {/* Image Side */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white">
                            {featuredPost.thumbnail ? (
                                <Image
                                    src={featuredPost.thumbnail}
                                    alt={featuredPost.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full w-full bg-secondary/10 text-4xl">
                                    [IMG]
                                </div>
                            )}
                        </div>

                        {/* Content Side */}
                        <div className="flex flex-col h-full p-6">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
                                // Featured Post
                            </div>

                            <h3 className="text-2xl md:text-3xl uppercase tracking-wider text-foreground mb-4 leading-tight group-hover:text-[#1173E2] transition-colors">
                                {featuredPost.title}
                            </h3>

                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6">
                                {featuredPost.contentSnippet}
                            </p>

                            <div className="mt-auto flex items-center gap-4">
                                {featuredPost.categories?.[0] && (
                                    <span className="border-2 border-black dark:border-white px-3 py-0.5 text-xs uppercase tracking-wider">
                                        {featuredPost.categories[0]}
                                    </span>
                                )}
                                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                                    {formatDate(featuredPost.pubDate)}
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Other Posts */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {otherPosts.map((post, idx) => (
                            <Link
                                key={idx}
                                href={post.link ?? ""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] overflow-hidden hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] dark:hover:shadow-[10px_10px_0_0_#fff] transition-all duration-200"
                            >
                                {/* Image */}
                                <div className="relative aspect-video w-full overflow-hidden border-b-4 border-black dark:border-white">
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
                                            [IMG]
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg uppercase tracking-wider text-foreground mb-2 leading-snug group-hover:text-[#1173E2] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                        {post.contentSnippet}
                                    </p>

                                    <div className="flex items-center gap-3 flex-wrap">
                                        {post.categories?.[0] && (
                                            <span className="border-2 border-black dark:border-white px-2 py-0.5 text-[10px] uppercase tracking-wider">
                                                {post.categories[0]}
                                            </span>
                                        )}
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
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
