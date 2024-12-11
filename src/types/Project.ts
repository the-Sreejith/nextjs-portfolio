// Project interface
export interface Project {
    id: number;
    title: string;
    category: string;
    description?: string;
    image: string;
    technologies?: string[];
    githubLink?: string;
    liveLink?: string;
  }
  
