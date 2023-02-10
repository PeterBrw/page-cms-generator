import CMS from 'netlify-cms-app';
import React from 'react';
import '../styles/global.css';
import JsonPage from '../components/jsonPages/jsonPage';
import Hero from '../components/markdownPages/Hero';
import CSSInjector from './CSSInjector';

const PagesPreview = ({ entry, getAsset }) => {
    const heroImage = getAsset(entry.getIn(['data', 'heroimage'])).path.replace('static', '');
    const heroBackground = getAsset(entry.getIn(['data', 'herobackground'])).path.replace('static', '');

    return (
        <CSSInjector>
            <Hero
                heroBackground={heroBackground}
                heroImage={heroImage}
                heroTitle={entry.getIn(['data', 'herotitle'])}
                heroFirstParagraph={entry.getIn(['data', 'herofirstparagraph'])}
                heroSecondParagraph={entry.getIn(['data', 'herosecondparagraph'])}
            />
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
