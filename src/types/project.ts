export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  clientType: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  result: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  featuredImage: string;
  gallery: string[];
  completionYear: string;
  link?: string;
}
