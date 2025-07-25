"use client"

import { deleteProject, getAllProjects, getProjectById } from "@/services/projectService"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import {
  Search,
  ExternalLink,
  Github,
  Edit3,
  Trash2,
  Filter,
  Grid3X3,
  List,
  Calendar,
  Code,
  Eye,
  Star,
  TrendingUp,
  PlusCircle,
} from "lucide-react"
// import { toast } from "react-toastify"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import ProjectForm from "./project/projectForm" // For adding new projects
// import UpdateProjectForm from "./project/update-project-form" // For updating existing projects
import type { IProject } from "@/app/types/project" // Import the IProject interface
import { toast } from "sonner"
import ProjectForm from "./projectForm"
import UpdateProjectForm from "./update"

const SafeImage = ({
  src,
  alt,
  width,
  height,
  fallbackSrc = "/images/banner.png",
}: {
  src: string
  alt: string
  width: number
  height: number
  fallbackSrc?: string
}) => {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setCurrentSrc(src)
    setLoaded(false)
    setError(false)
  }, [src])

  return (
    <div className="relative w-full h-64 overflow-hidden group">
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <Image
        src={error ? fallbackSrc : currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover w-full h-full transition-all duration-500 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          console.warn(`Image failed to load: ${src}`)
          setError(true)
          setLoaded(true)
        }}
        unoptimized
      />
      <div className="absolute top-4 right-4 z-20">
        <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-sm">
          <Star className="w-3 h-3 mr-1" />
          Featured
        </Badge>
      </div>
    </div>
  )
}

const ProjectCard = ({ project, onUpdate, onDelete }: any) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Image Section */}
      <SafeImage src={project?.image || ""} alt={project.title} width={400} height={256} />

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>2024</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{project.description}</p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech: string, idx: number) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-indigo-100 transition-colors"
            >
              <Code className="w-3 h-3 mr-1" />
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs text-gray-500">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>1.2k views</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>Active</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <Link
              href={project.liveLink}
              target="_blank"
              className="inline-flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </Link>
            <Link
              href={project.githubLink}
              target="_blank"
              className="inline-flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate(project._id)}
            className="flex-1 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(project._id)}
            className="flex-1 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

const GetAllProjects = () => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false) // State for add modal visibility
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false) // State for update modal visibility
  const [editingProject, setEditingProject] = useState<IProject | null>(null) // State for project being edited
  const router = useRouter()

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const result = await getAllProjects()
      const projectData = result?.data || []
      setProjects(projectData)
      setFilteredProjects(projectData)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech: string) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredProjects(filtered)
  }, [searchTerm, projects])

  const handleUpdate = async (id: string) => {
    setLoading(true) // Show loading while fetching project for update
    try {
      const response = await getProjectById(id)
      if (response?.data) {
        setEditingProject(response.data)
        setIsUpdateModalOpen(true)
      } else {
        toast.error("Project not found for update.")
      }
    } catch (error) {
      console.error("Failed to fetch project for update:", error)
      toast.error("Failed to load project details for update.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Project?",
      text: "This action cannot be undone. All project data will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    })

    if (!result.isConfirmed) return

    try {
      await deleteProject(id)
      setProjects((prev) => prev.filter((project) => project._id !== id))
      Swal.fire({
        title: "Deleted!",
        text: "The project has been successfully deleted.",
        icon: "success",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "rounded-lg",
        },
      })
    } catch (error) {
      console.error("Failed to delete project:", error)
      Swal.fire({
        title: "Error",
        text: "Could not delete the project. Please try again.",
        icon: "error",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "rounded-lg",
        },
      })
    }
  }

  // Function to refresh projects after a new one is added or updated
  const handleFormSuccess = async () => {
    setIsAddModalOpen(false) // Close add modal
    setIsUpdateModalOpen(false) // Close update modal
    setEditingProject(null) // Clear editing project
    await fetchProjects() // Re-fetch all projects
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="space-y-8">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 space-y-4">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Project Portfolio
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Discover and manage your creative projects with advanced tools and insights.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                {filteredProjects.length} Projects
              </Badge>
              {/* Dialog Trigger for New Project */}
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    <span>New Project</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
                  {/* <DialogHeader className="p-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold text-gray-900">Create New Project</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Fill out the details below to add your project to the portfolio.
                    </DialogDescription>
                  </DialogHeader> */}
                  {/* ProjectForm inside the Dialog, passing onSuccess to close the modal */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <ProjectForm onSuccess={handleFormSuccess} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search projects, technologies, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border-gray-200 focus:border-blue-300 focus:ring-blue-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-md"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-md"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first project"}
              </p>
              {/* Dialog Trigger for New Project in empty state */}
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Create Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
                  <DialogHeader className="p-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold text-gray-900">Create New Project</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Fill out the details below to add your project to the portfolio.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto p-6">
                    <ProjectForm onSuccess={handleFormSuccess} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {filteredProjects.map((project: any) => (
              <ProjectCard key={project._id} project={project} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {/* Dialog for Update Project */}
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
            {/* <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle className="text-2xl font-bold text-gray-900">Update Project</DialogTitle>
              <DialogDescription className="text-gray-600">
                Edit the details below to update your project in the portfolio.
              </DialogDescription>
            </DialogHeader> */}
            <div className="flex-1 overflow-y-auto p-6">
              {editingProject ? (
                <UpdateProjectForm project={editingProject} onSuccess={handleFormSuccess} />
              ) : (
                <div className="text-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-600">Loading project details...</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default GetAllProjects
