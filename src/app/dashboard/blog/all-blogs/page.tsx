import { BlogType } from "@/app/types/blog";
import GetAllBlogs from "@/components/blog/GetAllBlogs";
import { getAllBlogs } from "@/services/blogService";

const allBlogPage = async () => {
  const res = await getAllBlogs();
  const blogs = res?.data ?? [];

  return (
    <div className="p-4  mx-auto w-full grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {blogs.length > 0 ? (
        blogs.map((blog: BlogType) => <GetAllBlogs key={blog._id} blogs={blog} />)
      ) : (
        <p className="text-center col-span-full">No blogs found.</p>
      )}
    </div>
  );
};

export default allBlogPage;
