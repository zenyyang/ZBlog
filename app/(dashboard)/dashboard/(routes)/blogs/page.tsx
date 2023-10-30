import { format } from "date-fns";

import prismadb from "@/lib/prisma";

import { BlogClient } from "./components/client";
import { BlogColumn } from "./components/columns";

const BlogPage = async () => {
  const blogs = await prismadb.blog.findMany({
    include: {
      category: true,
    },
  });

  const formattedBlog: BlogColumn[] = blogs.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content?.slice(0, 30).concat("...") || "",
    category: item.category.name,
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogClient data={formattedBlog} />
      </div>
    </div>
  );
};

export default BlogPage;
