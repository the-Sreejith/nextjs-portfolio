import Link from "next/link"
import Parser from 'rss-parser';

type BlogPost = {
    title: string;
    link: string;
    pubDate: string;
    content: string;
    contentSnippet: string;
    categories?: string[];
}

const MAX_POSTS = 10;

async function getMediumPosts(): Promise<BlogPost[]> {
    const parser = new Parser();
    try {
        const feed = await parser.parseURL('https://medium.com/feed/@the-sreejith');
        const posts = (feed.items ?? []).map((item: Record<string, unknown>) => ({
            title: item.title as string,
            link: item.link as string,
            pubDate: item.pubDate as string,
            content: (item['content:encoded'] || item.content || '') as string,
            contentSnippet: item.contentSnippet as string,
            categories: item.categories as string[] | undefined
        } as BlogPost));
        // Sort by date (newest first). Medium RSS doesn't expose popularity.
        posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        return posts.slice(0, MAX_POSTS);
    } catch (error) {
        console.error("Error fetching Medium posts:", error);
        return [];
    }
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function BlogSection() {
    const posts = await getMediumPosts();

    if (posts.length === 0) return null;

    return (
        <section className="py-16 bg-background relative overflow-hidden" id="blog">
            {/* Background Distractions */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10 dark:opacity-5">
                <div className="absolute top-10 right-10 font-pixel text-9xl">LOGS</div>
                <div className="absolute bottom-20 left-10 font-pixel text-8xl rotate-90">DATA</div>
                <div className="absolute top-1/3 left-1/4 w-64 h-64 border-4 border-dashed border-foreground/20 rounded-full animate-spin-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-foreground/10 rotate-45" />
                {/* Decorative lines */}
                {[12, 34, 56, 73, 91].map((pos, i) => (
                    <div
                        key={i}
                        className="absolute h-px bg-foreground/30 w-full"
                        style={{ top: `${pos}%`, left: 0 }}
                    />
                ))}
            </div>

            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                {/* Header — matches Projects, About, Testimonials */}
                <div className="mb-8">
                    <div className="inline-block bg-[#1173E2] border-4 border-black dark:border-white px-4 py-1.5 mb-4 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
                        <span className="text-white text-sm uppercase tracking-[0.2em]">Blog</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl uppercase tracking-wider text-foreground">
                        Latest <span className="text-[#1173E2]">Articles</span>
                    </h2>
                </div>

                {/* List Layout */}
                <div className="flex flex-col gap-10">
                    {posts.map((post, idx) => (
                        <div key={idx} className="group relative">
                            {/* Connector Line */}
                            <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-1 bg-foreground/10 group-hover:bg-[#1173E2] transition-colors duration-300" />
                            
                            <Link
                                href={post.link ?? ""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block pl-5 md:pl-8 relative"
                            >
                                {/* Metadata Row */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2 font-pixel text-xs md:text-sm text-[#1173E2] uppercase tracking-widest">
                                    <span className="bg-[#1173E2] text-white px-2 py-0.5">
                                        IDX_{String(idx).padStart(2, '0')}
                                    </span>
                                    <span>{'// '}{formatDate(post.pubDate)}</span>
                                    {post.categories?.[0] && (
                                        <>
                                            <span className="text-muted-foreground">::</span>
                                            <span>[{post.categories[0]}]</span>
                                        </>
                                    )}
                                </div>

                                {/* Title - Huge and Interactive */}
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase leading-[0.9] tracking-tight mb-4 group-hover:text-[#1173E2] transition-colors duration-300 break-words max-w-5xl">
                                    <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">
                                        {post.title}
                                    </span>
                                </h3>

                                {/* Description with visual structure */}
                                <div className="relative border-l-4 border-black/10 dark:border-white/10 pl-4 py-0 group-hover:border-[#1173E2] transition-colors duration-300">
                                    <p className="text-muted-foreground text-sm md:text-base leading-snug max-w-3xl line-clamp-2">
                                        {post.contentSnippet}
                                    </p>
                                    
                                    {/* Read More Indicator */}
                                    <div className="mt-2 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                                        <div className="h-1.5 w-1.5 bg-[#1173E2] animate-blink" />
                                        <span className="font-pixel text-sm uppercase text-foreground">
                                            Read full on Medium →
                                        </span>
                                        <span className="h-px flex-1 bg-foreground/20 group-hover:bg-[#1173E2]" />
                                    </div>
                                </div>

                                {/* Hover Distraction/Decoration */}
                                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300 hidden xl:block">
                                    <div className="text-9xl font-black rotate-12">READ</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                
                {/* Footer/End of Log */}
                <div className="mt-16 border-t-4 border-dashed border-foreground/20 pt-6 text-center font-pixel text-base text-muted-foreground uppercase tracking-widest">
                    *** End of Stream ***
                </div>
            </div>
        </section>
    )
}
