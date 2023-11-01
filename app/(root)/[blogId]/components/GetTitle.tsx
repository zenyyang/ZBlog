import prismadb from "@/lib/prisma";
import React from "react";

type Props = {
  blogId: string;
};

const GetTitle = async ({ blogId }: Props) => {
  const blog = await prismadb.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  return (
    <>
      <h1 className="font-extrabold md:text-6xl text-3xl text-white font-serif">
        {blog?.title}
      </h1>
    </>
  );
};

export default GetTitle;
