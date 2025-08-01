import { getProjects } from "@/app/dashboard/actions"
import { ProjectsClient } from "@/components/dashboard/projects-client"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image_url: string | null
  demo_url: string
  repo_url: string
}

export default async function ManageProjectsPage() {
  const initialProjects = await getProjects()
  // Add a dummy status for demonstration, you'd fetch this from DB
  const projectsWithStatus = initialProjects.map((p, i) => ({
    ...p,
    status: i % 3 === 0 ? "Published" : i % 3 === 1 ? "Draft" : "Featured",
  })) as (Project & { status: "Published" | "Draft" | "Featured" })[]

  return <ProjectsClient initialProjects={projectsWithStatus} />
}
