import React from 'react';
import Header from '../Common/Header';
import Sidebar from '../Admin/Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div>{children}</div>
    </>
  );
};

export default Layout;