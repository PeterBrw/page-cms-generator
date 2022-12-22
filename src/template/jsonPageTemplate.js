import React from "react";
import JsonPage from "../components/jsonPages/jsonPage";

const JsonPageTemplate = ({ pageContext }) => {
  const { alldata: data } = pageContext;
  return <JsonPage data={data} />;
};
export default JsonPageTemplate;
