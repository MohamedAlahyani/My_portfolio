import { getExperience } from "@/app/dashboard/actions"
import { ExperienceClient } from "@/components/dashboard/experience-client"

interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  start_date: string
  end_date: string
}

export default async function ManageExperiencePage() {
  const initialExperiences = await getExperience()

  return <ExperienceClient initialExperiences={initialExperiences as Experience[]} />
}
