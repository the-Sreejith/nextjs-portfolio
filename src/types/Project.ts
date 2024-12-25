// Project interface
export interface Project {
  id: number;
  title: string;
  category: string;
  description?: string;
  content?: string;
  image: string;
  technologies: string;
  githubLink?: string;
  liveLink?: string;
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
