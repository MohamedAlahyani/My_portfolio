"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { updateHeroSection } from "@/app/dashboard/actions"
import Image from "next/image"

interface HeroSectionData {
  id: string
  headline: string
  description: string
  profile_picture_url: string
}

interface HeroClientProps {
  initialData: HeroSectionData
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

export function HeroClient({ initialData }: HeroClientProps) {
  const [state, formAction] = useActionState(updateHeroSection, initialState)
  const { toast } = useToast()
  const [previewImage, setPreviewImage] = useState<string | null>(initialData.profile_picture_url)

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state, toast])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewImage(initialData.profile_picture_url)
    }
  }

  return (
    <Card className="bg-white border border-zinc-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-zinc-900">Hero Section Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <input type="hidden" name="id" value={initialData.id} />
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" name="headline" required defaultValue={initialData.headline} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required rows={5} defaultValue={initialData.description} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile_picture">Profile Picture</Label>
            <div className="flex items-center gap-4">
              {previewImage && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-zinc-200 flex-shrink-0">
                  <Image
                    src={previewImage || "/placeholder.svg"}
                    alt="Profile Preview"
                    fill
                    style={{ objectFit: "cover" }}
                    className="object-cover"
                  />
                </div>
              )}
              <Input
                id="profile_picture"
                name="profile_picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <p className="text-sm text-zinc-500">Current URL: {initialData.profile_picture_url}</p>
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
