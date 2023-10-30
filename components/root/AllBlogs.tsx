import React from "react";
import prismadb from "@/lib/prisma";
import Link from "next/link";
import { formatDistance } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import ContentVieweAllBlogs from "./ContentViewAllBlogs";

type Props = {};

const AllBlogs = async (props: Props) => {
  const blogs = await prismadb.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {blogs.map((blog) => {
        const data = JSON.parse(blog?.content ?? "");
        const firstElement: string = JSON.stringify(data[0]);
        const secondElement: string = JSON.stringify(data[1]);
        const finalData: string =
          "[" + firstElement + "," + secondElement + "]";

        return (
          <Card className="m-10 relative" key={blog.id}>
            <CardHeader>
              <CardTitle>
                <div className="flex flex-row items-center justify-between">
                  <h1 className="text-2xl my-5 capitalize">
                    <span className="bg-gradient-to-r from-black pb-2 to-black bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ">
                      {blog?.title}
                    </span>
                  </h1>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-normal tracking-wide">Tag:</p>
                    <Badge>{blog?.category.name}</Badge>
                  </div>
                </div>
              </CardTitle>
              <CardDescription>
                <div
                  style={{
                    backgroundImage: `url(${blog?.mainImage})`,
                  }}
                  className="w-full h-96 bg-center bg-cover"
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="my-5 hidden md:block text-transparent">
              <ContentVieweAllBlogs content={finalData ?? ""} />
            </CardContent>
            <CardFooter className="flex flex-col md:absolute md:bottom-0 md:left-0 md:right-0 md:h-[80px]">
              <Link href={`/${blog.id}`}>
                <Button className=" w-full ">Continue Reading</Button>
              </Link>
              <div className="ml-auto flex items-center gap-2">
                <p className=" mt-2">
                  by
                  <span className=" font-bold "> Monyvann </span> -{" "}
                  {blog?.createdAt
                    ? formatDistance(new Date(blog.createdAt), new Date(), {
                        addSuffix: true,
                      })
                    : ""}
                </p>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default AllBlogs;
