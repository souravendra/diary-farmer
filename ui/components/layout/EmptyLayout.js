import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return <div className='page-content'>{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
