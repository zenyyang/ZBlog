import prismadb from "@/lib/prisma";
import { format } from "date-fns";
import React from "react";

type Props = {
  blogId: string;
};

const GetUpdate = async ({ blogId }: Props) => {
  const blog = await prismadb.blog.findUnique({
    where: {
      id: blogId,
    },
  });
  return (
    <>
      <h3 className="mt-3 text-white">
        Updated on {format(new Date(blog!.createdAt), "MMM do, yyyy")}
      </h3>
    </>
  );
};

export default GetUpdate;
