export interface NavLink {
  name: string;
  href: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Project {
  title: string;
  description: string;
  icon: string;
  technologies: string[];
}
