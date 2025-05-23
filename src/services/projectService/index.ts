"use server";

import { IProject } from "@/app/types/project";
import { revalidatePublicFrontendPaths } from "@/utils/revalidationUtils";
import { FieldValues } from "react-hook-form";

export async function addProject(userData: FieldValues) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/project/create`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create project");
    }

    const result = await res.json();
    await revalidatePublicFrontendPaths([
      "/dashboard/project/all-projects",
      "/dashboard/project",
      "/",
    ]);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//
export const getAllProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

//
// interface ApiResponse<T> {
//     success: boolean;
//     message: string;
//     data: T;
//   }

export const getProjectById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data;
};

//

export const updateProject = async (
  id: string,
  updatedData: Partial<IProject>
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) return null;

  const data = await res.json();
  await revalidatePublicFrontendPaths([
    `/dashboard/project/${id}`,
    "/dashboard/project/all-project",
    "/dashboard/project",
    "/",
  ]);
  return data;
};
