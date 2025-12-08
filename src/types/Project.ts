export interface ProjectLink {
  type: 'github' | 'website' | 'figma' | 'behance' | 'report' | 'other';
  url: string;
  label?: string; // Optional custom label for the link button
}

export interface Project {
  id: number;
  title: string;
  badge: string;
  description: string; // Short description for the card
  longDescription?: string; // Detailed description for the modal
  image: string;
  links: ProjectLink[];
  category: "Web App" | "Mobile App" | "Website";
  size?: "small" | "medium" | "large";
  tags?: string[]; // Optional tags for more details in modal or filtering
}