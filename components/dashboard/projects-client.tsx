"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search, LayoutGrid, List, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ProjectCard } from "@/components/dashboard/project-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ProjectForm } from "@/components/dashboard/project-form"
import { deleteProject } from "@/app/dashboard/actions"
import { useToast } from "@/hooks/use-toast"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image_url: string | null
  demo_url: string
  repo_url: string
  status?: "Published" | "Draft" | "Featured"
}

interface ProjectsClientProps {
  initialProjects: Project[]
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const { toast } = useToast()

  const allAvailableTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [projects])

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) => project.tags.some((tag) => selectedTags.includes(tag)))
    }
    return filtered
  }, [projects, searchTerm, selectedTags])

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleProjectAdded = () => {
    setIsAddProjectDialogOpen(false)
    // In a real app, you'd re-fetch data or update state more robustly
    // For in-memory, we'll just close the dialog. The action revalidates.
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
  }

  const handleProjectUpdated = () => {
    setEditingProject(null)
    // In a real app, you'd re-fetch data or update state more robustly
    // For in-memory, we'll just close the dialog. The action revalidates.
  }

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const result = await deleteProject(id)
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })
        setProjects((prev) => prev.filter((p) => p.id !== id))
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
          <h1 className="text-3xl font-bold text-zinc-900">Projects Management</h1>
          <p className="text-zinc-600">Manage your portfolio projects.</p>
        </div>
        <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <ProjectForm onSuccess={handleProjectAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white border border-zinc-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-zinc-50/50 border-zinc-200 focus:border-purple-500 focus:ring-purple-500/20 text-zinc-900"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={`text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 ${viewMode === "grid" ? "bg-zinc-100 text-zinc-900" : ""}`}
              >
                <LayoutGrid className="h-5 w-5" />
                <span className="sr-only">Grid View</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={`text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 ${viewMode === "list" ? "bg-zinc-100 text-zinc-900" : ""}`}
              >
                <List className="h-5 w-5" />
                <span className="sr-only">List View</span>
              </Button>
            </div>
          </div>

          {allAvailableTags.length > 0 && (
            <div className="mb-6">
              <span className="text-zinc-600 text-sm mr-2">Filter by tag:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {allAvailableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "secondary"}
                    className={`cursor-pointer ${selectedTags.includes(tag) ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-zinc-200/50 hover:bg-zinc-200 text-zinc-700"}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 ? (
            <div className="text-center text-zinc-600 py-10">No projects found matching your criteria.</div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          )}
        </CardContent>

        <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            {editingProject && <ProjectForm initialData={editingProject} onSuccess={handleProjectUpdated} />}
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  )
}
