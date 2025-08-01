"use client"

import { useForm } from "react-hook-form"
// import type { ISkill } from "@/app/types/skill"
import { useTransition, useState } from "react"
import { updateSkillAction } from "@/services/skillsService" // Use the server action
import { ISkill } from "./skill.interface"

const UpdateSkills = ({ skills }: { skills: ISkill | null }) => {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState("")
  const { register, handleSubmit } = useForm<ISkill>({
    defaultValues: {
      name: skills?.name || "",
      type: skills?.type || "soft",
      proficiency: skills?.proficiency || "beginner",
      icon: skills?.icon || "", // Ensure icon is also initialized
    },
  })

  const onSubmit = (data: ISkill) => {
    if (!skills?._id) {
      setMessage("❌ No skill ID provided for update.")
      return
    }

    // Construct the full updated skill object including the ID
    const updatedSkillWithId: ISkill = {
      ...data,
      _id: skills._id,
    }

    startTransition(async () => {
      const result = await updateSkillAction(updatedSkillWithId) // Pass the full object to the server action
      if (result.success) {
        setMessage("✅ Skill updated successfully!")
      } else {
        setMessage(`❌ Failed to update skill: ${result.error}`)
      }
    })
  }

  if (!skills) return <p className="text-red-500">No skill data provided.</p>

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Update Skill</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Skill Name</label>
          <input
            {...register("name", { required: true })}
            className="mt-1 block w-full rounded-md border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select {...register("type")} className="w-full rounded-md border border-gray-300">
            <option value="technical">Technical</option>
            <option value="soft">Soft</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Proficiency</label>
          <select {...register("proficiency")} className="w-full rounded-md border border-gray-300">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lucide Icon Name (Optional)</label>
          <input
            {...register("icon")}
            className="mt-1 block w-full rounded-md border border-gray-300"
            placeholder="e.g., Atom, Server"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {isPending ? "Updating..." : "Update Skill"}
        </button>
        {message && <p className="text-center mt-2 text-sm">{message}</p>}
      </form>
    </div>
  )
}

export default UpdateSkills
