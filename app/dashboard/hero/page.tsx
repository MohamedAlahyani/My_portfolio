import { getHeroSection } from "@/app/dashboard/actions"
import { HeroClient } from "@/components/dashboard/hero-client"

interface HeroSectionData {
  id: string
  headline: string
  description: string
  profile_picture_url: string
}

export default async function ChangeHeroSectionPage() {
  const heroData = await getHeroSection()

  return <HeroClient initialData={heroData as HeroSectionData} />
}
