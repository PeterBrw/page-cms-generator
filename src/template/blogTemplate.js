import React from "react";

const BlogDetail = ({ pageContext }) => {
  const { alldata } = pageContext;
  const { frontmatter: data } = alldata;

  const res = data.sections.reduce(
    (acc, curr) => ((acc[curr] = true), acc),
    {}
  );
  console.log(res);

  return (
    <div className="bg-blog-post pt-28">
      {res["a"] && <div>a</div>}
      {res["b"] && <div>b</div>}
      {res["c"] && <div>c</div>}
      {res["d"] && <div>d</div>}
      {res["e"] && <div>e</div>}
      {res["f"] && <div>f</div>}
    </div>
  );
};
export default BlogDetail;
