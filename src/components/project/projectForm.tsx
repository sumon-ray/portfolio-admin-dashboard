"use client";
import { addProject } from "@/services/projectService";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormInputs = {
  title: string;
  description: string;
  technologies: string;
  liveLink: string;
  githubLink: string;
  isFeatured: boolean;
  image: string;
};

const ProjectForm = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: {
      isFeatured: false,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    const technologies = data.technologies
      ? data.technologies.split(",").map((tech) => tech.trim())
      : [];

    const projectData = {
      title: data.title,
      description: data.description,
      technologies,
      liveLink: data.liveLink,
      githubLink: data.githubLink,
      isFeatured: data.isFeatured,
      image: data.image,
    };

    try {
      const res = await addProject(projectData);
      toast.success("preject added successfully");
        // console.log("✅ Project Created:", res._id);
    //   const id = res.data?._id; // MongoDB or your DB's returned ID
    //   router.push(`/dashboard/update/${id}`);
      reset();
    } catch (error) {
      console.error(" Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto flex flex-col justify-center container  space-y-4 p-4 border rounded shadow"
    >
      <div>
        <label>Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full border p-2"
          type="text"
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full border p-2"
        />
      </div>

      <div>
        <label>Technologies (comma separated)</label>
        <input {...register("technologies")} className="w-full border p-2" />
      </div>

      <div>
        <label>Live Link</label>
        <input {...register("liveLink")} className="w-full border p-2" />
      </div>

      <div>
        <label>GitHub Link</label>
        <input {...register("githubLink")} className="w-full border p-2" />
      </div>

      <div>
        <label>Image URL</label>
        <input {...register("image")} className="w-full border p-2" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isFeatured")} />
        <label>Is Featured</label>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default ProjectForm;
