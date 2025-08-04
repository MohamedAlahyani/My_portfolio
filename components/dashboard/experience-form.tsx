"use client"
import { useEffect } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { addExperienceEntry, updateExperienceEntry } from "@/app/dashboard/actions"
import type { Experience } from "@/lib/portfolio-data"

interface ExperienceFormProps {
  initialData?: Experience | null
  onSuccess?: () => void
}

const initialState = {
  success: false,
  message: "",
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isEditing ? "Saving..." : "Adding...") : isEditing ? "Save Changes" : "Add Entry"}
    </Button>
  )
}

export function ExperienceForm({ initialData, onSuccess }: ExperienceFormProps) {
  const isEditing = !!initialData
  const [state, formAction] = useActionState(isEditing ? updateExperienceEntry : addExperienceEntry, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
      if (state.success && onSuccess) {
        onSuccess()
      }
    }
  }, [state, toast, onSuccess])

  return (
    <form action={formAction} className="space-y-4">
      {isEditing && <input type="hidden" name="id" value={initialData.id} />}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required defaultValue={initialData?.title || ""} />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" required defaultValue={initialData?.company || ""} />
      </div>
      <div>
        <Label htmlFor="period">Period (e.g., "2021 - Present")</Label>
        <Input id="period" name="period" required defaultValue={initialData?.period || ""} />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required defaultValue={initialData?.description || ""} />
      </div>
      <div>
        <Label htmlFor="start_date">Start Date (YYYY-MM-DD)</Label>
        <Input id="start_date" name="start_date" type="date" defaultValue={initialData?.start_date || ""} />
      </div>
      <div>
        <Label htmlFor="end_date">End Date (YYYY-MM-DD, leave blank if present)</Label>
        <Input id="end_date" name="end_date" type="date" defaultValue={initialData?.end_date || ""} />
      </div>
      <SubmitButton isEditing={isEditing} />
    </form>
  )
}
