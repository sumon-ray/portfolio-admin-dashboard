"use client";

import { addSkill } from "@/services/skillsService";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Assuming 'sonner' is installed for toasts

type SkillFormValues = {
  name: string;
  type: "technical" | "soft";
  proficiency: "beginner" | "intermediate" | "advanced" | "expert";
  icon?: string;
};

const SkillForm = () => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SkillFormValues>({
    defaultValues: {
      proficiency: "intermediate",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: SkillFormValues) => {
    startTransition(async () => {
      const result = await addSkill(data);
      if (result.success) {
        toast.success("Skill added successfully!");
        route.push('/dashboard/skills/all-skills');
        reset();
      } else {
        // Using toast.error for consistent UX instead of alert
        toast.error(`Failed to add skill: ${result.message || result.error || 'An unknown error occurred.'}`);
      }
    });
  };

  return (
    // Outer container for vertical and horizontal centering of the form on the page.
    // `min-h-screen` ensures it takes full viewport height for centering.
    // `px-4 py-8` adds padding on all sides, useful on smaller screens.
    <div className="flex container  mx-auto p-8 items-center justify-center min-h-screen  py-8">
      {/* Form container:
          `max-w-lg` sets a responsive maximum width (e.g., 32rem or 48rem).
          `w-full` ensures it takes full width up to `max-w-lg`.
          `mx-auto` centers the container horizontally if the parent isn't flex.
          `shadow-lg` for a more pronounced shadow.
          `text-gray-800` for consistent text color within the form title.
      */}
      <div className="  max-w-7xl bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add New Skill
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Skill Name Field */}
          <div>
            {/* Added `htmlFor` to label for accessibility, and `id` to input */}
            <label htmlFor="name" className="block font-medium mb-1 text-gray-700">
              Skill Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Skill name is required" })}
              // Enhanced styling for input fields
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., React"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Skill Type Field */}
          <div>
            {/* Added `htmlFor` to label for accessibility, and `id` to select */}
            <label htmlFor="type" className="block font-medium mb-1 text-gray-700">
              Skill Type
            </label>
            <select
              id="type"
              {...register("type", { required: "Type is required" })}
              // Enhanced styling for select fields
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Select Type</option>
              <option value="technical">Technical</option>
              <option value="soft">Soft</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Proficiency Field */}
          <div>
            {/* Added `htmlFor` to label for accessibility, and `id` to select */}
            <label htmlFor="proficiency" className="block font-medium mb-1 text-gray-700">
              Proficiency
            </label>
            <select
              id="proficiency"
              {...register("proficiency")}
              // Enhanced styling for select fields
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          {/* Icon Field */}
          <div>
            {/* Added `htmlFor` to label for accessibility, and `id` to input */}
            <label htmlFor="icon" className="block font-medium mb-1 text-gray-700">
              Icon (Optional)
            </label>
            <input
              type="text"
              id="icon"
              {...register("icon")}
              placeholder="Ex: 'FaReact', 'SiNextdotjs', 'IoMdSettings'"
              // Enhanced styling for input fields
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              <a
                href="https://react-icons.github.io/react-icons/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Find icon names here (e.g., `IoMdSettings` for `&lt;IoMdSettings /&gt;`)
              </a>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            }`}
          >
            {isPending ? "Submitting..." : "Submit Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;