"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
// import type { ISkill } from "@/app/types/skill"
import { addSkill, updateSkillAction } from "@/services/skillsService" // Use updateSkillAction
import { ISkill } from "./skill.interface"

const formSchema = z.object({
  name: z.string().min(1, "Skill name is required").max(50, "Name must be less than 50 characters"),
  type: z.enum(["technical", "soft"], {
    required_error: "Skill type is required",
  }),
  proficiency: z.enum(["beginner", "intermediate", "advanced", "expert"], {
    required_error: "Proficiency is required",
  }),
  icon: z.string().optional(), // Lucide icon name
})

type FormInputs = z.infer<typeof formSchema>

const SKILL_TYPES = [
  { value: "technical", label: "Technical" },
  { value: "soft", label: "Soft" },
]

const PROFICIENCY_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
]

const SkillForm = ({ onSuccess, initialData }: { onSuccess?: () => void; initialData?: ISkill | null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      type: "technical", // Default to technical
      proficiency: "intermediate", // Default to intermediate
      icon: "",
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

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true)
    try {
      if (initialData?._id) {
        // Update existing skill using the server action
        const updatedSkillWithId: ISkill = {
          ...data,
          _id: initialData._id, // Ensure the ID is included
        }
        const result = await updateSkillAction(updatedSkillWithId)
        if (result.success) {
          toast.success("Skill updated successfully!")
        } else {
          toast.error(`Failed to update skill: ${result.error}`)
        }
      } else {
        // Add new skill
        await addSkill(data)
        toast.success("Skill added successfully!")
        reset() // Reset form for new skill
      }
      onSuccess?.() // Call onSuccess prop to close the modal and refresh list
    } catch (error) {
      console.error("Error submitting skill:", error)
      toast.error("Failed to save skill.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-6 mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{initialData ? "Update Skill" : "Add New Skill"}</h1>
        <p className="text-gray-600 text-sm">
          {initialData ? "Edit the details below to update your skill" : "Fill in the details below to add a new skill"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Skill Name *
          </Label>
          <Input id="name" {...register("name")} className="mt-1 h-9" placeholder="e.g., React, Node.js" />
          <div className="flex justify-between items-center mt-1">
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            <p className="text-xs text-gray-500 ml-auto">{watch("name")?.length || 0}/50</p>
          </div>
        </div>

        <div>
          <Label htmlFor="type" className="text-sm font-medium text-gray-700">
            Skill Type *
          </Label>
          <Select onValueChange={(value) => setValue("type", value as FormInputs["type"])} value={watch("type")}>
            <SelectTrigger className="mt-1 h-9">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {SKILL_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
        </div>

        <div>
          <Label htmlFor="proficiency" className="text-sm font-medium text-gray-700">
            Proficiency *
          </Label>
          <Select
            onValueChange={(value) => setValue("proficiency", value as FormInputs["proficiency"])}
            value={watch("proficiency")}
          >
            <SelectTrigger className="mt-1 h-9">
              <SelectValue placeholder="Select proficiency" />
            </SelectTrigger>
            <SelectContent>
              {PROFICIENCY_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.proficiency && <p className="text-red-500 text-xs mt-1">{errors.proficiency.message}</p>}
        </div>

        <div>
          <Label htmlFor="icon" className="text-sm font-medium text-gray-700">
            Lucide Icon Name (Optional)
          </Label>
          <Input id="icon" {...register("icon")} className="mt-1 h-9" placeholder="e.g., Atom, Server, Type" />
          <p className="text-xs text-gray-500 mt-1">
            Find icon names at{" "}
            <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">
              lucide.dev/icons
            </a>
          </p>
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess?.()} // Call onSuccess to close modal
            disabled={isSubmitting}
            className="h-10 px-4"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {initialData ? "Saving Changes..." : "Adding Skill..."}
              </>
            ) : initialData ? (
              "Update Skill"
            ) : (
              "Add Skill"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SkillForm
