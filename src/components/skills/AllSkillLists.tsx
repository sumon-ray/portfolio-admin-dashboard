"use client"

import { deleteSkill, getAllSkills, getSkillById } from "@/services/skillsService"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, PlusCircle, Edit3, Trash2, Code } from "lucide-react"
import { Loader2 } from "lucide-react" // Import Loader2
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import SkillForm from "./skill-form"
import { getIconComponent } from "@/app/utils/iconHelper"
// import type { ISkill } from "@/app/types/skill"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ISkill } from "./skill.interface"
import SkillForm from "./SkillForm"

const SkillCard = ({
  skill,
  onUpdate,
  onDelete,
}: { skill: ISkill; onUpdate: (id: string) => void; onDelete: (id: string) => void }) => {
  const IconComponent = getIconComponent(skill.icon || skill.type) || Code // Fallback to Code icon

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
          <IconComponent className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{skill.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{skill.type} skill</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs font-medium">
          Proficiency: {skill.proficiency}
        </Badge>
      </div>

      <div className="flex space-x-2 pt-4 border-t border-gray-100 mt-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdate(skill._id)}
          className="flex-1 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-700 transition-colors"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(skill._id)}
          className="flex-1 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  )
}

const GetAllSkills = () => {
  const [skills, setSkills] = useState<ISkill[]>([])
  const [filteredSkills, setFilteredSkills] = useState<ISkill[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<ISkill | null>(null)
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<ISkill["type"] | "all">("all")

  const fetchSkills = async () => {
    setLoading(true)
    try {
      const result = await getAllSkills()
      const skillData = result?.data || []
      setSkills(skillData)
      setFilteredSkills(skillData)
    } catch (error) {
      console.error("Failed to fetch skills:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  useEffect(() => {
    const filtered = skills.filter(
      (skill) =>
        (selectedType === "all" || skill.type === selectedType) &&
        (skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.proficiency.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredSkills(filtered)
  }, [searchTerm, skills, selectedType])

  const handleUpdate = async (id: string) => {
    setLoading(true)
    try {
      const response = await getSkillById(id)
      if (response?.data) {
        setEditingSkill(response.data)
        setIsUpdateModalOpen(true)
      } else {
        toast.error("Skill not found for update.")
      }
    } catch (error) {
      console.error("Failed to fetch skill for update:", error)
      toast.error("Failed to load skill details for update.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Skill?",
      text: "This action cannot be undone. All skill data will be permanently removed.",
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
      await deleteSkill(id)
      setSkills((prev) => prev.filter((skill) => skill._id !== id))
      Swal.fire({
        title: "Deleted!",
        text: "The skill has been successfully deleted.",
        icon: "success",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "rounded-lg",
          cancelButton: "rounded-lg",
        },
      })
    } catch (error) {
      console.error("Failed to delete skill:", error)
      Swal.fire({
        title: "Error",
        text: "Could not delete the skill. Please try again.",
        icon: "error",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "rounded-lg",
        },
      })
    }
  }

  const handleFormSuccess = async () => {
    setIsAddModalOpen(false)
    setIsUpdateModalOpen(false)
    setEditingSkill(null)
    await fetchSkills()
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
                  <Skeleton className="h-14 w-14 rounded-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
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
                My Skills
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Showcase your expertise and manage your technical skills.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                {filteredSkills.length} Skills
              </Badge>
              {/* Dialog Trigger for New Skill */}
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    <span>New Skill</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
                  <DialogHeader className="p-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold text-gray-900">Add New Skill</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Fill out the details below to add a new skill to your portfolio.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto p-6">
                    <SkillForm onSuccess={handleFormSuccess} />
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
                  placeholder="Search skills by name, type, or proficiency..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border-gray-200 focus:border-blue-300 focus:ring-blue-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Select onValueChange={(value: ISkill["type"] | "all") => setSelectedType(value)} value={selectedType}>
                <SelectTrigger className="w-[180px] rounded-xl h-12">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="soft">Soft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first skill"}
              </p>
              {/* Dialog Trigger for New Skill in empty state */}
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Add Skill
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
                  <DialogHeader className="p-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold text-gray-900">Add New Skill</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Fill out the details below to add a new skill to your portfolio.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto p-6">
                    <SkillForm onSuccess={handleFormSuccess} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkills.map((skill: ISkill) => (
              <SkillCard key={skill._id} skill={skill} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {/* Dialog for Update Skill */}
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
            {/* <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle className="text-2xl font-bold text-gray-900">Update Skill</DialogTitle>
              <DialogDescription className="text-gray-600">
                Edit the details below to update your skill in the portfolio.
              </DialogDescription>
            </DialogHeader> */}
            <div className="flex-1 overflow-y-auto p-6">
              {editingSkill ? (
                <SkillForm onSuccess={handleFormSuccess} initialData={editingSkill} />
              ) : (
                <div className="text-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-600">Loading skill details...</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default GetAllSkills
