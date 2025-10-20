export interface Skill {
  name: string;
  color: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  longDescription?: string;
  provider?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
}

export interface NavItem {
  id: string;
  name: string;
}
