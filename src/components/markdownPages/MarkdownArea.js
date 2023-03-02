import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const MarkdownArea = ({ data }) => {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} linkTarget='_blank'>
            {data}
        </ReactMarkdown>
    );
};

export default MarkdownArea;
