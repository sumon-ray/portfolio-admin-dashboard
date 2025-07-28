// app/blog/[id]/page.tsx

// import UpdateBlogForm from "@/components/UpdateBlogForm";
import { getBlogById } from "@/services/blogService";
// import { BlogType } from "@/app/types/blog";
import UpdateBlogForm from "@/components/blog/UpdateBlogForm";

interface PageProps {
  params: { id: string };
}

const BlogEditPage = async ({ params }: PageProps) => {
  const blogRes = await getBlogById(params.id);
  const blog = blogRes?.data;

  if (!blog) {
    return <div className="text-red-500 text-center p-10">Blog not found.</div>;
  }

  return (
    <div className="p-6">
      <UpdateBlogForm blog={blog} />
    </div>
  );
};

export default BlogEditPage;
