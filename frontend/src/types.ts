export interface Skill {
  name: string
  color: string
}

export interface Language {
  name: string
  level: string
}

export interface Project {
  id: number
  title: string
  description: string
  icon: string
  longDescription?: string
  provider?: string
  technologies?: string[]
  startDate?: string
  endDate?: string
  erfolgId?: number
}

export interface ExternalLink {
  type: 'linkedin' | 'instagram' | 'youtube' | 'twitter' | 'website' | 'github' | 'facebook'
  url: string
  label?: string
}

export interface Erfolg {
  id: number
  title: string
  description: string
  icon: string
  longDescription?: string
  date?: string
  category?: string
  images?: string[]
  achievements?: string[]
  links?: ExternalLink[]
}

export interface NavItem {
  id: string
  name: string
}
