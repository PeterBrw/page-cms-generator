import React from "react";

export default function JsonPage({ data }) {
  const sections = data.sections.reduce(
    (acc, curr) => ((acc[curr] = true), acc),
    {}
  );

  const { title, seoTitle } = data;

  return (
    <div>
      <h1>{title}</h1>
      <p>{seoTitle}</p>
      {sections["a"] && <div>a</div>}
      {sections["b"] && <div>b</div>}
      {sections["c"] && <div>c</div>}
      {sections["d"] && <div>d</div>}
      {sections["e"] && <div>e</div>}
      {sections["f"] && <div>f</div>}
    </div>
  );
}
