import { getContactInfo } from "@/app/dashboard/actions"
import { ContactClient, type ContactInfoData } from "@/components/dashboard/contact-client"

export default async function EditContactInfoPage() {
  const contactInfoData = await getContactInfo()

  if (!contactInfoData) {
    return (
      <div className="text-center text-zinc-600 py-10">No contact info data found. Please check the data source.</div>
    )
  }

  return <ContactClient initialData={contactInfoData as ContactInfoData} />
}
