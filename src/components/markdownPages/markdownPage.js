import React from 'react';
import Hero from './Hero';
import RightSection from './RightSection';
import LeftSection from './LeftSection';
import Cta from './Cta';
import CloudComplianceSection from './CloudComplianceSection';

const MarkdownPage = ({ data }) => {
    return (
        <div>
            {data?.sections?.map((item) => {
                if (item === 'hero') {
                    return (
                        <Hero
                            heroBackground={data.hero.herobackground}
                            heroImage={data.hero.heroimage.childImageSharp.gatsbyImageData}
                            markdown={data.hero.heromarkdown}
                            key={data.hero.heromarkdown}
                        />
                    );
                }
                if (item === 'sectionList') {
                    return data?.sectionList?.map((section, index) => {
                        if (section?.imagePosition === 'left') {
                            return (
                                <LeftSection
                                    key={index}
                                    subtitle={section.listSectionSubtitle}
                                    image={section.listSectionImage.childImageSharp.gatsbyImageData}
                                    markdown={section.listSectionMarkdown}
                                    backgroundColor={section.listSectionBackground}
                                />
                            );
                        }
                        if (section?.imagePosition === 'right') {
                            return (
                                <RightSection
                                    key={index}
                                    subtitle={section.listSectionSubtitle}
                                    image={section.listSectionImage.childImageSharp.gatsbyImageData}
                                    markdown={section.listSectionMarkdown}
                                    backgroundColor={section.listSectionBackground}
                                />
                            );
                        }
                        return null;
                    });
                }
                if (item === 'cloudComplianceSection') {
                    return <CloudComplianceSection />;
                }
                if (item === 'cta') {
                    return <Cta markdown={data?.cta?.ctaMarkdown} />;
                }
                return null;
            })}
        </div>
    );
};

export default MarkdownPage;
