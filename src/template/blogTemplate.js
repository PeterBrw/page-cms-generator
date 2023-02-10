import React from 'react';
import MarkdownPage from '../components/markdownPages/markdownPage';

const BlogDetail = ({ pageContext }) => {
    const { alldata } = pageContext;

    console.log(alldata);

    return <MarkdownPage data={alldata.frontmatter} />;
};
export default BlogDetail;
