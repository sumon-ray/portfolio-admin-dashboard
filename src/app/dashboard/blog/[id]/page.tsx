import UpdateBlogForm from "@/components/blog/UpdateBlogForm";
import { getBlogById } from "@/services/blogService";
import { BlogType } from "@/app/types/blog";

// ✅ Correct type
interface PageProps {
  params: {
    id: string;
  };
}

const UpdatePage = async ({ params }: PageProps) => {
  const { id } = params; // ❌ No await here

  const res = await getBlogById(id);
  const blog = res?.data ?? null;

  return <UpdateBlogForm blog={blog} />;
};

export default UpdatePage;
