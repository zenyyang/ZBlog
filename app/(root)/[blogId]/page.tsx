import React from "react";
import Link from "next/link";
const ContentView = dynamic(
  () => import("@/components/root/ContentViewAllBlogs")
);
const TableContent = dynamic(() => import("./components/TableContent"));
const GetContent = dynamic(() => import("./components/GetContent"));
const GetTitle = dynamic(() => import("./components/GetTitle"));
const GetUpdate = dynamic(() => import("./components/GetUpdate"));

import {
  Instagram,
  Linkedin,
  Loader2Icon,
  MoveRight,
  Twitter,
} from "lucide-react";
import Navbar from "@/components/root/Navbar";
import BlogFooter from "@/components/root/BlogFooter";
import dynamic from "next/dynamic";

const BlogPage = ({ params }: { params: { blogId: string } }) => {
  return (
    <div className="w-full h-full ">
      <Navbar />
      <div className="relative w-full h-[400px] bg-gradient-to-r from-purple-400 to-blue-800 items-center justify-center flex flex-col">
        <div className="flex flex-col gap-y-1 items-center">
          <GetTitle blogId={params.blogId} />
          <GetUpdate blogId={params.blogId} />
        </div>
        <div className="w-full h-[20%] absolute bottom-0 flex items-center">
          <div className="flex items-center mx-10 md:gap-10 gap-5">
            <Link
              href="https://www.instagram.com/_monyvann_/"
              target="_blank"
              className="text-transparent"
            >
              <Instagram className="md:w-5 md:h-5 w-5 h-5 text-white" />
            </Link>
            <Link
              className="text-transparent"
              href="https://twitter.com/zennyangg"
              target="_blank"
            >
              <Twitter className="md:w-5 md:h-5 w-5 h-5  text-white" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/monyvann-men-65b7a5260/"
              target="_blank"
              className="text-transparent"
            >
              <Linkedin className="md:w-5 md:h-5 w-5 h-5 text-white" />
            </Link>
          </div>
          <div className="flex items-center gap-2 ml-auto mx-10 md:text-base text-sm">
            <p className=" text-white">
              by
              <span className="font-bold "> Monyvann </span>
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
          <TableContent blogId={params.blogId} />
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
            <MoveRight className="w-4 h-4" />
          </div>
          <div className="mt-10">
            <GetContent blogId={params.blogId} />
          </div>
        </div>
      </div>
      <BlogFooter />
    </div>
  );
};

export default BlogPage;
