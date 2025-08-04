"use client"

import React, { useEffect } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { addSkill, updateSkill } from "@/app/dashboard/actions"
import type { Skill } from "@/lib/portfolio-data"

interface SkillFormProps {
  initialData?: Skill | null
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
      {pending ? (isEditing ? "Saving..." : "Adding...") : isEditing ? "Save Changes" : "Add Skill"}
    </Button>
  )
}

export function SkillForm({ initialData, onSuccess }: SkillFormProps) {
  const isEditing = !!initialData
  const [state, formAction] = useActionState(isEditing ? updateSkill : addSkill, initialState)
  const { toast } = useToast()
  const [level, setLevel] = React.useState(initialData?.level || 50)

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
        <Label htmlFor="name">Skill Name</Label>
        <Input id="name" name="name" required defaultValue={initialData?.name || ""} />
      </div>
      <div>
        <Label htmlFor="level">Proficiency Level: {level}%</Label>
        <Slider
          id="level"
          name="level"
          min={0}
          max={100}
          step={1}
          value={[level]}
          onValueChange={(val) => setLevel(val[0])}
          className="mt-2"
        />
        <input type="hidden" name="level" value={level} />
      </div>
      <SubmitButton isEditing={isEditing} />
    </form>
  )
}
