"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Save, Eye, Plus, Edit, Trash2, GraduationCap, Award, BookOpen, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Education {
  id: string
  title: string
  institution: string
  type: string
  degree?: string
  field?: string
  startDate: string
  endDate?: string
  current: boolean
  grade?: string
  gpa?: string
  description?: string
  achievements?: string[]
  credentialUrl?: string
  location?: string
}

const educationTypes = [
  { value: "degree", label: "Degree", icon: GraduationCap },
  { value: "certification", label: "Certification", icon: Award },
  { value: "course", label: "Online Course", icon: BookOpen },
  { value: "bootcamp", label: "Bootcamp", icon: BookOpen },
  { value: "workshop", label: "Workshop", icon: BookOpen },
  { value: "other", label: "Other", icon: BookOpen },
]

const degreeTypes = [
  "High School Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctoral Degree",
  "Professional Degree",
]

// Default education entries based on the user's portfolio
const defaultEducation: Education[] = [
  {
    id: "1",
    title: "Bachelor of Science in Computer Science",
    institution: "University Name",
    type: "degree",
    degree: "Bachelor's Degree",
    field: "Computer Science",
    startDate: "2020-09",
    endDate: "2024-05",
    current: false,
    description:
      "Building strong technical skills through projects and hands-on learning. Focusing on software development, data structures, algorithms, and databases. Building strong technical skills through projects and hands-on learning.",
    location: "University Location",
  },
  {
    id: "2",
    title: "Minor in Business Administration",
    institution: "University Name",
    type: "degree",
    degree: "Minor",
    field: "Business Administration",
    startDate: "2021-09",
    endDate: "2024-05",
    current: false,
    description:
      "Complementing technical skills with business acumen, including management, marketing, finance, and entrepreneurship. My technical background.",
    location: "University Location",
  },
  {
    id: "3",
    title: "Baccalaureate",
    institution: "High School Name",
    type: "degree",
    degree: "High School Diploma",
    field: "General Studies",
    startDate: "2016-09",
    endDate: "2020-06",
    current: false,
    description: "Completed with a specialization in Science (Physics).",
    location: "High School Location",
  },
]

