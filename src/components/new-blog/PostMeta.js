import React from 'react';
import Categories from './Categories';

export default function PostMeta({ categories, date }) {
    return (
        <div className='flex justify-between items-start'>
            <span>
                <Categories categories={categories} />
            </span>
        </div>
    );
}
