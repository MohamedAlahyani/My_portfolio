import { portfolioData } from "./portfolio-data"
import type { AboutMe, Project, Skill, Experience, ContactInfo, HeroSection } from "./database-types"

// Server-side data fetching functions (from in-memory data)

export async function getAboutMeData(): Promise<AboutMe | null> {
  try {
    const data = portfolioData.aboutMe as AboutMe | null
    return data
  } catch (err: any) {
    console.error("Error fetching about me data:", err)
    return null
  }
}

export async function getProjectsData(): Promise<Project[]> {
  try {
    const data = portfolioData.projects as Project[]
    return data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } catch (err: any) {
    console.error("Error fetching projects:", err)
    return []
  }
}

export async function getSkillsData(): Promise<Skill[]> {
  try {
    const data = portfolioData.skills as Skill[]
    return data.sort((a, b) => b.level - a.level)
  } catch (err: any) {
    console.error("Error fetching skills:", err)
    return []
  }
}

export async function getExperienceData(): Promise<Experience[]> {
  try {
    const data = portfolioData.experience as Experience[]
    return data.sort((a, b) => {
      const dateA = a.start_date ? new Date(a.start_date).getTime() : 0
      const dateB = b.start_date ? new Date(b.start_date).getTime() : 0
      return dateB - dateA
    })
  } catch (err: any) {
    console.error("Error fetching experience:", err)
    return []
  }
}

export async function getContactInfoData(): Promise<ContactInfo | null> {
  try {
    const data = portfolioData.contactInfo as ContactInfo | null
    return data
  } catch (err: any) {
    console.error("Error fetching contact info:", err)
    return null
  }
}

export async function getHeroSectionData(): Promise<HeroSection | null> {
  try {
    const data = portfolioData.heroSection as HeroSection | null
    return data
  } catch (err: any) {
    console.error("Error fetching hero section:", err)
    return null
  }
}
