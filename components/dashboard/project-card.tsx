"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Globe, Github, Star, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Project } from "@/lib/portfolio-data"

interface ProjectCardProps {
  project: Project & { status?: "Published" | "Draft" | "Featured" }
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="relative h-full overflow-hidden rounded-xl bg-white border border-zinc-200 shadow-sm group">
      {/* Image with overlay */}
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image_url || "/placeholder.svg?height=400&width=600&text=Project+Image"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        {project.status === "Featured" && (
          <Badge className="absolute top-3 left-3 z-20 bg-blue-600 hover:bg-blue-700 text-white">
            <Star className="h-3 w-3 mr-1" /> Featured
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-zinc-900 line-clamp-1">{project.title}</h3>
          {project.status && (
            <Badge
              variant="secondary"
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                project.status === "Published"
                  ? "bg-green-500/20 text-green-600"
                  : project.status === "Draft"
                    ? "bg-yellow-500/20 text-yellow-600"
                    : "bg-zinc-500/20 text-zinc-600"
              }`}
            >
              {project.status}
            </Badge>
          )}
        </div>
        <p className="text-zinc-600 text-sm line-clamp-2 mb-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-zinc-200/50 hover:bg-zinc-200 text-zinc-700">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-zinc-200/50">
          <div className="flex gap-2">
            {project.demo_url && (
              <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Live Demo</span>
                </Button>
              </Link>
            )}
            {project.repo_url && (
              <Link href={project.repo_url} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(project.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
