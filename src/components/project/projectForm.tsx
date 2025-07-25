"use client"

import { addProject } from "@/services/projectService"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Loader2 } from "lucide-react"

type FormInputs = {
  title: string
  description: string
  technologies: string
  liveLink: string
  githubLink: string
  isFeatured: boolean
  image: string
  category: string
  status: string
}

const CATEGORIES = [
  { value: "web", label: "Web Application" },
  { value: "mobile", label: "Mobile App" },
  { value: "desktop", label: "Desktop App" },
  { value: "api", label: "API/Backend" },
  { value: "library", label: "Library" },
  { value: "tool", label: "Tool" },
  { value: "other", label: "Other" },
]

const STATUSES = [
  { value: "completed", label: "Completed" },
  { value: "development", label: "In Development" },
  { value: "planning", label: "Planning" },
  { value: "maintenance", label: "Maintenance" },
]

const POPULAR_TECHS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "AWS",
  "Docker",
]

const ProjectForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      isFeatured: false,
    },
  })

  const addTech = (tech: string) => {
    if (!selectedTechs.includes(tech)) {
      const newTechs = [...selectedTechs, tech]
      setSelectedTechs(newTechs)
      setValue("technologies", newTechs.join(", "))
    }
  }

  const removeTech = (tech: string) => {
    const newTechs = selectedTechs.filter((t) => t !== tech)
    setSelectedTechs(newTechs)
    setValue("technologies", newTechs.join(", "))
  }

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true)

    const technologies = data.technologies ? data.technologies.split(",").map((tech) => tech.trim()) : selectedTechs

    const projectData = {
      title: data.title,
      description: data.description,
      technologies,
      liveLink: data.liveLink,
      githubLink: data.githubLink,
      isFeatured: data.isFeatured,
      image: data.image,
      category: data.category,
      status: data.status,
    }

    try {
      await addProject(projectData)
      toast.success("Project added successfully!")
      reset()
      setSelectedTechs([])
      onSuccess?.() // Call onSuccess prop to close the modal
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to add project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border p-6 mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Add New Project</h1>
        <p className="text-gray-600 text-sm">Fill in the details below to add your project</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Project Title *
            </Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              className="mt-1 h-9"
              placeholder="Enter project title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category *
            </Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger className="mt-1 h-9">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-xs mt-1">Category is required</p>}
          </div>

          <div>
            <Label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status *
            </Label>
            <Select onValueChange={(value) => setValue("status", value)}>
              <SelectTrigger className="mt-1 h-9">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && <p className="text-red-500 text-xs mt-1">Status is required</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description *
          </Label>
          <Textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            className="mt-1 h-20 resize-none text-sm"
            placeholder="Describe your project..."
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        {/* Technologies */}
        <div>
          <Label className="text-sm font-medium text-gray-700">Technologies *</Label>
          <div className="mt-2 space-y-3">
            {/* Quick Add Buttons */}
            <div className="flex flex-wrap gap-1">
              {POPULAR_TECHS.map((tech) => (
                <Button
                  key={tech}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTech(tech)}
                  disabled={selectedTechs.includes(tech)}
                  className="h-6 text-xs px-2"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {tech}
                </Button>
              ))}
            </div>

            {/* Manual Input */}
            <Input
              {...register("technologies")}
              placeholder="Or type technologies separated by commas"
              className="text-sm h-9"
              onChange={(e) => {
                const techs = e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                setSelectedTechs(techs)
              }}
            />

            {/* Selected Technologies */}
            {selectedTechs.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedTechs.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-2 py-1 text-xs">
                    {tech}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTech(tech)}
                      className="ml-1 h-3 w-3 p-0"
                    >
                      <X className="w-2 h-2" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="liveLink" className="text-sm font-medium text-gray-700">
              Live Demo URL
            </Label>
            <Input
              id="liveLink"
              {...register("liveLink")}
              className="mt-1 h-9"
              placeholder="https://your-project.com"
            />
          </div>

          <div>
            <Label htmlFor="githubLink" className="text-sm font-medium text-gray-700">
              GitHub Repository
            </Label>
            <Input
              id="githubLink"
              {...register("githubLink")}
              className="mt-1 h-9"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <Label htmlFor="image" className="text-sm font-medium text-gray-700">
            Project Image URL
          </Label>
          <Input id="image" {...register("image")} className="mt-1 h-9" placeholder="https://example.com/image.jpg" />
          {watch("image") && (
            <div className="mt-2">
              <img
                src={watch("image") || "/placeholder.svg?height=60&width=120"}
                alt="Preview"
                className="h-16 w-auto rounded border object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=60&width=120"
                }}
              />
            </div>
          )}
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <Label className="text-sm font-medium text-gray-700">Featured Project</Label>
            <p className="text-xs text-gray-500">Mark this project as featured</p>
          </div>
          <Switch {...register("isFeatured")} />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding Project...
              </>
            ) : (
              "Add Project"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
