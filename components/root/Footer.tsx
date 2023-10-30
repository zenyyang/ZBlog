import Image from "next/image";
import React from "react";

import Logo from "@/public/logo.png";
import Link from "next/link";
import prismadb from "@/lib/prisma";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Subscribe from "./Subscribe";

type Props = {};

const Footer = async (props: Props) => {
  const categories = await prismadb.category.findMany();

  return (
    <div className="p-5 bg-gray-100 h-fit">
      <div className="flex items-center lg:gap-44 gap-32">
        <Link href="/" className="flex items-center">
          <Image alt="logo" src={Logo} className="w-24 h-24" />
          <p className="text-xl font-bold font-serif tracking-widest">ZBlog</p>
        </Link>
        <div className="md:flex hidden items-center gap-10 mx-5 lg:mt-5 ">
          {categories.map((category) => (
            <div key={category.id}>
              <Link href={`/category/${category.id}`} key={category.id}>
                <p className="text-xl font-bold tracking-widest">
                  {category.name.toUpperCase()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Subscribe />
    </div>
  );
};

export default Footer;