export default function EducationPage() {
  const [educations, setEducations] = useState<Education[]>([])
  const [isPreview, setIsPreview] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    institution: "",
    type: "degree",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
    grade: "",
    gpa: "",
    description: "",
    achievements: "",
    credentialUrl: "",
    location: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    const savedEducation = localStorage.getItem("cms-education-data")
    if (savedEducation) {
      setEducations(JSON.parse(savedEducation))
    } else {
      // Load default education if none exist
      setEducations(defaultEducation)
      localStorage.setItem("cms-education-data", JSON.stringify(defaultEducation))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("cms-education-data", JSON.stringify(educations))
    toast({
      title: "Success",
      description: "Education records have been saved successfully.",
    })
  }

  const handleAddEducation = () => {
    if (!formData.title || !formData.institution || !formData.type || !formData.startDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newEducation: Education = {
      id: editingEducation?.id || Date.now().toString(),
      title: formData.title,
      institution: formData.institution,
      type: formData.type,
      degree: formData.degree,
      field: formData.field,
      startDate: formData.startDate,
      endDate: formData.current ? undefined : formData.endDate,
      current: formData.current,
      grade: formData.grade,
      gpa: formData.gpa,
      description: formData.description,
      achievements: formData.achievements
        .split(",")
        .map((achievement) => achievement.trim())
        .filter(Boolean),
      credentialUrl: formData.credentialUrl,
      location: formData.location,
    }

    if (editingEducation) {
      setEducations(educations.map((education) => (education.id === editingEducation.id ? newEducation : education)))
    } else {
      setEducations([...educations, newEducation])
    }

    setFormData({
      title: "",
      institution: "",
      type: "degree",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      grade: "",
      gpa: "",
      description: "",
      achievements: "",
      credentialUrl: "",
      location: "",
    })
    setEditingEducation(null)
    setIsDialogOpen(false)

    toast({
      title: "Success",
      description: editingEducation ? "Education record updated successfully." : "Education record added successfully.",
    })
  }

  const handleEditEducation = (education: Education) => {
    setEditingEducation(education)
    setFormData({
      title: education.title,
      institution: education.institution,
      type: education.type,
      degree: education.degree || "",
      field: education.field || "",
      startDate: education.startDate,
      endDate: education.endDate || "",
      current: education.current,
      grade: education.grade || "",
      gpa: education.gpa || "",
      description: education.description || "",
      achievements: education.achievements?.join(", ") || "",
      credentialUrl: education.credentialUrl || "",
      location: education.location || "",
    })
    setIsDialogOpen(true)
  }

  const handleDeleteEducation = (educationId: string) => {
    setEducations(educations.filter((education) => education.id !== educationId))
    toast({
      title: "Success",
      description: "Education record deleted successfully.",
    })
  }

  const getTypeIcon = (type: string) => {
    const educationType = educationTypes.find((t) => t.value === type)
    return educationType?.icon || BookOpen
  }

  const getTypeLabel = (type: string) => {
    return educationTypes.find((t) => t.value === type)?.label || type
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const sortedEducations = [...educations].sort((a, b) => {
    // Sort by start date, most recent first
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  })

  if (isPreview) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Education Timeline Preview
              </h1>
              <p className="text-slate-400">Preview how your education will be displayed on your portfolio</p>
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
                  <span className="text-purple-300 text-sm font-medium">My Academic Journey</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">Education</h2>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

                <div className="space-y-8">
                  {sortedEducations.map((education, index) => (
                    <div key={education.id} className="relative flex items-start space-x-6">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-slate-900 border-2 border-purple-500 rounded-full">
                        <GraduationCap className="w-6 h-6 text-purple-400" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-purple-500/30 transition-colors">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-white">{education.title}</h3>
                              <p className="text-purple-300 font-medium">{education.institution}</p>
                              {education.location && <p className="text-slate-400 text-sm">{education.location}</p>}
                            </div>
                            <div className="text-right">
                              <div className="text-slate-300 text-sm font-medium">
                                {formatDate(education.startDate)} -{" "}
                                {education.current
                                  ? "Present"
                                  : education.endDate
                                    ? formatDate(education.endDate)
                                    : "N/A"}
                              </div>
                              {education.field && <p className="text-slate-400 text-sm">{education.field}</p>}
                            </div>
                          </div>

                          {education.description && (
                            <p className="text-slate-300 text-sm leading-relaxed">{education.description}</p>
                          )}

                          {(education.grade || education.gpa) && (
                            <div className="flex items-center space-x-4">
                              <Badge
                                variant="outline"
                                className="bg-purple-500/10 text-purple-300 border-purple-500/30"
                              >
                                Grade: {education.grade || education.gpa}
                              </Badge>
                            </div>
                          )}

                          {education.achievements && education.achievements.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {education.achievements.map((achievement, achievementIndex) => (
                                <Badge
                                  key={achievementIndex}
                                  variant="outline"
                                  className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30"
                                >
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {educations.length === 0 && (
                <div className="text-center py-12">
                  <GraduationCap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No education records added yet. Add some education to see them here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Education Timeline Editor
            </h1>
            <p className="text-slate-400">Manage your academic qualifications and educational journey</p>
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
                    setEditingEducation(null)
                    setFormData({
                      title: "",
                      institution: "",
                      type: "degree",
                      degree: "",
                      field: "",
                      startDate: "",
                      endDate: "",
                      current: false,
                      grade: "",
                      gpa: "",
                      description: "",
                      achievements: "",
                      credentialUrl: "",
                      location: "",
                    })
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingEducation ? "Edit Education" : "Add New Education"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    {editingEducation
                      ? "Update the education information."
                      : "Add a new education record to your profile."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="education-title" className="text-slate-300">
                        Title/Program Name *
                      </Label>
                      <Input
                        id="education-title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Bachelor of Science in Computer Science"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education-type" className="text-slate-300">
                        Type *
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {educationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value} className="text-white">
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education-institution" className="text-slate-300">
                      Institution/Organization *
                    </Label>
                    <Input
                      id="education-institution"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="University name, Company, Online platform"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  {formData.type === "degree" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="education-degree" className="text-slate-300">
                          Degree Type
                        </Label>
                        <Select
                          value={formData.degree}
                          onValueChange={(value) => setFormData({ ...formData, degree: value })}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                            <SelectValue placeholder="Select degree" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {degreeTypes.map((degree) => (
                              <SelectItem key={degree} value={degree} className="text-white">
                                {degree}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education-field" className="text-slate-300">
                          Field of Study
                        </Label>
                        <Input
                          id="education-field"
                          value={formData.field}
                          onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                          placeholder="e.g., Computer Science, Business"
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="education-start" className="text-slate-300">
                        Start Date *
                      </Label>
                      <Input
                        id="education-start"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education-end" className="text-slate-300">
                        End Date
                      </Label>
                      <Input
                        id="education-end"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        disabled={formData.current}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education-current" className="text-slate-300">
                        Currently Enrolled
                      </Label>
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id="education-current"
                          checked={formData.current}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              current: e.target.checked,
                              endDate: e.target.checked ? "" : formData.endDate,
                            })
                          }
                          className="rounded border-slate-600 bg-slate-800"
                        />
                        <Label htmlFor="education-current" className="text-sm text-slate-300">
                          Currently enrolled
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education-description" className="text-slate-300">
                      Description
                    </Label>
                    <Textarea
                      id="education-description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of the program, coursework, or key learnings..."
                      rows={3}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education-achievements" className="text-slate-300">
                      Key Achievements
                    </Label>
                    <Input
                      id="education-achievements"
                      value={formData.achievements}
                      onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                      placeholder="Dean's List, Magna Cum Laude, Research Project (comma separated)"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education-location" className="text-slate-300">
                      Location
                    </Label>
                    <Input
                      id="education-location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Country"
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
                    onClick={handleAddEducation}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {editingEducation ? "Update Education" : "Add Education"}
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

        <div className="space-y-4">
          {sortedEducations.map((education) => {
            const Icon = getTypeIcon(education.type)
            return (
              <Card key={education.id} className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                        <Icon className="h-6 w-6 text-purple-400" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{education.title}</h3>
                          <p className="text-purple-300 font-medium">{education.institution}</p>
                          {education.location && <p className="text-sm text-slate-400">{education.location}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/30">
                            {getTypeLabel(education.type)}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditEducation(education)}
                            className="text-slate-400 hover:text-white hover:bg-slate-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEducation(education.id)}
                            className="text-slate-400 hover:text-red-400 hover:bg-slate-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(education.startDate)} -{" "}
                          {education.current ? "Present" : education.endDate ? formatDate(education.endDate) : "N/A"}
                        </div>
                        {(education.grade || education.gpa) && <div>Grade: {education.grade || education.gpa}</div>}
                      </div>

                      {education.field && (
                        <p className="text-sm text-slate-300">
                          <span className="font-medium">Field:</span> {education.field}
                        </p>
                      )}

                      {education.description && <p className="text-sm text-slate-300">{education.description}</p>}

                      {education.achievements && education.achievements.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {education.achievements.map((achievement, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30"
                            >
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {educations.length === 0 && (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-8 text-center">
                <div className="space-y-3">
                  <GraduationCap className="h-12 w-12 mx-auto text-slate-600" />
                  <h3 className="text-lg font-medium text-white">No education records yet</h3>
                  <p className="text-slate-400">Start building your education profile by adding your qualifications.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
