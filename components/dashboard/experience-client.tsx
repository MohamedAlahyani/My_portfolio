"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ExperienceForm } from "@/components/dashboard/experience-form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteExperienceEntry } from "@/app/dashboard/actions"
import { useToast } from "@/hooks/use-toast"

interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  start_date: string
  end_date: string
}

interface ExperienceClientProps {
  initialExperiences: Experience[]
}

export function ExperienceClient({ initialExperiences }: ExperienceClientProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences)
  const [isAddExperienceDialogOpen, setIsAddExperienceDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const { toast } = useToast()

  const handleExperienceAdded = () => {
    setIsAddExperienceDialogOpen(false)
    // In a real app, you'd re-fetch data or update state more robustly
    // For in-memory, we'll just close the dialog. The action revalidates.
  }

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience)
  }

  const handleExperienceUpdated = () => {
    setEditingExperience(null)
    // In a real app, you'd re-fetch data or update state more robustly
    // For in-memory, we'll just close the dialog. The action revalidates.
  }

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this experience entry?")) {
      const result = await deleteExperienceEntry(id)
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })
        setExperiences((prev) => prev.filter((exp) => exp.id !== id))
      } else {
        toast({
          title: "Error!",
          description: result.message,
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Experience Management</h1>
          <p className="text-zinc-600">Manage your professional work experience entries.</p>
        </div>
        <Dialog open={isAddExperienceDialogOpen} onOpenChange={setIsAddExperienceDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Experience Entry</DialogTitle>
            </DialogHeader>
            <ExperienceForm onSuccess={handleExperienceAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white border border-zinc-200 shadow-sm">
        <CardContent className="p-6">
          {experiences.length === 0 ? (
            <div className="text-center text-zinc-600 py-10">No experience entries found.</div>
          ) : (
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative bg-zinc-50 border border-zinc-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900">{exp.title}</h3>
                      <p className="text-zinc-700 text-sm">
                        {exp.company} | {exp.period}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditExperience(exp)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteExperience(exp.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-zinc-600 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <Dialog open={!!editingExperience} onOpenChange={() => setEditingExperience(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Experience Entry</DialogTitle>
            </DialogHeader>
            {editingExperience && (
              <ExperienceForm initialData={editingExperience} onSuccess={handleExperienceUpdated} />
            )}
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  )
}
