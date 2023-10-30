"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type BlogColumn = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
};

export const columns: ColumnDef<BlogColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
