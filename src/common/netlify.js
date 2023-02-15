import CMS from 'netlify-cms-app';
import React from 'react';
import '../styles/global.css';
import JsonPage from '../components/jsonPages/jsonPage';
import Hero from '../components/markdownPages/Hero';
import CSSInjector from './CSSInjector';
import RightSection from '../components/markdownPages/RightSection';
import LeftSection from '../components/markdownPages/LeftSection';

const PagesPreview = ({ entry }) => {
    const sections = entry
        .getIn(['data', 'sections'])
        ?.toJS()
        .reduce(
            // eslint-disable-next-line
            (acc, curr) => ((acc[curr] = true), acc),
            {}
        );

    console.log(sections);

    return (
        <CSSInjector>
            {sections['hero'] && (
                <Hero
                    heroBackground={entry.getIn(['data', 'hero'])?.toJS()?.herobackground}
                    heroImage={entry.getIn(['data', 'hero'])?.toJS()?.heroimage}
                    heroTitle={entry.getIn(['data', 'hero'])?.toJS()?.herotitle}
                    heroFirstParagraph={entry.getIn(['data', 'hero'])?.toJS()?.herofirstparagraph}
                    heroSecondParagraph={entry.getIn(['data', 'hero'])?.toJS()?.herosecondparagraph}
                />
            )}
            {sections['rightsection'] && (
                <RightSection
                    subtitle={entry.getIn(['data', 'firstsection'])?.toJS()?.rightsectionsubtitle}
                    firstParagraph={entry.getIn(['data', 'firstsection'])?.toJS()?.rightsectionfirstparagraph}
                    secondParagraph={entry.getIn(['data', 'firstsection'])?.toJS()?.rightsecondparagraph}
                    image={entry.getIn(['data', 'firstsection'])?.toJS()?.rightsectionimage}
                    markdown={entry.getIn(['data', 'firstsection'])?.toJS()?.rightmarkdown}
                />
            )}
            {sections['leftsection'] && (
                <LeftSection
                    image={entry.getIn(['data', 'leftsection'])?.toJS()?.leftsectionimage}
                    subtitle={entry.getIn(['data', 'leftsection'])?.toJS()?.leftsectionsubtitle}
                    firstParagraph={entry.getIn(['data', 'leftsection'])?.toJS()?.leftsectionfirstparagraph}
                    secondParagraph={entry.getIn(['data', 'leftsection'])?.toJS()?.leftsecondparagraph}
                    markdown={entry.getIn(['data', 'leftsection'])?.toJS()?.leftmarkdown}
                />
            )}
        </CSSInjector>
    );
};

CMS.registerPreviewTemplate('pages', PagesPreview);

const NavigationsPreview = ({ entry }) => {
    console.log(entry.getIn(['data', 'title']));
    console.log(entry.getIn(['data', 'seoTitle']));
    console.log(entry.getIn(['data', 'sections']).toArray());
    console.log('cucu');
    return (
        <JsonPage
            data={{
                title: entry.getIn(['data', 'title']),
                seoTitle: entry.getIn(['data', 'seoTitle']),
                sections: entry.getIn(['data', 'sections']).toArray()
            }}
        />
    );
};

CMS.registerPreviewTemplate('navigations', NavigationsPreview);

CMS.registerEditorComponent({
    label: 'Image',
    id: 'image',
    fromBlock: (match) =>
        match && {
            image: match[1],
            alt: match[2],
            title: match[3],
            classes: match[4],
            width: match[5],
            height: match[6]
        },
    toBlock: function ({ image, alt, title, classes, width, height }, getAsset, fields) {
        return `<img src="${image || ''}" alt="${alt || ''}" title="${title || ''}" class="${
            classes || ''
        }" style="width:${width / 16 || 'auto'}${width ? 'rem' : ''};height:${height / 16 || 'auto'}${
            height ? 'rem' : ''
        };"/>`;
    },
    toPreview: ({ image, alt, title, classes, width, height }, getAsset, fields) => {
        return `<img src="${image}" alt="${alt}" title="${title}" class="${classes}" style="width:${width};height:${height};"/>`;
    },
    pattern: /^<img src="(.*?)" alt="(.*?)" title="(.*?)" class="(.*?)" style="width:(.*?);height:(.*?);"\/>$/s,
    fields: [
        {
            label: 'Picture',
            name: 'image',
            widget: 'image',
            media_library: {
                allow_multiple: true
            }
        },
        {
            label: 'Alt Text',
            name: 'alt'
        },
        {
            label: 'CSS Classes',
            name: 'classes',
            widget: 'select',
            multiple: true,
            default: [' blog-image-shadow '],
            options: [
                ' blog-image-shadow ',
                ' rounded-sm ',
                ' rounded ',
                ' rounded-md ',
                ' rounded-lg ',
                ' rounded-2xl ',
                ' rounded-3xl ',
                ' rounded-full ',
                ' shadow-lg ',
                ' shadow-xl ',
                ' shadow-2xl '
            ]
        },
        {
            label: 'Title',
            name: 'title'
        },
        {
            label: 'Width (px)',
            name: 'width',
            widget: 'number',
            value_type: 'int',
            min: 1
        },
        {
            label: 'Height (px)',
            name: 'height',
            widget: 'number',
            value_type: 'int',
            min: 1
        }
    ]
});

CMS.registerEditorComponent({
    label: 'H1',
    id: 'headingOne',
    fromBlock: (match) =>
        match && {
            classes: match[1],
            texth1: match[2]
        },
    toBlock: function ({ classes, texth1 }, getAsset, fields) {
        return `<h1 class="${classes || ''}">${texth1 || ''}</h1>`;
    },
    toPreview: ({ classes, texth1 }, getAsset, fields) => {
        return `<h1 class="${classes}">${texth1}</h1>`;
    },
    pattern: /^<h1 class="(.*?)">(.*?)<\/h1>$/s,
    fields: [
        {
            label: 'CSS Classes',
            name: 'classes',
            widget: 'select',
            multiple: true,
            default: [' blog-image-shadow '],
            options: [' text-blue ', ' text-red ', ' text-xl ', ' text-2xl ', ' text-3xl ', ' text-4xl ', ' text-5xl ']
        },
        {
            label: 'Text H1',
            name: 'texth1',
            widget: 'string'
        }
    ]
});