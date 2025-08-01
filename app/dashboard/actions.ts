"use server"
import { portfolioData, generateUUID } from "@/lib/portfolio-data"
import { revalidatePath } from "next/cache"
import type { AboutMe, Project, Skill, Experience, ContactInfo, HeroSection } from "@/lib/database-types"

/**
 * Read-only helpers that surface portfolio data to the dashboard pages.
 * They return **plain JavaScript objects** from the in-memory
 * `portfolioData` source in `@/lib/portfolio-data`.
 *
 * No mutation helpers are exported because the project is now strictly
 * “view-only”.
 */

// About Me Actions
export async function getAboutMe(): Promise<AboutMe | null> {
  try {
    // Simulate database fetch
    return portfolioData.aboutMe
  } catch (error: any) {
    console.error("Error fetching about me:", error)
    return null
  }
}

export async function updateAboutMe(_prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    const id = formData.get("id") as string
    const updates = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      location: formData.get("location") as string,
      availability: formData.get("availability") as string,
      content: formData.get("content") as string,
      updated_at: new Date().toISOString(),
    }

    // Simulate database update
    if (portfolioData.aboutMe.id === id) {
      Object.assign(portfolioData.aboutMe, updates)
    } else {
      throw new Error("About Me entry not found.")
    }

    revalidatePath("/dashboard/about")
    revalidatePath("/")
    return { success: true, message: "About me section updated successfully!" }
  } catch (error: any) {
    console.error("Error updating about me:", error)
    return { success: false, message: error.message || "Failed to update about me section" }
  }
}

// Projects Actions
export async function getProjects(): Promise<Project[]> {
  try {
    // Simulate database fetch
    return [...portfolioData.projects].sort(
      (a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime(),
    )
  } catch (err: any) {
    console.error("Error fetching projects:", err)
    return []
  }
}

export async function addProject(_prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    const newProject: Project = {
      id: generateUUID(), // Generate a new ID
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
      demo_url: formData.get("demoUrl") as string,
      repo_url: formData.get("repoUrl") as string,
      image_url: "/placeholder.svg?height=400&width=600", // Placeholder image
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Simulate database insert
    portfolioData.projects.unshift(newProject) // Add to the beginning

    revalidatePath("/dashboard/projects")
    revalidatePath("/")
    return { success: true, message: "Project added successfully!" }
  } catch (error: any) {
    console.error("Error adding project:", error)
    return { success: false, message: error.message || "Failed to add project" }
  }
}

export async function updateProject(_prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    const id = formData.get("id") as string
    const updates = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
      demo_url: formData.get("demoUrl") as string,
      repo_url: formData.get("repoUrl") as string,
      updated_at: new Date().toISOString(),
    }

    // Simulate database update
    const projectIndex = portfolioData.projects.findIndex((p) => p.id === id)
    if (projectIndex > -1) {
      Object.assign(portfolioData.projects[projectIndex], updates)
    } else {
      throw new Error("Project not found.")
    }

    revalidatePath("/dashboard/projects")
    revalidatePath("/")
    return { success: true, message: "Project updated successfully!" }
  } catch (error: any) {
    console.error("Error updating project:", error)
    return { success: false, message: error.message || "Failed to update project" }
  }
}

export async function deleteProject(id: string) {
  try {
    // Simulate database delete
    const initialLength = portfolioData.projects.length
    portfolioData.projects = portfolioData.projects.filter((p) => p.id !== id)
    if (portfolioData.projects.length === initialLength) {
      throw new Error("Project not found.")
    }

    revalidatePath("/dashboard/projects")
    revalidatePath("/")
    return { success: true, message: "Project deleted successfully!" }
  } catch (error: any) {
    console.error("Error deleting project:", error)
    return { success: false, message: error.message || "Failed to delete project" }
  }
}

// Skills Actions
export async function getSkills(): Promise<Skill[]> {
  try {
    // Simulate database fetch
    return [...portfolioData.skills].sort((a, b) => b.level - a.level)
  } catch (error: any) {
    console.error("Error fetching skills:", error)
    return []
  }
}

export async function addSkill(_prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    const newSkill: Skill = {
      id: generateUUID(), // Generate a new ID
      name: formData.get("name") as string,
      level: Number.parseInt(formData.get("level") as string),
      updated_at: new Date().toISOString(),
    }

    // Simulate database insert
    portfolioData.skills.unshift(newSkill) // Add to the beginning

    revalidatePath("/dashboard/skills")
    revalidatePath("/")
    return { success: true, message: "Skill added successfully!" }
  } catch (error: any) {
    console.error("Error adding skill:", error)
    return { success: false, message: error.message || "Failed to add skill" }
  }
}

export async function updateSkill(_prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    const id = formData.get("id") as string
    const updates = {
      name: formData.get("name") as string,
      level: Number.parseInt(formData.get("level") as string),
      updated_at: new Date().toISOString(),
    }

    // Simulate database update
    const skillIndex = portfolioData.skills.findIndex((s) => s.id === id)
    if (skillIndex > -1) {
      Object.assign(portfolioData.skills[skillIndex], updates)
    } else {
      throw new Error("Skill not found.")
    }

    revalidatePath("/dashboard/skills")
    revalidatePath("/")
    return { success: true, message: "Skill updated successfully!" }
  } catch (error: any) {
    console.error("Error updating skill:", error)
    return { success: false, message: error.message || "Failed to update skill" }
  }
}

