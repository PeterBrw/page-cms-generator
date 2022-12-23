import React from 'react';
import MarkdownPage from '../components/markdownPages/markdownPage';

const BlogDetail = ({ pageContext }) => {
    const { alldata } = pageContext;

    console.log(alldata);

    return (
        <div className='bg-blog-post pt-28'>
            <MarkdownPage data={alldata.frontmatter} />
        </div>
    );
};
export default BlogDetail;
