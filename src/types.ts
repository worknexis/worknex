export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  category: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  location: string;
  salary: string;
  postedAt: string;
  description: string;
  requirements: string[];
  benefits: string[];
  featured?: boolean;
  applyUrl?: string;
  companyWebsite: string;
  companyDescription: string;
  ownerId?: string;
}

export interface JobCategory {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  count: number;
  description?: string;
  graphicUrl?: string;
}
