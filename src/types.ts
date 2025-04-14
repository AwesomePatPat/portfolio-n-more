export interface Skill {
  name: string;
  level: number;
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
}

export interface NavItem {
  id: string;
  name: string;
}
