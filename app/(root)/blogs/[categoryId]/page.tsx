import prismadb from "@/lib/prisma";
import React from "react";

import BlogFooter from "@/components/root/BlogFooter";
import BlogsByCategory from "@/components/root/BlogsByCategory";
import Navbar from "@/components/root/Navbar";

type Props = {};

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const blogs = await prismadb.blog.findMany({
    where: {
      categoryId: params.categoryId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });
  return (
    <div>
      <div className="w-full h-full ">
        <Navbar />
        <div className="relative w-full h-[400px] bg-gradient-to-r from-purple-400 to-blue-800 items-center justify-center flex flex-col">
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
          <video
            src="/videos/bg.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          />
          <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-white">
            <p className="font-semibold font-serif text-6xl pt-10">
              {blogs[0]?.category.name}
            </p>
          </div>
        </div>
      </div>
      <BlogsByCategory blogs={blogs} />
      <BlogFooter />
    </div>
  );
};

export default CategoryPage;
