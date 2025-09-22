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
import { Save, Eye, Plus, Edit, Trash2, ExternalLink, Github, Globe, Briefcase } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  category: string
  status: string
  technologies: string[]
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
  startDate?: string
  endDate?: string
  featured: boolean
}

const projectCategories = [
  { value: "web", label: "Web Applications" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "desktop", label: "Desktop Applications" },
  { value: "api", label: "APIs & Backend" },
  { value: "design", label: "Design Projects" },
  { value: "other", label: "Other Projects" },
]

const projectStatuses = [
  { value: "completed", label: "Completed", color: "bg-green-500" },
  { value: "in-progress", label: "In Progress", color: "bg-blue-500" },
  { value: "planned", label: "Planned", color: "bg-yellow-500" },
  { value: "on-hold", label: "On Hold", color: "bg-gray-500" },
]

// Default projects based on the user's portfolio
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Club website",
    description:
      "A digital platform designed to promote the club's activities, events, and community. Building strong technical skills through projects and hands-on learning.",
    category: "web",
    status: "completed",
    technologies: ["React", "Node.js", "CSS"],
    imageUrl: "/club-homepage.png",
    githubUrl: "",
    liveUrl: "",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    category: "web",
    status: "completed",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "/task-management-dashboard.png",
    githubUrl: "",
    liveUrl: "",
    featured: true,
  },
  {
    id: "3",
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool using machine learning to create engaging content for various platforms.",
    category: "web",
    status: "completed",
    technologies: ["Python", "OpenAI", "React"],
    imageUrl: "/ai-content-generator-interface.png",
    githubUrl: "",
    liveUrl: "",
    featured: true,
  },
  {
    id: "4",
    title: "Fitness Tracker",
    description:
      "A health and fitness application with workout tracking, progress monitoring, and personalized recommendations.",
    category: "mobile",
    status: "completed",
    technologies: ["React Native", "TypeScript", "Firebase"],
    imageUrl: "/fitness-tracker-app.png",
    githubUrl: "",
    liveUrl: "",
    featured: true,
  },
  {
    id: "5",
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard with forecasts, interactive maps, and location-based weather alerts.",
    category: "web",
    status: "completed",
    technologies: ["React", "Weather API", "Charts.js"],
    imageUrl: "/weather-dashboard-interface.png",
    githubUrl: "",
    liveUrl: "",
    featured: true,
  },
  {
    id: "6",
    title: "Portfolio Website",
    description: "This portfolio website with modern design and responsive layout showcasing projects and skills.",
    category: "web",
    status: "completed",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    imageUrl: "/portfolio-homepage.png",
    githubUrl: "",
    liveUrl: "",
    featured: true,
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isPreview, setIsPreview] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "web",
    status: "completed",
    technologies: "",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    startDate: "",
    endDate: "",
    featured: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    const savedProjects = localStorage.getItem("cms-projects-data")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      // Load default projects if none exist
      setProjects(defaultProjects)
      localStorage.setItem("cms-projects-data", JSON.stringify(defaultProjects))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("cms-projects-data", JSON.stringify(projects))
    toast({
      title: "Success",
      description: "Projects have been saved successfully.",
    })
  }

  const handleAddProject = () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      longDescription: formData.longDescription,
      category: formData.category,
      status: formData.status,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      imageUrl: formData.imageUrl,
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      startDate: formData.startDate,
      endDate: formData.endDate,
      featured: formData.featured,
    }

    if (editingProject) {
      setProjects(projects.map((project) => (project.id === editingProject.id ? newProject : project)))
    } else {
      setProjects([...projects, newProject])
    }

    setFormData({
      title: "",
      description: "",
      longDescription: "",
      category: "web",
      status: "completed",
      technologies: "",
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
      startDate: "",
      endDate: "",
      featured: false,
    })
    setEditingProject(null)
    setIsDialogOpen(false)

    toast({
      title: "Success",
      description: editingProject ? "Project updated successfully." : "Project added successfully.",
    })
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription || "",
      category: project.category,
      status: project.status,
      technologies: project.technologies.join(", "),
      imageUrl: project.imageUrl || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      startDate: project.startDate || "",
      endDate: project.endDate || "",
      featured: project.featured,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId))
    toast({
      title: "Success",
      description: "Project deleted successfully.",
    })
  }

  const getStatusColor = (status: string) => {
    return projectStatuses.find((s) => s.value === status)?.color || "bg-gray-500"
  }

  const getStatusLabel = (status: string) => {
    return projectStatuses.find((s) => s.value === status)?.label || status
  }

  const getCategoryLabel = (category: string) => {
    return projectCategories.find((c) => c.value === category)?.label || category
  }

  if (isPreview) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects Preview
              </h1>
              <p className="text-slate-400">Preview how your projects will be displayed on your portfolio</p>
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
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6">
                  <span className="text-purple-300 text-sm font-medium">Portfolio Showcase</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">Featured Projects</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.featured)
                  .map((project) => (
                    <div
                      key={project.id}
                      className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-purple-500/30 transition-colors group"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.imageUrl || "/placeholder.svg?height=200&width=300&query=project screenshot"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30"
                            >
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          {project.githubUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                              asChild
                            >
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-2" />
                                Code
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                              asChild
                            >
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Live
                              </a>
                            </Button>
                          )}
                          {!project.githubUrl && !project.liveUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {projects.filter((p) => p.featured).length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">
                    No featured projects yet. Mark some projects as featured to see them here.
                  </p>
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
              Featured Projects Manager
            </h1>
            <p className="text-slate-400">Manage your portfolio projects and showcase your best work</p>
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
                    setEditingProject(null)
                    setFormData({
                      title: "",
                      description: "",
                      longDescription: "",
                      category: "web",
                      status: "completed",
                      technologies: "",
                      imageUrl: "",
                      githubUrl: "",
                      liveUrl: "",
                      startDate: "",
                      endDate: "",
                      featured: false,
                    })
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingProject ? "Edit Project" : "Add New Project"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    {editingProject ? "Update the project information." : "Add a new project to your portfolio."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-title" className="text-slate-300">
                        Project Title *
                      </Label>
                      <Input
                        id="project-title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="My Awesome Project"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-category" className="text-slate-300">
                        Category *
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {projectCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value} className="text-white">
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description" className="text-slate-300">
                      Short Description *
                    </Label>
                    <Textarea
                      id="project-description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of your project..."
                      rows={3}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-technologies" className="text-slate-300">
                      Technologies *
                    </Label>
                    <Input
                      id="project-technologies"
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      placeholder="React, Node.js, MongoDB (comma separated)"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-image" className="text-slate-300">
                      Project Image URL
                    </Label>
                    <Input
                      id="project-image"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://example.com/project-screenshot.jpg"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-github" className="text-slate-300">
                        GitHub URL
                      </Label>
                      <Input
                        id="project-github"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/username/project"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-live" className="text-slate-300">
                        Live Demo URL
                      </Label>
                      <Input
                        id="project-live"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        placeholder="https://myproject.com"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="project-featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-slate-600 bg-slate-800"
                    />
                    <Label htmlFor="project-featured" className="text-slate-300">
                      Mark as featured project
                    </Label>
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
                    onClick={handleAddProject}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {editingProject ? "Update Project" : "Add Project"}
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
          {projects.map((project) => (
            <Card key={project.id} className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {project.imageUrl && (
                    <div className="flex-shrink-0">
                      <img
                        src={project.imageUrl || "/placeholder.svg?height=120&width=200&query=project screenshot"}
                        alt={project.title}
                        className="w-48 h-28 object-cover rounded-lg border border-slate-700"
                      />
                    </div>
                  )}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                          {project.featured && (
                            <Badge
                              variant="secondary"
                              className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                            >
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-400">{getCategoryLabel(project.category)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProject(project)}
                          className="text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-slate-400 hover:text-red-400 hover:bg-slate-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                          <span className="text-xs text-slate-400">{getStatusLabel(project.status)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                            asChild
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                            asChild
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4 mr-1" />
                              Live
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {projects.length === 0 && (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-8 text-center">
                <div className="space-y-3">
                  <Briefcase className="h-12 w-12 mx-auto text-slate-600" />
                  <h3 className="text-lg font-medium text-white">No projects added yet</h3>
                  <p className="text-slate-400">Start building your portfolio by adding your first project.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
