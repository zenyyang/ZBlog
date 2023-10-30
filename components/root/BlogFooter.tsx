import React from "react";

import Subscribe from "./Subscribe";

type Props = {};

const BlogFooter = (props: Props) => {
  return (
    <div className="p-5 bg-gray-100 h-fit dark:bg-[#232133]">
      <Subscribe />
    </div>
  );
};

export default BlogFooter;
