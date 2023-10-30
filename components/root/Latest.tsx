import React from "react";
import prismadb from "@/lib/prisma";
import { formatDistance } from "date-fns";
import Link from "next/link";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ContentView from "./ContentView";

type Props = {};

const Latest = async (props: Props) => {
  const latestBlog = await prismadb.blog.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });
  const data = JSON.parse(latestBlog?.content ?? "");
  const firstElement: string = JSON.stringify(data[0]);
  const secondElement: string = JSON.stringify(data[1]);
  const finalData: string = "[" + firstElement + "," + secondElement + "]";

  return (
    <div>
      <Card className="m-10 ">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center justify-between">
              <p className="md:text-2xl text-lg bg-gradient-to-r from-red-400 to-blue-400 text-transparent bg-clip-text">
                Lastest Blog -{" "}
              </p>
              <div className="flex items-center gap-2">
                <p className="md:text-lg text-sm font-normal tracking-wide">
                  Tag:
                </p>
                <Badge>{latestBlog?.category.name}</Badge>
              </div>
            </div>
            <h1 className="md:text-5xl text-2xl my-5 capitalize">
              <span className="bg-gradient-to-r from-black to-black bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ">
                {latestBlog?.title}
              </span>
            </h1>
          </CardTitle>
          <CardDescription>
            <div
              style={{
                backgroundImage: `url(${latestBlog?.mainImage})`,
              }}
              className="w-full h-96 bg-cover bg-center"
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="md:block hidden">
          <ContentView content={finalData ?? ""} />
        </CardContent>
        <CardFooter className="flex md:flex-row flex-col">
          <Link href={`/${latestBlog?.id}`}>
            <Button className="md:w-auto w-full">Continue Reading</Button>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Avatar className="md:block hidden">
              <AvatarImage src="https://th.bing.com/th/id/OIP.Alw_Z3WZ0sSKa5_PbyMAZgHaHa?pid=ImgDet&rs=1" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="md:mt-0 mt-5">
              by
              <span className=" font-bold "> Monyvann </span> -{" "}
              {latestBlog?.createdAt
                ? formatDistance(new Date(latestBlog.createdAt), new Date(), {
                    addSuffix: true,
                  })
                : ""}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Latest;
