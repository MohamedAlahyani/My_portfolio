"use client"
import { useEffect } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { updateContactInfo } from "@/app/dashboard/actions"

export interface ContactInfoData {
  id: string
  email: string
  linkedin_url: string
  github_url: string
  instagram_url: string
  availability_status: string
}

interface ContactClientProps {
  initialData: ContactInfoData
}

const initialState = {
  success: false,
  message: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  )
}

export function ContactClient({ initialData }: ContactClientProps) {
  const [state, formAction] = useActionState(updateContactInfo, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state, toast])

  return (
    <Card className="bg-white border border-zinc-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-zinc-900">Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <input type="hidden" name="id" value={initialData.id} />
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required defaultValue={initialData.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
            <Input id="linkedin_url" name="linkedin_url" type="url" defaultValue={initialData.linkedin_url} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input id="github_url" name="github_url" type="url" defaultValue={initialData.github_url} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram_url">Instagram URL</Label>
            <Input id="instagram_url" name="instagram_url" type="url" defaultValue={initialData.instagram_url} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availability_status">Availability Status</Label>
            <Input
              id="availability_status"
              name="availability_status"
              required
              defaultValue={initialData.availability_status}
            />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
