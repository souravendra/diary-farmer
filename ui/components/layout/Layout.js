import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

library.add(fas);

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='flex flex-col dashboard-container'>
      <Header handleMenu={handleMenu} menuOpen={menuOpen} />

      <div className='flex pl-2'>
        <Sidebar
          menuOpen={menuOpen}
          handleMenu={handleMenu}
          currentRoute={router.pathname}
        />
        <div className='layout bg-athens-gray w-full min-h-95 rounded-t-md lg:rounded-tl-md p-2 relative mt-10 lg:ml-48'>
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
