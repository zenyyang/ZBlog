import React from "react";
import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";

import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

type Props = {};

const CategoryPage = async (props: Props) => {
  const { userId } = auth();
  const categories = await prismadb.category.findMany({
    where: {
      userId: userId!,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoryPage;
