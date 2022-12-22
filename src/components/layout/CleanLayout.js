import React, { useState } from 'react';

import HeaderContext from './HeaderContext';
import GlobalContext from '../../context/GlobalContext';

const Layout = ({ children, title, description, pageName, location, banner }) => {
    const [sticker, setSticker] = useState(false);

    return (
        <GlobalContext.Provider value={{ location }}>
            <HeaderContext.Provider value={{ sticker, setSticker }}></HeaderContext.Provider>
            <main>{children}</main>
        </GlobalContext.Provider>
    );
};

export default Layout;
