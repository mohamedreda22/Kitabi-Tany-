import React from 'react';
import NewNavbar from './NewNavbar';
import NewFooter from './NewFooter';

const Layout = ({ children }) => {
    return (
        <div className="bg-surface min-h-screen flex flex-col font-manrope">
            <NewNavbar />
            <main className="flex-grow pt-32 pb-20">
                {children}
            </main>
            <NewFooter />
        </div>
    );
};

export default Layout;
