"use client"
import { useEffect } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { updateAboutMe } from "@/app/dashboard/actions"

export interface AboutMeData {
  id?: string
  name: string
  email: string
  location: string
  availability: string
  content: string
  updated_at?: string
}

interface AboutClientProps {
  initialData: AboutMeData
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

export function AboutClient({ initialData }: AboutClientProps) {
  const [state, formAction] = useActionState(updateAboutMe, initialState)
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
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white border border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-zinc-900">About Me Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="id" value={initialData.id} />
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required defaultValue={initialData.name} />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required defaultValue={initialData.email} />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" required defaultValue={initialData.location} />
            </div>

            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input id="availability" name="availability" required defaultValue={initialData.availability} />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" required rows={8} defaultValue={initialData.content} />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
