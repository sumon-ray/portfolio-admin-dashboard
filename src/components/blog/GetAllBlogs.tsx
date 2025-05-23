"use client";

import { BlogType } from "@/app/types/blog";
import { deleteBlog } from "@/services/blogService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const GetAllBlogs = ({ blogs }: { blogs: BlogType | null }) => {
  const router = useRouter();
  const imageSrc = isValidUrl(blogs?.image) ? blogs!.image : "/placeholder.png";

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-6 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={imageSrc}
          alt={blogs?.title ?? "Blog image"}
          fill
          className="object-cover rounded-t-lg"
          sizes="100vw"
          priority
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
          {blogs?.title}
        </h3>
        <div
          className="text-gray-700 text-sm md:text-base overflow-auto max-h-36"
          dangerouslySetInnerHTML={{ __html: blogs?.content || "" }}
        />
        <p className="mt-4 text-xs text-gray-500 italic">
          Published on: {new Date(blogs?.createdAt || "").toLocaleDateString()}
        </p>
        <div className="flex justify-between pt-2">
          <Button onClick={() => router.push(`/dashboard/blog/${blogs?._id}`)}>
            update
          </Button>
          <Button
            onClick={async () => {
              if (!blogs?._id) return;
              try {
                await deleteBlog(blogs?._id);
                toast.success("Blog deleted successfully");
                router.refresh();
              } catch (error) {
                toast.error("failed to delete");
              }
            }}
          >
            delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetAllBlogs;
