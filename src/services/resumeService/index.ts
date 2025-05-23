// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
// }

import { revalidatePublicFrontendPaths } from "@/utils/revalidationUtils";

export const uploadResume = async (
  file: File
)=> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/upload`, {
    method: "POST",
    cache: "no-store",
    body: formData,
  });

  //   console.log(res, "server")
  if (!res.ok) return null;

  const data= await res.json();
  revalidatePublicFrontendPaths([
    '/dashboard/resume/upload'
  ])
  return data;
};
