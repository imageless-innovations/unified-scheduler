// Layout.js
import React from 'react';
// import Navbar from './Navbar';
import './Layout.css'; // Import the CSS file for styling
import SideNav from './Sidenav'
import {useAuth} from '../contexts/AuthContexts'
const Layout = ({ children }) => {
const { user } = useAuth();
console.log(user)
  return (
    <div>
        {user!==null?
    <div className="layout-container">
      {/* <Navbar /> */}
      <SideNav />
      <div className="main-container">
        <header className="header">Header Section</header>
        <main className="main-content">{children}</main>
        <footer className="footer">Footer Section</footer>
      </div>
    </div>
    :
    <div>
{children}
    </div>}
    </div>

  );
};

export default Layout;
