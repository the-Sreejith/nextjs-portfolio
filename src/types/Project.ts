// Project interface
export interface Project {
  id: number;
  title: string;
  badge?: string;
  category?: string;
  description?: string;
  content?: string;
  image: string;
  technologies?: string[];
  githubLink?: string;
  liveLink?: string;
  externalLink?: string;
  size?: "small" | "medium" | "large";
}

export type ContentBlock =
  | {
    type: "text";
    content: string;
  }
  | {
    type: "title";
    content: string;
  }
  | {
    type: "image";
    src: string;
    alt: string;
  };
