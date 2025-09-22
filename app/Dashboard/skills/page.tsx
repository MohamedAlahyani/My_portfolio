"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Save, Eye, Plus, Edit, Trash2, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number // 0-100 percentage
  description?: string
}

const skillCategories = [
  { value: "programming", label: "Programming Languages" },
  { value: "frontend", label: "Frontend Technologies" },
  { value: "backend", label: "Backend Technologies" },
  { value: "database", label: "Databases" },
  { value: "tools", label: "Tools & Software" },
  { value: "other", label: "Other Skills" },
]

// Default skills based on the user's portfolio
const defaultSkills: Skill[] = [
  { id: "1", name: "JavaScript", category: "programming", proficiency: 90 },
  { id: "2", name: "Python", category: "programming", proficiency: 85 },
  { id: "3", name: "React", category: "frontend", proficiency: 88 },
  { id: "4", name: "React.js", category: "frontend", proficiency: 88 },
  { id: "5", name: "Node.js", category: "backend", proficiency: 80 },
  { id: "6", name: "HTML/CSS", category: "frontend", proficiency: 95 },
  { id: "7", name: "Tailwind CSS", category: "frontend", proficiency: 85 },
  { id: "8", name: "C", category: "programming", proficiency: 75 },
  { id: "9", name: "MongoDB", category: "database", proficiency: 70 },
  { id: "10", name: "Java", category: "programming", proficiency: 80 },
  { id: "11", name: "Git", category: "tools", proficiency: 85 },
]

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isPreview, setIsPreview] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "programming",
    proficiency: 50,
    description: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    const savedSkills = localStorage.getItem("cms-skills-data")
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills))
    } else {
      // Load default skills if none exist
      setSkills(defaultSkills)
      localStorage.setItem("cms-skills-data", JSON.stringify(defaultSkills))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("cms-skills-data", JSON.stringify(skills))
    toast({
      title: "Success",
      description: "Skills have been saved successfully.",
    })
  }

  const handleAddSkill = () => {
    if (!formData.name || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newSkill: Skill = {
      id: editingSkill?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      proficiency: formData.proficiency,
      description: formData.description,
    }

    if (editingSkill) {
      setSkills(skills.map((skill) => (skill.id === editingSkill.id ? newSkill : skill)))
    } else {
      setSkills([...skills, newSkill])
    }

    setFormData({ name: "", category: "programming", proficiency: 50, description: "" })
    setEditingSkill(null)
    setIsDialogOpen(false)

    toast({
      title: "Success",
      description: editingSkill ? "Skill updated successfully." : "Skill added successfully.",
    })
  }

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      description: skill.description || "",
    })
    setIsDialogOpen(true)
  }

  const handleDeleteSkill = (skillId: string) => {
    setSkills(skills.filter((skill) => skill.id !== skillId))
    toast({
      title: "Success",
      description: "Skill deleted successfully.",
    })
  }

  if (isPreview) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Skills Preview
              </h1>
              <p className="text-slate-400">Preview how your skills will be displayed on your portfolio</p>
            </div>
            <Button
              onClick={() => setIsPreview(false)}
              variant="outline"
              className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
            >
              <Eye className="mr-2 h-4 w-4" />
              Edit Mode
            </Button>
          </div>

          <div className="bg-slate-950 rounded-lg p-8 border border-slate-800">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6">
                  <span className="text-purple-300 text-sm font-medium">Technical Expertise</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">My Skills</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="text-center space-y-3">
                      <h3 className="text-white font-medium text-sm">{skill.name}</h3>
                      <div className="relative">
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                        <span className="text-purple-300 text-xs font-medium mt-1 block">{skill.proficiency}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {skills.length === 0 && (
                <div className="text-center py-12">
                  <Code className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No skills added yet. Add some skills to see them here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const groupedSkills = skillCategories
    .map((category) => ({
      ...category,
      skills: skills.filter((skill) => skill.category === category.value),
    }))
    .filter((group) => group.skills.length > 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills Proficiency Manager
            </h1>
            <p className="text-slate-400">Manage your technical skills and proficiency levels</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsPreview(true)}
              variant="outline"
              className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingSkill(null)
                    setFormData({ name: "", category: "programming", proficiency: 50, description: "" })
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-white">{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    {editingSkill ? "Update the skill information." : "Add a new skill to your portfolio."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill-name" className="text-slate-300">
                      Skill Name *
                    </Label>
                    <Input
                      id="skill-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., React, Python, Figma"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skill-category" className="text-slate-300">
                      Category *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {skillCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value} className="text-white">
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skill-proficiency" className="text-slate-300">
                      Proficiency Level: {formData.proficiency}%
                    </Label>
                    <Slider
                      value={[formData.proficiency]}
                      onValueChange={(value) => setFormData({ ...formData, proficiency: value[0] })}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skill-description" className="text-slate-300">
                      Description (Optional)
                    </Label>
                    <Input
                      id="skill-description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description or context"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddSkill}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {editingSkill ? "Update Skill" : "Add Skill"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {groupedSkills.map((group) => (
            <Card key={group.value} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-400" />
                  {group.label}
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {group.skills.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-4 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-white">{skill.name}</span>
                          <Badge
                            variant="outline"
                            className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
                          >
                            {skill.proficiency}%
                          </Badge>
                        </div>
                        {skill.description && <p className="text-sm text-slate-400 mb-2">{skill.description}</p>}
                        <div className="w-48 bg-slate-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSkill(skill)}
                          className="text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="text-slate-400 hover:text-red-400 hover:bg-slate-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {skills.length === 0 && (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-8 text-center">
                <div className="space-y-3">
                  <Code className="h-12 w-12 mx-auto text-slate-600" />
                  <h3 className="text-lg font-medium text-white">No skills added yet</h3>
                  <p className="text-slate-400">Start building your skills portfolio by adding your first skill.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
