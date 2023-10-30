import prismadb from "@/lib/prisma";
import { formatDistance } from "date-fns";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";

import {
  CornerDownRight,
  Instagram,
  Linkedin,
  Menu,
  MoveRight,
  Twitter,
} from "lucide-react";
import Navbar from "@/components/root/Navbar";
import ContentView from "@/components/root/ContentView";
import BlogFooter from "@/components/root/BlogFooter";

const BlogPage = async ({ params }: { params: { blogId: string } }) => {
  const blog = await prismadb.blog.findUnique({
    where: {
      id: params.blogId,
    },
  });

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const content = JSON.parse(blog.content ?? "");
  const headings = content.filter((item: any) => item.type === "heading");
  const headingContents = headings.map((item: any) => item.content);
  const heading = headingContents.map((item: any) => item[0].text);

  return (
    <div className="w-full h-full ">
      <Navbar />
      <div className="relative w-full h-[400px] bg-gradient-to-r from-purple-400 to-blue-800 items-center justify-center flex flex-col">
        <div className="flex flex-col gap-y-1 items-center">
          <h1 className="font-extrabold text-6xl text-white font-serif">
            {blog.title}
          </h1>
          <h3 className="mt-3 text-white">
            Updated on {format(new Date(blog.createdAt), "MMM do, yyyy")}
          </h3>
        </div>
        <div className="w-full h-[20%] absolute bottom-0 flex items-center">
          <div className="flex items-center mx-10 gap-10">
            <Link
              href="https://www.instagram.com/zenxai/"
              className="text-transparent"
            >
              <Instagram className="w-8 h-8 text-white" />
            </Link>
            <Link
              className="text-transparent"
              href="https://www.facebook.com/zenxai"
            >
              <Twitter className="w-8 h-8  text-white" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/zenxai/ "
              className="text-transparent"
            >
              <Linkedin className="w-8 h-8 text-white" />
            </Link>
          </div>
          <div className="flex items-center gap-2 ml-auto mx-10">
            <p className=" text-white">
              by
              <span className="font-bold "> Monyvann </span> -{" "}
              {blog?.createdAt
                ? formatDistance(new Date(blog.createdAt), new Date(), {
                    addSuffix: true,
                  })
                : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 m-5 gap-5">
        <div className=" col-span-1 ">
          <p className="text-muted-foreground text-xs">
            Welcome to ZBLOG! We're delighted to have you here. Enjoy reading
            our blog posts without any hidden fees or payment requests. Sit
            back, relax, and dive into a world of insightful content. Happy
            reading!
          </p>
          <h1 className="text-2xl mt-10 flex items-center gap-2">
            <Menu />
            Table of Content
          </h1>
          <div className="mt-3 ml-2">
            {heading.map((item: any) => (
              <div className="flex items-center gap-2 text-base">
                <CornerDownRight className="w-4 h-4" /> {item}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline font-medium">
              Home{" "}
            </Link>
            <MoveRight className="w-4 h-4" />{" "}
            <Link href="/blogs" className="hover:underline font-medium">
              Blog{" "}
            </Link>
            <MoveRight className="w-4 h-4" /> {blog.title}
          </div>
          <div className="mt-10">
            <ContentView content={blog.content ?? ""} />
          </div>
        </div>
      </div>
      <BlogFooter />
    </div>
  );
};

export default BlogPage;
