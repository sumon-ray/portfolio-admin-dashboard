"use server";
// import {revalidate} from "../../app/utils/revalidate.ts";
import { revalidatePublicFrontendPaths } from "@/utils/revalidationUtils";
import { BlogType } from "@/app/types/blog";
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export const createBlog = async (data: {
  title: string;
  content: string;
  isPublished: boolean;
  image: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/create`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create blog");
    }
    
 const result = await res.json();
 await revalidatePublicFrontendPaths([
  '/dashboard/blog/all-blogs',
  '/dashboard/blog',
  '/',
]);

return result;
  } catch (error) {
    console.error("Blog creation error:", error);
    throw error;
  }
};

// all blogs

export const getAllBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
      method: "GET",
      cache: "no-store",

    });

    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

//   interface ApiResponse<T> {
//     success: boolean;
//     message: string;
//     data: T;
//   }

export const getBlogById = async (
  id: string
): Promise<ApiResponse<BlogType> | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  console.log(data, "single");
  return data;
};

// update
export const updateBlog = async (
  id: string,
  updatedData: Partial<BlogType>
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      // jodi authentication lagay, ekhane token add korte hobe
      // "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  // console.log(res, "updated data");
  if (!res.ok) return null;

  const data = await res.json();
  await revalidatePublicFrontendPaths([
    `/dashboard/blog/${id}`,
    '/dashboard/blog/all-blogs',
    '/dashboard/blog',
    '/',
  ]);
  return data;
};

//
export const deleteBlog = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, {
    method: "DELETE",
    cache: "no-store",

  });

  if (!res.ok) return null;

  const data = await res.json();
  // console.log(data, "single");
  await revalidatePublicFrontendPaths([
   // `/dashboard/blog/${id}`, // ডিলিট করা ব্লগের পেজ রিভ্যালিডেট করার দরকার নেই, কারণ এটি আর থাকবে না
    '/dashboard/blog/all-blogs',
    '/dashboard/blog',
    '/',
  ]);
  return data;
};
