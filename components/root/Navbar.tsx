import Link from "next/link";
import React from "react";
import MainNav from "./MainNav";
import prismadb from "@/lib/prisma";
import Image from "next/image";

import Logo from "@/public/logo.png";

type Props = {};

const Navbar = async ({}: Props) => {
  const categories = await prismadb.category.findMany();

  return (
    <div className="absolute top-0 z-20 py-5">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2 items-center">
          <Image src={Logo} alt="lgoo" className="w-12 h-12 hover:rotate-45" />
          <p className="font-bold text-xl text-white font-serif tracking-widest">
            ZBlog
          </p>
        </Link>
        <MainNav data={categories} />
      </div>
    </div>
  );
};

export default Navbar;
