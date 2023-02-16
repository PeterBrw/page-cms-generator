import React from 'react';
import GradientButton from '../buttons/GradientButton';
import LightDarkButton from '../buttons/LightDarkButton';
import { Container, Row } from '../atoms/Containers';
import { css } from 'twin.macro';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { GatsbyImage } from 'gatsby-plugin-image';

const heroBg = (url) => css`
    background-image: linear-gradient(#eeeeee, #e4edfc);
    @media screen and (min-width: 1024px) {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 35%;
        background-image: url(${url});
    }
`;

const Hero = ({ heroImage, heroBackground, markdown, preview }) => {
    return (
        <div className='pt-8' css={heroBg(heroBackground)}>
            <Container>
                <div className='py-16 md:py-24 lg:pt-24 lg:pb-16'>
                    <Row>
                        <div className='col-span-12 lg:col-span-6 order-last lg:order-first'>
                            <div className='lg:mt-16 pt-4 max-w-xl mx-auto lg:mx-0'>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]} linkTarget='_blank'>
                                    {markdown}
                                </ReactMarkdown>
                                <div className='flex mt-8 justify-start'>
                                    <a href='/'>
                                        <GradientButton text='Start Free Trial' />
                                    </a>
                                    <a href='/' className='ml-4'>
                                        <LightDarkButton text={'Request Demo'} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-12 lg:col-span-6'>
                            <div className='lg:mt-16 pt-4 max-w-lg lg:max-w-2xl mx-auto lg:mx-0'>
                                {preview && (
                                    <img
                                        src={heroImage}
                                        alt='Inventory graph-view with violated standards and policies'
                                    />
                                )}
                                {!preview && <GatsbyImage alt='wutever' image={heroImage} />}
                            </div>
                        </div>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Hero;
