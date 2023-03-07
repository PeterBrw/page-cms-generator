import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { GatsbyImage } from 'gatsby-plugin-image';
import { css } from 'twin.macro';

const LeftSection = ({ image, subtitle, markdown, preview, backgroundColor }) => {
    return (
        <div
            className='container max-w-7xl m-auto px-4 lg:px-8'
            css={css`
                background-color: ${backgroundColor ? backgroundColor : ''};
            `}
        >
            <div className='py-8 md:py-12 lg:py-20'>
                <div className='sm:grid sm:grid-cols-12 sm:gap-12'>
                    <div className='col-span-12 lg:col-span-6 mt-8 sm:mt-0  hidden lg:block'>
                        <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-2xl'>
                            {preview && <img src={image} alt='NIST Standard detailed view' />}
                            {!preview && <GatsbyImage alt='' image={image} />}
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                        <div className='mx-auto lg:mx-0 max-w-xl lg:max-w-lg'>
                            <ReactMarkdown rehypePlugins={[rehypeRaw]} linkTarget='_blank'>
                                {subtitle}
                            </ReactMarkdown>
                        </div>
                        <div className='mx-auto lg:mx-0 max-w-xl lg:max-w-lg'>
                            <div className='blog-reset'>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]} linkTarget='_blank'>
                                    {markdown}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-6 mt-8 sm:mt-0 block lg:hidden'>
                        <div className='mx-auto max-w-xl lg:mt-8 lg:mx-0 lg:max-w-2xl'>
                            {preview && <img src={image} alt='NIST Standard detailed view' />}
                            {!preview && <GatsbyImage alt='' image={image} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSection;
