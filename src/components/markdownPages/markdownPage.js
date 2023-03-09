import React from 'react';
import Hero from './Hero';
import RightSection from './RightSection';
import LeftSection from './LeftSection';
import Cta from './Cta';
import CloudComplianceSection from './CloudComplianceSection';
import AlignEntities from './AlignTeams';
import Featrures from "./Featrures";

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
                if (item === 'textImageRow') {
                    return data?.textImageRow?.map((section, index) => {
                        if (section?.rowImagePosition === 'left') {
                            return (
                                <LeftSection
                                    key={index}
                                    subtitle={section.rowSubtitle}
                                    image={section.rowImage.childImageSharp.gatsbyImageData}
                                    markdown={section.rowMarkdown}
                                    backgroundColor={section.rowBackground}
                                />
                            );
                        }
                        if (section?.rowImagePosition === 'right') {
                            return (
                                <RightSection
                                    key={index}
                                    subtitle={section.rowSubtitle}
                                    image={section.rowImage.childImageSharp.gatsbyImageData}
                                    markdown={section.rowMarkdown}
                                    backgroundColor={section.rowBackground}
                                />
                            );
                        }
                        return null;
                    });
                }
                if (item === 'alignTeamsSection') {
                    return <AlignEntities />;
                }
                if(item === 'featuresSection') {
                    return <Featrures features={data?.featuresSection}/>
                }
                if (item === 'cloudComplianceSection') {
                    return <CloudComplianceSection />;
                }
                if (item === 'ctaSection') {
                    return <Cta markdown={data?.ctaSection?.ctaMarkdown} />;
                }
                return null;
            })}
        </div>
    );
};

export default MarkdownPage;
