"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IProject } from "@/app/types/project";
import { updateProject } from "@/services/projectService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormInputs = {
  title: string;
  description: string;
  technologies: string;
  liveLink: string;
  githubLink: string;
  isFeatured: boolean;
  image: string;
};

const UpdateProjectForm = ({ project }: { project: IProject | null }) => {
  const route = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (project) {
      reset({
        title: project.title || "",
        description: project.description || "",
        technologies: project.technologies?.join(", ") || "",
        liveLink: project.liveLink || "",
        githubLink: project.githubLink || "",
        isFeatured: project.isFeatured || false,
        image: project.image || "",
      });
    }
  }, [project, reset]);

  const onSubmit = async (data: FormInputs) => {
    try {
      const techArray = data.technologies
        ? data.technologies.split(",").map((t) => t.trim())
        : [];

      const updatedData = {
        ...data,
        technologies: techArray,
      };

      if (!project) {
        alert("No project found.");
        return;
      }

      await updateProject(project._id, updatedData);
      toast.success("Project updated successfully!");
      route.push('/dashboard/project/all-projects')

    } catch (error) {
      toast.error("Failed to update project.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl flex flex-col justify-center  mx-auto p-6 bg-white border rounded-lg shadow space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Update Project
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project Title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Technologies (comma separated)
          </label>
          <input
            {...register("technologies")}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Live Link
          </label>
          <input
            {...register("liveLink")}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            GitHub Link
          </label>
          <input
            {...register("githubLink")}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Image URL
          </label>
          <input
            {...register("image")}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://image-link.jpg"
          />
        </div>

        <div className="flex items-start gap-2 pt-6">
          <input
            type="checkbox"
            {...register("isFeatured")}
            id="isFeatured"
            className="w-5 h-5 mt-1"
          />
          <label htmlFor="isFeatured" className="text-gray-700 font-medium">
            Featured Project
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a brief project description..."
          rows={5}
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded text-white font-semibold transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Project"}
        </button>
      </div>
    </form>
  );
};

export default UpdateProjectForm;
