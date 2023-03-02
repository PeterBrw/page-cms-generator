import React from 'react';
import MarkdownPage from '../components/markdownPages/markdownPage';

const BlogDetail = ({ pageContext }) => {
    const { alldata } = pageContext;

    return <MarkdownPage data={alldata.frontmatter} rawMarkdownBody={alldata.rawMarkdownBody} />;
};
export default BlogDetail;
