import React from "react";

import Navbar from "@/components/root/Navbar";
import AllBlogs from "@/components/root/AllBlogs";
import BlogFooter from "@/components/root/BlogFooter";

type Props = {};

const BlogsPage = (props: Props) => {
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
              All blogs.
            </p>
          </div>
        </div>
        <div className="w-full h-full">
          <AllBlogs />
        </div>
      </div>
      <BlogFooter />
    </div>
  );
};

export default BlogsPage;
