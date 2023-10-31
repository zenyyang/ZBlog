"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistance } from "date-fns";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Article {
  title: string;
  url: string;
  published_date: string;
  publisher: {
    name: string;
    url: string;
  };
}

const RecentNews = () => {
  const [news, setNews] = useState<Article[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        url: "https://news-api14.p.rapidapi.com/search",
        params: {
          q: "nextjs reactjs web-development",
          country: "us",
          language: "en",
          pageSize: "6",
          publisher: "",
        },
        headers: {
          "X-RapidAPI-Key":
            "2e6193a9e5msh53681c210b5f02ap18eb7ejsn8989c4bbc0d9",
          "X-RapidAPI-Host": "news-api14.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      setNews(response.data.articles);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft -= 300;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft += 300;
    }
  };
  return (
    <div className="relative flex items-center">
      <ChevronLeft
        onClick={slideLeft}
        className="ml-5 opacity-50 cursor-pointer hover:opacity-100"
      />
      {isLoading ? (
        <>
          <div>
            <Skeleton className="w-[350px] h-[40px] rounded-md mx-10 my-2 mt-2" />
            <Skeleton className="w-[300px] h-[20px] rounded-full mx-10 my-2" />
            <Skeleton className="w-[300px] h-[20px] rounded-full mx-10 my-2" />
            <Skeleton className="w-[100px] h-[100px] rounded-md mx-10 my-2" />
            <Skeleton className="w-[300px] h-[20px] rounded-full mx-10 my-2" />
          </div>
          <div>
            <Skeleton className="w-[350px] h-[40px] rounded-md mx-10 my-2 mt-2" />
            <Skeleton className="w-[300px] h-[20px] rounded-full mx-10 my-2" />
            <Skeleton className="w-[300px] h-[20px] rounded-full mx-10 my-2" />
            <Skeleton className="w-[100px] h-[100px] rounded-md mx-10 my-2" />
            <Skeleton className="w-[300px] h-[20px] rounded-full mx-10 my-2" />
          </div>
          <div>
            <Skeleton className="w-[350px] h-[40px] rounded-md mx-10 my-2 mt-2" />
            <Skeleton className="w-[300px] h-[20px] rounded-full mx-10 my-2" />
            <Skeleton className="w-[300px] h-[20px] rounded-full mx-10 my-2" />
            <Skeleton className="w-[100px] h-[100px] rounded-md mx-10 my-2" />
            <Skeleton className="w-[300px] h-[20px] rounded-full mx-10 my-2" />
          </div>
        </>
      ) : (
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {news?.map((article) => {
            return (
              <Card
                className="m-5 w-fit h-fit inline-block hover:bg-[#000] hover:bg-opacity-20 transition-all duration-300"
                key={article.url}
              >
                <CardHeader>
                  <CardTitle>
                    <div className="flex flex-row items-center justify-between">
                      <h1 className="text-2xl my-5 capitalize">
                        <span className="bg-gradient-to-r from-black pb-1 to-black bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ">
                          {article.title}
                        </span>
                      </h1>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <p className="text-base font-normal">
                      Source : <span>{article.publisher.url}</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center gap-4 mt-auto">
                  <Link href={article.url} target="_blank" className="w-full">
                    <Button>Continue Reading</Button>
                  </Link>
                  <div className="ml-auto flex items-center gap-2">
                    <p className=" ">
                      by
                      <span className="font-bold mx-1">
                        {article.publisher.name}
                      </span>
                      -
                      {article.published_date
                        ? formatDistance(
                            new Date(article.published_date),
                            new Date(),
                            {
                              addSuffix: true,
                            }
                          )
                        : ""}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <ChevronRight
        onClick={slideRight}
        className="mr-5 opacity-50 cursor-pointer hover:opacity-100"
      />
    </div>
  );
};

export default RecentNews;
