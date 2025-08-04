// Database types for type safety
export interface AboutMe {
  id: string
  content: string
  name: string
  email: string
  location: string
  availability: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image_url: string | null
  demo_url: string
  repo_url: string
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  level: number
  updated_at: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  start_date: string | null
  end_date: string | null
  updated_at: string
}

export interface ContactInfo {
  id: string
  email: string
  linkedin_url: string
  github_url: string
  instagram_url: string
  availability_status: string
  updated_at: string
}

export interface HeroSection {
  id: string
  headline: string
  description: string
  profile_picture_url: string
  updated_at: string
}
