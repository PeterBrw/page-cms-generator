import React from 'react';
import Hero from './Hero';
import RightSection from './RightSection';

const MarkdownPage = ({ data }) => {
    const sections = data.sections.reduce(
        // eslint-disable-next-line
        (acc, curr) => ((acc[curr] = true), acc),
        {}
    );

    console.log(data);

    const { title, seoTitle } = data;

    return (
        <div>
            {/*<h1>title {title}</h1>*/}
            {/*<p>seo titlu {seoTitle}</p>*/}
            {/*{sections['a'] && <div>a</div>}*/}
            {/*{sections['b'] && <div>b</div>}*/}
            {/*{sections['c'] && <div>c</div>}*/}
            {/*{sections['d'] && <div>d</div>}*/}
            {/*{sections['e'] && <div>e</div>}*/}
            {/*{sections['f'] && <div>f</div>}*/}
            {/*/!*{data.featuredimage.publicURL && <img src={data.featuredimage.publicURL} alt='' />}*!/*/}
            <Hero
                heroBackground={data.hero.herobackground}
                heroImage={data.hero.heroimage}
                heroTitle={data.hero.herotitle}
                heroFirstParagraph={data.hero.herofirstparagraph}
                heroSecondParagraph={data.hero.herosecondparagraph}
            />
            <RightSection
                subtitle={data.firstsection.rightsectionsubtitle}
                firstParagraph={data.firstsection.rightsectionfirstparagraph}
                secondParagraph={data.firstsection.rightsecondparagraph}
                image={data.firstsection.rightsectionimage}
            />
        </div>
    );
};

export default MarkdownPage;
