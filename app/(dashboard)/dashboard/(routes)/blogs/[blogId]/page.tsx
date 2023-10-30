import prismadb from "@/lib/prisma";
import { BlogForm } from "./components/blog-form";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const DishPage = async ({ params }: { params: { blogId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const blog = await prismadb.blog.findUnique({
    where: {
      id: params.blogId,
    },
    include: {
      Images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogForm initialData={blog} categories={categories} />
      </div>
    </div>
  );
};

export default DishPage;
