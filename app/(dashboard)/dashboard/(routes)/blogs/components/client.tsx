"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { BlogColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface BlogClientProps {
  data: BlogColumn[];
}

export const BlogClient: React.FC<BlogClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="md:flex items-center justify-between">
        <Heading
          title={`Blog (${data.length})`}
          description="Manage blogs for your website."
        />
        <Button
          onClick={() => {
            router.push(`/dashboard/blogs/new`);
          }}
          className="md:w-auto md:mt-0 w-full mt-3"
        >
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
