"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  data: Category[];
};

const MainNav = ({ data }: Props) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/blogs/${route.id}`,
    label: route.name,
    active: pathname === `/blogs/${route.id}`,
  }));
  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 mr-auto">
      <Link
        href={"/blogs"}
        className={cn(
          "text-base font-light transition-colors hover:text-inherit z-20 ",
          pathname === "/blogs" ? " text-inherit" : "text-white"
        )}
      >
        All blogs
      </Link>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-base font-light transition-colors hover:text-inherit z-20 md:block hidden",
            route.active ? " text-inherit" : "text-white"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
