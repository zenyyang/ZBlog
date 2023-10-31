import React from "react";
import prismadb from "@/lib/prisma";
import { formatDistance } from "date-fns";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = {};

const Recent = async (props: Props) => {
  const blogs = await prismadb.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
    take: 4,
  });

  return (
    <div className="sm:grid gap-5 grid-cols-4 grid-rows-2 sm:h-[600px] m-5">
      <div
        className="col-span-2 row-span-2 bg-contain bg-center bg-no-repeat relative flex items-end justify-start md:my-0 my-2"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${blogs[0].mainImage})`,
        }}
      >
        <Link href={`/${blogs[0].id}`}>
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300" />
        </Link>
        <div className="m-5 w-full">
          <Badge variant={"secondary"} className=" rounded-none mb-2">
            {blogs[0].category.name}
          </Badge>
          <div className="md:flex items-center w-full">
            <p className="text-lg text-white">{blogs[0].title}</p>
            <p className="text-sm text-white ml-auto">
              by <span className="font-medium">Monyvann</span> -{" "}
              {blogs[0].createdAt
                ? formatDistance(new Date(blogs[0].createdAt), new Date(), {
                    addSuffix: true,
                  })
                : ""}
            </p>
          </div>
        </div>
      </div>
      <div
        className=" relative flex items-end justify-start col-span-2 row-span-1 bg-cover bg-center bg-no-repeat md:my-0 my-2"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${blogs[1].mainImage})`,
        }}
      >
        <Link href={`/${blogs[1].id}`}>
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300" />
        </Link>
        <div className="m-5 w-full">
          <Badge variant={"secondary"} className=" rounded-none mb-2">
            {blogs[0].category.name}
          </Badge>
          <div className="md:flex items-center w-full">
            <p className="text-lg text-white">{blogs[1].title}</p>
            <p className="text-sm text-white ml-auto">
              by <span className="font-medium">Monyvann</span> -{" "}
              {blogs[1].createdAt
                ? formatDistance(new Date(blogs[1].createdAt), new Date(), {
                    addSuffix: true,
                  })
                : ""}
            </p>
          </div>
        </div>
      </div>
      <div
        className="relative flex items-end justify-start col-span-1 row-span-1 bg-cover bg-center bg-no-repeat md:my-0 my-2"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${blogs[2].mainImage})`,
        }}
      >
        <Link href={`/${blogs[2].id}`}>
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300" />
        </Link>
        <div className="m-5 w-full">
          <Badge variant={"secondary"} className=" rounded-none mb-2">
            {blogs[2].category.name}
          </Badge>
          <div className=" items-center w-full">
            <p className="text-lg text-white">{blogs[2].title}</p>
            <p className="text-sm text-white ml-auto">
              by <span className="font-medium">Monyvann</span> -{" "}
              {blogs[2].createdAt
                ? formatDistance(new Date(blogs[2].createdAt), new Date(), {
                    addSuffix: true,
                  })
                : ""}
            </p>
          </div>
        </div>
      </div>
      <div
        className="relative flex items-end justify-start col-span-1 row-span-1 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${blogs[3].mainImage})`,
        }}
      >
        <Link href={`/${blogs[3].id}`}>
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300" />
        </Link>
        <div className="m-5 w-full">
          <Badge variant={"secondary"} className=" rounded-none mb-2">
            {blogs[3].category.name}
          </Badge>
          <div className=" items-center w-full">
            <p className="text-lg text-white">{blogs[3].title}</p>
            <p className="text-sm text-white ml-auto">
              by <span className="font-medium">Monyvann</span> -{" "}
              {blogs[3].createdAt
                ? formatDistance(new Date(blogs[3].createdAt), new Date(), {
                    addSuffix: true,
                  })
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recent;
