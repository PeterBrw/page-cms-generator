import React from 'react';
import { find } from 'lodash';
export default function PostAuthor({ author, date, preview = false }) {
    const _author = find(data, ({ name }) => name === author) || author;

    if (preview) {
        return (
            <div>
                <span className='text-sm text-black  h-7 block py-1'>
                    By <strong>{typeof _author === 'string' ? _author : _author.name}</strong>
                    <br />
                    <span className='text-sm text-black text-opacity-70'>{formatDate(date)}</span>
                </span>
            </div>
        );
    }
    return (
        <div>
        123
        </div>
    );
}
