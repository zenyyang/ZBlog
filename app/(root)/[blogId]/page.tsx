import prismadb from "@/lib/prisma";
import { formatDistance } from "date-fns";
import React, { Suspense } from "react";
import { format } from "date-fns";
import Link from "next/link";

import {
  CornerDownRight,
  Instagram,
  Linkedin,
  Loader2Icon,
  Menu,
  MoveRight,
  Twitter,
} from "lucide-react";
import Navbar from "@/components/root/Navbar";
import ContentView from "@/components/root/ContentView";
import BlogFooter from "@/components/root/BlogFooter";
import TableContent from "./components/TableContent";

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
  const headingId = headings.map((item: any) => item.id);
  const headingsLevel = headings.map((item: any) => item.props.level);
  const headingContents = headings.map((item: any) => item.content);
  const heading = headingContents.map((item: any) =>
    item[0].text.replace(/:$/, "")
  );

  return (
    <div className="w-full h-full ">
      <Navbar />
      <div className="relative w-full h-[400px] bg-gradient-to-r from-purple-400 to-blue-800 items-center justify-center flex flex-col">
        <div className="flex flex-col gap-y-1 items-center">
          <h1 className="font-extrabold md:text-6xl text-3xl text-white font-serif">
            {blog.title}
          </h1>
          <h3 className="mt-3 text-white">
            Updated on {format(new Date(blog.createdAt), "MMM do, yyyy")}
          </h3>
        </div>
        <div className="w-full h-[20%] absolute bottom-0 flex items-center">
          <div className="flex items-center mx-10 md:gap-10 gap-5">
            <Link
              href="https://www.instagram.com/_monyvann_/"
              target="_blank"
              className="text-transparent"
            >
              <Instagram className="md:w-8 md:h-8 w-5 h-5 text-white" />
            </Link>
            <Link
              className="text-transparent"
              href="https://twitter.com/zennyangg"
              target="_blank"
            >
              <Twitter className="md:w-8 md:h-8 w-5 h-5  text-white" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/monyvann-men-65b7a5260/"
              target="_blank"
              className="text-transparent"
            >
              <Linkedin className="md:w-8 md:h-8 w-5 h-5 text-white" />
            </Link>
          </div>
          <div className="flex items-center gap-2 ml-auto mx-10 md:text-base text-sm">
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
      <div className="md:grid grid-cols-4 m-5 gap-5">
        <div className=" col-span-1 ">
          <p className="text-muted-foreground text-xs">
            Welcome to ZBLOG! We're delighted to have you here. Enjoy reading
            our blog posts without any hidden fees or payment requests. Sit
            back, relax, and dive into a world of insightful content. Happy
            reading!
          </p>
          <TableContent blog={blog} />
        </div>
        <div className="col-span-3 md:mt-0 mt-10">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            <MoveRight className="w-4 h-4" />{" "}
            <Link href="/blogs" className="hover:underline font-medium">
              Blog
            </Link>
            <MoveRight className="w-4 h-4" /> {blog.title}
          </div>
          <div className="mt-10">
            <Suspense
              fallback={
                <div className="flex items-center justify-center w-full h-full">
                  <Loader2Icon className=" animate-spin" />
                </div>
              }
            >
              <ContentView content={blog.content ?? ""} />
            </Suspense>
          </div>
        </div>
      </div>
      <BlogFooter />
    </div>
  );
};

export default BlogPage;
