import React from 'react';
import GradientButton from '../buttons/GradientButton';
import LightDarkButton from '../buttons/LightDarkButton';
import { Container, Row } from '../atoms/Containers';
import { css } from 'twin.macro';

const heroBg = (url) => css`
    background-image: linear-gradient(#eeeeee, #e4edfc);
    @media screen and (min-width: 1024px) {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 35%;
        background-image: url(${url});
    }
`;

const Hero = ({ heroImage, heroBackground, heroTitle, heroFirstParagraph, heroSecondParagraph }) => {
    console.log({ heroFirstParagraph, heroSecondParagraph });
    return (
        <div className='pt-8' css={heroBg(heroBackground)}>
            <Container>
                <div className='py-16 md:py-24 lg:pt-24 lg:pb-16'>
                    <Row>
                        <div className='col-span-12 lg:col-span-6 order-last lg:order-first'>
                            <div className='lg:mt-16 pt-4 max-w-xl mx-auto lg:mx-0'>
                                <h1 className='text-left text-blue text-4xl lg:text-5xl leading-normal lg:leading-normal mb-16 font-montserrat'>
                                    {heroTitle}
                                </h1>
                                <p className='text-left text-base lg:text-lg mb-8 leading-relaxed text-gray'>
                                    {heroFirstParagraph}
                                </p>
                                <p className='text-left text-base lg:text-lg mb-2 leading-relaxed text-gray'>
                                    {heroSecondParagraph}
                                </p>
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
                                <img src={heroImage} alt='Inventory graph-view with violated standards and policies' />
                            </div>
                        </div>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Hero;
