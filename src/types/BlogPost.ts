// src/types/BlogPost.ts
export interface BlogPost {
  id: number
  slug: string
  title: string
  category: string
  img: string
  content: string
  excerpt: string
  publishedAt: Date
  author: string
  tags?: string
  imageUrl?: string
}

export type ContentBlock =
  | {
    type: "text";
    content: string;
  }
  | {
    type: "image";
    src: string;
    alt: string;
  };
