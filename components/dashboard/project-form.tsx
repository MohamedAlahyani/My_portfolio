"use client"
import { useEffect } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { addProject, updateProject } from "@/app/dashboard/actions"
import type { Project } from "@/lib/portfolio-data"

interface ProjectFormProps {
  initialData?: Project | null
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
      {pending ? (isEditing ? "Saving..." : "Adding...") : isEditing ? "Save Changes" : "Add Project"}
    </Button>
  )
}

export function ProjectForm({ initialData, onSuccess }: ProjectFormProps) {
  const isEditing = !!initialData
  const [state, formAction] = useActionState(isEditing ? updateProject : addProject, initialState)
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
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required defaultValue={initialData?.description || ""} />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input id="tags" name="tags" required defaultValue={initialData?.tags.join(", ") || ""} />
      </div>
      <div>
        <Label htmlFor="demoUrl">Demo URL</Label>
        <Input id="demoUrl" name="demoUrl" type="url" defaultValue={initialData?.demo_url || ""} />
      </div>
      <div>
        <Label htmlFor="repoUrl">Repo URL</Label>
        <Input id="repoUrl" name="repoUrl" type="url" defaultValue={initialData?.repo_url || ""} />
      </div>
      <SubmitButton isEditing={isEditing} />
    </form>
  )
}
