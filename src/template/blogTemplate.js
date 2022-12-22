import React from "react";

const BlogDetail = ({ pageContext }) => {
  const { alldata } = pageContext;

  console.log(alldata)

  return (
    <div className="bg-blog-post pt-28">
      json pagesz
    </div>
  );
};
export default BlogDetail;
