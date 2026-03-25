export interface ProjectConfig {
  slug: string;
  title: string;
  client?: {
    name: string;
    url?: string;
    country?: string;
  };
  category: 'certificate' | 'ecard' | 'form' | 'portal' | 'agreement' | 'permit';
  industry: string;
  userType: 'end-user' | 'internal-department' | 'government';
  description: string;
  problem: string;
  solution: string;
  features: string[];
  screenshots: string[];
  technologies: string[];
  testimonial?: string;
}
