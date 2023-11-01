import { Blog } from "@prisma/client";
import React from "react";

import { CornerDownRight, Menu } from "lucide-react";

type Props = {
  blog: Blog;
};

const TableContent = ({ blog }: Props) => {
  const content = JSON.parse(blog.content ?? "");
  const headings = content.filter((item: any) => item.type === "heading");
  const headingId = headings.map((item: any) => item.id);
  const headingsLevel = headings.map((item: any) => item.props.level);
  const headingContents = headings.map((item: any) => item.content);
  const heading = headingContents.map((item: any) =>
    item[0].text.replace(/:$/, "")
  );

  return (
    <>
      <h1 className="text-2xl mt-10 flex items-center gap-2">
        <Menu />
        Table of Content
      </h1>
      <div className="mt-3 ml-2">
        {heading.map((item: any) => (
          <div className="flex items-center gap-2 text-base">
            {headingsLevel[heading.indexOf(item)] === 1 && (
              <>
                <CornerDownRight className="w-4 h-4 my-2" /> {item}
              </>
            )}
            {headingsLevel[heading.indexOf(item)] === 2 && (
              <>
                <CornerDownRight className="ml-3 w-4 h-4 my-2" /> {item}
              </>
            )}
            {headingsLevel[heading.indexOf(item)] === 3 && (
              <>
                <CornerDownRight className="ml-5 w-4 h-4 my-2" /> {item}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TableContent;