export async function deleteSkill(id: string) {
  try {
    // Simulate database delete
    const initialLength = portfolioData.skills.length
    portfolioData.skills = portfolioData.skills.filter((s) => s.id !== id)
    if (portfolioData.skills.length === initialLength) {
      throw new Error("Skill not found.")
    }

    revalidatePath("/dashboard/skills")
    revalidatePath("/")
    return { success: true, message: "Skill deleted successfully!" }
  } catch (error: any) {
    console.error("Error deleting skill:", error)
    return { success: false, message: error.message || "Failed to delete skill" }
  }
}

// Experience Actions
export async function getExperience(): Promise<Experience[]> {
  try {
    // Simulate database fetch
    return [...portfolioData.experience].sort((a, b) => {
      const dateA = a.start_date ? new Date(a.start_date).getTime() : 0
      const dateB = b.start_date ? new Date(b.start_date).getTime() : 0
      return dateB - dateA
    })
  } catch (error: any) {
    console.error("Error fetching experience:", error)
    return []
  }
}

export async function addExperienceEntry(_prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    const newExperience: Experience = {
      id: generateUUID(), // Generate a new ID
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
      start_date: (formData.get("start_date") as string) || null,
      end_date: (formData.get("end_date") as string) || null,
      updated_at: new Date().toISOString(),
    }

    // Simulate database insert
    portfolioData.experience.unshift(newExperience) // Add to the beginning

    revalidatePath("/dashboard/experience")
    revalidatePath("/")
    return { success: true, message: "Experience entry added successfully!" }
  } catch (error: any) {
    console.error("Error adding experience entry:", error)
    return { success: false, message: error.message || "Failed to add experience entry" }
  }
}

export async function updateExperienceEntry(_prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    const id = formData.get("id") as string
    const updates = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
      start_date: (formData.get("start_date") as string) || null,
      end_date: (formData.get("end_date") as string) || null,
      updated_at: new Date().toISOString(),
    }

    // Simulate database update
    const experienceIndex = portfolioData.experience.findIndex((e) => e.id === id)
    if (experienceIndex > -1) {
      Object.assign(portfolioData.experience[experienceIndex], updates)
    } else {
      throw new Error("Experience entry not found.")
    }

    revalidatePath("/dashboard/experience")
    revalidatePath("/")
    return { success: true, message: "Experience entry updated successfully!" }
  } catch (error: any) {
    console.error("Error updating experience entry:", error)
    return { success: false, message: error.message || "Failed to update experience entry" }
  }
}

export async function deleteExperienceEntry(id: string) {
  try {
    // Simulate database delete
    const initialLength = portfolioData.experience.length
    portfolioData.experience = portfolioData.experience.filter((e) => e.id !== id)
    if (portfolioData.experience.length === initialLength) {
      throw new Error("Experience entry not found.")
    }

    revalidatePath("/dashboard/experience")
    revalidatePath("/")
    return { success: true, message: "Experience entry deleted successfully!" }
  } catch (error: any) {
    console.error("Error deleting experience entry:", error)
    return { success: false, message: error.message || "Failed to delete experience entry" }
  }
}

// Contact Info Actions
export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    // Simulate database fetch
    return portfolioData.contactInfo
  } catch (error: any) {
    console.error("Error fetching contact info:", error)
    return null
  }
}

export async function updateContactInfo(_prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    const id = formData.get("id") as string
    const updates = {
      email: formData.get("email") as string,
      linkedin_url: formData.get("linkedin_url") as string,
      github_url: formData.get("github_url") as string,
      instagram_url: formData.get("instagram_url") as string,
      availability_status: formData.get("availability_status") as string,
      updated_at: new Date().toISOString(),
    }

    // Simulate database update
    if (portfolioData.contactInfo.id === id) {
      Object.assign(portfolioData.contactInfo, updates)
    } else {
      throw new Error("Contact Info entry not found.")
    }

    revalidatePath("/dashboard/contact")
    revalidatePath("/")
    return { success: true, message: "Contact information updated successfully!" }
  } catch (error: any) {
    console.error("Error updating contact info:", error)
    return { success: false, message: error.message || "Failed to update contact information" }
  }
}

// Hero Section Actions
export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    // Simulate database fetch
    return portfolioData.heroSection
  } catch (error: any) {
    console.error("Error fetching hero section:", error)
    return null
  }
}

export async function updateHeroSection(_prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    const id = formData.get("id") as string
    const updates = {
      headline: formData.get("headline") as string,
      description: formData.get("description") as string,
      // profile_picture_url: formData.get("profile_picture_url") as string, // If you want to allow updating URL directly
      updated_at: new Date().toISOString(),
    }

    // Handle file upload if provided - removed actual upload logic
    const profilePicture = formData.get("profile_picture") as File
    if (profilePicture && profilePicture.size > 0) {
      // In a real app, you'd upload to a storage service.
      // For this in-memory version, we'll just keep the existing URL or set a placeholder.
      // If you want to allow changing the image, you'd need a way to store it.
      // For now, we'll just ignore the file input for in-memory updates.
      console.warn(
        "Image upload is not supported in in-memory mode. Profile picture URL will not be updated via file input.",
      )
    }

    // Simulate database update
    if (portfolioData.heroSection.id === id) {
      Object.assign(portfolioData.heroSection, updates)
    } else {
      throw new Error("Hero Section entry not found.")
    }

    revalidatePath("/dashboard/hero")
    revalidatePath("/")
    return { success: true, message: "Hero section updated successfully!" }
  } catch (error: any) {
    console.error("Error updating hero section:", error)
    return { success: false, message: error.message || "Failed to update hero section" }
  }
}
