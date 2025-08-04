"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SkillForm } from "@/components/dashboard/skill-form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteSkill } from "@/app/dashboard/actions"
import { useToast } from "@/hooks/use-toast"

interface Skill {
  id: string
  name: string
  level: number
}

interface SkillsClientProps {
  initialSkills: Skill[]
}

export function SkillsClient({ initialSkills }: SkillsClientProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const { toast } = useToast()

  const handleSkillAdded = () => {
    setIsAddSkillDialogOpen(false)
    // In a real app, you'd re-fetch data or update state more robustly
    // For in-memory, we'll just close the dialog. The action revalidates.
  }

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill)
  }

  const handleSkillUpdated = () => {
    setEditingSkill(null)
    // In a real app, you'd re-fetch data or update state more robustly
    // For in-memory, we'll just close the dialog. The action revalidates.
  }

  const handleDeleteSkill = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      const result = await deleteSkill(id)
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })
        setSkills((prev) => prev.filter((s) => s.id !== id))
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
          <h1 className="text-3xl font-bold text-zinc-900">Skills Management</h1>
          <p className="text-zinc-600">Manage your technical skills and proficiency levels.</p>
        </div>
        <Dialog open={isAddSkillDialogOpen} onOpenChange={setIsAddSkillDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
            </DialogHeader>
            <SkillForm onSuccess={handleSkillAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white border border-zinc-200 shadow-sm">
        <CardContent className="p-6">
          {skills.length === 0 ? (
            <div className="text-center text-zinc-600 py-10">No skills found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <div key={skill.id} className="relative bg-zinc-50 border border-zinc-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-zinc-900">{skill.name}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditSkill(skill)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteSkill(skill.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={skill.level} className="h-2 flex-1" />
                    <span className="text-sm font-medium text-zinc-700">{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <Dialog open={!!editingSkill} onOpenChange={() => setEditingSkill(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Skill</DialogTitle>
            </DialogHeader>
            {editingSkill && <SkillForm initialData={editingSkill} onSuccess={handleSkillUpdated} />}
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  )
}
