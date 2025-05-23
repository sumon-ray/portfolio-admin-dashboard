// your-admin-dashboard-project/utils/revalidationUtils.ts
"use server"; // এই ইউটিলিটি ফাংশনটি সার্ভার-সাইডেই চলবে

const PUBLIC_FRONTEND_BASE_URL = process.env.NEXT_PUBLIC_PUBLIC_FRONTEND_URL;
const MY_REVALIDATE_SECRET = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;

/**
 * পাবলিক ফ্রন্টএন্ডের Next.js ক্যাশে রিফ্রেশ করার জন্য রিভ্যালিডেশন API কল করে।
 * @param paths - যেসব পাথের ক্যাশে রিভ্যালিডেট করতে হবে তাদের একটি অ্যারে।
 */
export async function revalidatePublicFrontendPaths(paths: string[]) {
  if (!PUBLIC_FRONTEND_BASE_URL || !MY_REVALIDATE_SECRET) {
    console.error("Error: Revalidation URL or Secret is not configured in admin dashboard environment variables.");
    return; // কনফিগার করা না থাকলে কল করবে না
  }

  for (const path of paths) {
    try {
      const revalidateRes = await fetch(
        `${PUBLIC_FRONTEND_BASE_URL}/api/revalidate?path=${path}&secret=${MY_REVALIDATE_SECRET}`
      );
      if (!revalidateRes.ok) {
        const errorText = await revalidateRes.text();
        console.error(`Failed to revalidate path ${path} on public frontend: ${revalidateRes.status} - ${errorText}`);
      } else {
        console.log(`Successfully revalidated path: ${path} on public frontend.`);
      }
    } catch (error) {
      console.error(`Error during revalidation for path ${path} on public frontend:`, error);
    }
  }
}