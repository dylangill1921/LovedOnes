import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main style={{ paddingTop: '60px' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout; 