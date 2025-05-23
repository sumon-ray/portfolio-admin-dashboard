"use client";

import TextEditor from "@/app/editor/TextEditor";
import { BlogType } from "@/app/types/blog";
import { updateBlog } from "@/services/blogService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  title: string;
  content: string;
  image: string;
  isPublished: boolean;
};

const UpdateBlogForm = ({ blog }: { blog: BlogType | null }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      content: "",
      image: "",
      isPublished: false,
    },
  });

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        content: blog.content,
        image: blog.image,
        isPublished: blog.isPublished,
      });
    }
  }, [blog, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!blog?._id) return;
    const updateData = {
      title: data.title,
      content: data.content,
      image: data.image,
      isPublished: data.isPublished,
    };
    // TODO: Call API with data and blog?._id
    try {
      const result = await updateBlog(blog._id, updateData);
      console.log(result, "form");
      toast.success("updated blog successfully");
      router.push("/dashboard/blog/all-blogs");
    } catch (error) {}
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Content using TipTap TextEditor */}
        <div>
          <label className="block font-medium mb-1">Content</label>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <TextEditor content={field.value} onChange={field.onChange} />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            {...register("image")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Published Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isPublished")}
            id="isPublished"
          />
          <label htmlFor="isPublished" className="text-sm">
            Published
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlogForm;
