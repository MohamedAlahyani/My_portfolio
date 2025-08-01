import { getSkills } from "@/app/dashboard/actions"
import { SkillsClient } from "@/components/dashboard/skills-client"

interface Skill {
  id: string
  name: string
  level: number
}

export default async function ManageSkillsPage() {
  const initialSkills = await getSkills()

  return <SkillsClient initialSkills={initialSkills as Skill[]} />
}
