import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const MarkdownArea = ({ data }) => {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} linkTarget='_blank'>
            {data.rawMarkdownBody}
        </ReactMarkdown>
    );
};

export default MarkdownArea;
