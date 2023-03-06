import CMS from 'netlify-cms-app';
import React from 'react';
import '../styles/global.css';
import JsonPage from '../components/jsonPages/jsonPage';
import Hero from '../components/markdownPages/Hero';
import CSSInjector from './CSSInjector';
import RightSection from '../components/markdownPages/RightSection';
import LeftSection from '../components/markdownPages/LeftSection';

const updateArr = (arr, index, component) => {
    console.log('arr: ', index);
    if (index === 0) {
        arr[0] = component;
        return [...arr];
    }
    if (index === 1) {
        arr[1] = component;
        return [...arr];
    }
    if (index === 2) {
        arr[2] = component;
        return [...arr];
    }
};

const PagesPreview = ({ entry }) => {
    const sectionList = entry.getIn(['data', 'sectionList'])?.toJS();
    let sectionsToDisplay = [];

    entry
        .getIn(['data', 'sections'])
        ?.toJS()
        .forEach((item, index, array) => {
            if (item === 'hero') {
                sectionsToDisplay = updateArr(
                    sectionsToDisplay,
                    index,
                    <Hero
                        heroBackground={entry.getIn(['data', 'hero'])?.toJS()?.herobackground}
                        heroImage={entry.getIn(['data', 'hero'])?.toJS()?.heroimage}
                        markdown={entry.getIn(['data', 'hero'])?.toJS()?.heromarkdown}
                        preview={true}
                    />
                );
            }
            if (item === 'sectionList') {
                sectionList?.map((section, index) => {
                    if (section?.imagePosition === 'left') {
                        sectionsToDisplay = updateArr(
                            sectionsToDisplay,
                            index,
                            <LeftSection
                                key={index}
                                subtitle={section.listSectionSubtitle}
                                image={section.listSectionImage}
                                markdown={section.listSectionMarkdown}
                                preview={true}
                            />
                        );
                    }
                    if (section?.imagePosition === 'right') {
                        sectionsToDisplay = updateArr(
                            sectionsToDisplay,
                            index,
                            <RightSection
                                key={index}
                                subtitle={section.listSectionSubtitle}
                                image={section.listSectionImage}
                                markdown={section.listSectionMarkdown}
                                preview={true}
                            />
                        );
                    }
                    return null;
                });
            }
        });

    return <CSSInjector>{sectionsToDisplay}</CSSInjector>;
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
        }" style="width:${width / 16 || 'auto'}${width >= 1 ? 'rem' : ''};height:${height / 16 || 'auto'}${
            height >= 1 ? 'rem' : ''
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

CMS.registerEditorComponent({
    label: 'H1 Hero',
    id: 'headingOneHero',
    fromBlock: (match) =>
        match && {
            classes: match[1],
            texth1: match[2]
        },
    toBlock: function ({ classes, texth1 }, getAsset, fields) {
        return `<h1 class="text-left text-blue text-4xl lg:text-5xl leading-normal lg:leading-normal mb-16 font-montserrat ${
            classes || ''
        }">${texth1 || ''}</h1>`;
    },
    toPreview: ({ classes, texth1 }, getAsset, fields) => {
        return `<h1 class="text-left text-blue text-4xl lg:text-5xl leading-normal lg:leading-normal mb-16 font-montserrat ${classes}">${texth1}</h1>`;
    },
    pattern:
        /^<h1 class="text-left text-blue text-4xl lg:text-5xl leading-normal lg:leading-normal mb-16 font-montserrat (.*?)">(.*?)<\/h1>$/s,
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

CMS.registerEditorComponent({
    label: 'P',
    id: 'paragraph',
    fromBlock: (match) =>
        match && {
            classes: match[1],
            textp: match[2]
        },
    toBlock: function ({ classes, textp }, getAsset, fields) {
        return `<p class="text-base ${classes || ''}">${textp || ''}</p>`;
    },
    toPreview: ({ classes, textp }, getAsset, fields) => {
        return `<p class="text-base ${classes}">${textp}</p>`;
    },
    pattern: /^<p class="text-base (.*?)">(.*?)<\/p>$/s,
    fields: [
        {
            label: 'CSS Classes',
            name: 'classes',
            widget: 'select',
            multiple: true,
            default: [' blog-image-shadow '],
            options: [
                ' text-left ',
                ' text-base ',
                ' lg:text-lg ',
                ' leading-relaxed ',
                ' leading-normal ',
                ' font-montserrat ',
                ' mt-8 ',
                ' mt-4 ',
                ' text-gray ',
                ' font-semibold ',
                ' mb-8 ',
                ' mb-2 '
            ]
        },
        {
            label: 'Text p',
            name: 'textp',
            widget: 'string'
        }
    ]
});

CMS.registerEditorComponent({
    label: 'H2 Subtitle',
    id: 'headingTwoSubtitle',
    fromBlock: (match) =>
        match && {
            classes: match[1],
            texth1: match[2]
        },
    toBlock: function ({ classes, texth1 }, getAsset, fields) {
        return `<h2 class="titleSection font-bold text-primary leading-normal border-title-partly font-montserrat lg:mt-3 ${
            classes || ''
        }">${texth1 || ''}</h2>`;
    },
    toPreview: ({ classes, texth1 }, getAsset, fields) => {
        return `<h2 class="titleSection font-bold text-primary leading-normal border-title-partly font-montserrat lg:mt-3 ${classes}">${texth1}</h2>`;
    },
    pattern:
        /^<h2 class="titleSection font-bold text-primary leading-normal border-title-partly font-montserrat lg:mt-3 (.*?)">(.*?)<\/h2>$/s,
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
