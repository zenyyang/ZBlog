import ContentView from "@/components/root/ContentView";
import prismadb from "@/lib/prisma";
import React from "react";

type Props = {
  blogId: string;
};

const GetContent = async ({ blogId }: Props) => {
  const blog = await prismadb.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  return (
    <div>
      <ContentView content={blog?.content || ""} />
    </div>
  );
};

export default GetContent;
