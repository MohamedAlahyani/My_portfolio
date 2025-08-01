import { getAboutMe } from "@/app/dashboard/actions"
import { AboutClient, type AboutMeData } from "@/components/dashboard/about-client"

export default async function AboutMePage() {
  const aboutMeData = await getAboutMe()

  if (!aboutMeData) {
    return <div className="text-center text-zinc-600 py-10">No about me data found. Please check the data source.</div>
  }

  return <AboutClient initialData={aboutMeData as AboutMeData} />
}
