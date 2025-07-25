"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { IProject } from "@/app/types/project"
import { updateProject } from "@/services/projectService"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  liveLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  githubLink: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  isFeatured: z.boolean(),
  image: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  category: z.string().min(1, "Please select a category"),
  status: z.string().min(1, "Please select a status"),
})

type FormInputs = z.infer<typeof formSchema>

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

const UpdateProjectForm = ({ project, onSuccess }: { project: IProject | null; onSuccess?: () => void }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: [],
      liveLink: "",
      githubLink: "",
      isFeatured: false,
      image: "",
      category: "",
      status: "",
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = form
  const watchedImage = watch("image")

  useEffect(() => {
    if (project) {
      const initialTechs = project.technologies || []
      setSelectedTechs(initialTechs)
      reset({
        title: project.title || "",
        description: project.description || "",
        technologies: initialTechs, // Set as array directly
        liveLink: project.liveLink || "",
        githubLink: project.githubLink || "",
        isFeatured: project.isFeatured || false,
        image: project.image || "",
        // category: project.category || "",
        // status: project.status || "",
      })
    }
  }, [project, reset])

  const addTech = (tech: string) => {
    if (tech && !selectedTechs.includes(tech)) {
      const newTechs = [...selectedTechs, tech]
      setSelectedTechs(newTechs)
      setValue("technologies", newTechs)
    }
  }

  const removeTech = (techToRemove: string) => {
    const newTechs = selectedTechs.filter((tech) => tech !== techToRemove)
    setSelectedTechs(newTechs)
    setValue("technologies", newTechs)
  }

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true)

    if (!project) {
      toast.error("No project selected for update.")
      setIsSubmitting(false)
      return
    }

    const updatedData = {
      title: data.title,
      description: data.description,
      technologies: data.technologies,
      liveLink: data.liveLink || "",
      githubLink: data.githubLink || "",
      isFeatured: data.isFeatured,
      image: data.image || "",
      category: data.category,
      status: data.status,
    }

    try {
      await updateProject(project._id, updatedData)
      toast.success("Project updated successfully!")
      onSuccess?.() // Call onSuccess prop to close the modal and refresh list
    } catch (error) {
      console.error("Error updating project:", error)
      toast.error("Failed to update project.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border p-6 mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Update Project</h1>
        <p className="text-gray-600 text-sm">Edit the details below to update your project</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Project Title *
            </Label>
            <Input id="title" {...register("title")} className="mt-1 h-9" placeholder="Enter project title" />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category *
            </Label>
            <Select onValueChange={(value) => setValue("category", value)} value={watch("category")}>
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
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <Label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status *
            </Label>
            <Select onValueChange={(value) => setValue("status", value)} value={watch("status")}>
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
            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description *
          </Label>
          <Textarea
            id="description"
            {...register("description")}
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

            {/* Manual Input (for adding new tech not in popular list) */}
            <Input
              placeholder="Or type technologies separated by commas"
              className="text-sm h-9"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  const newTech = (e.target as HTMLInputElement).value.trim()
                  if (newTech) {
                    addTech(newTech)
                    ;(e.target as HTMLInputElement).value = "" // Clear input after adding
                  }
                }
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
            {errors.technologies && <p className="text-red-500 text-xs mt-1">{errors.technologies.message}</p>}
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
            {errors.liveLink && <p className="text-red-500 text-xs mt-1">{errors.liveLink.message}</p>}
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
            {errors.githubLink && <p className="text-red-500 text-xs mt-1">{errors.githubLink.message}</p>}
          </div>
        </div>

        {/* Image */}
        <div>
          <Label htmlFor="image" className="text-sm font-medium text-gray-700">
            Project Image URL
          </Label>
          <Input id="image" {...register("image")} className="mt-1 h-9" placeholder="https://example.com/image.jpg" />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          {watchedImage && (
            <div className="mt-2">
              <img
                src={watchedImage || "/placeholder.svg?height=60&width=120"}
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
          <Switch checked={watch("isFeatured")} onCheckedChange={(checked) => setValue("isFeatured", checked)} />
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
                Updating Project...
              </>
            ) : (
              "Update Project"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProjectForm
