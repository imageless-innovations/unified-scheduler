// Layout.js
import React, { useEffect } from 'react';
// import Navbar from './Navbar';
import './Layout.css'; // Import the CSS file for styling
import SideNav from './Sidenav'
import {useAuth} from '../contexts/AuthContexts'
import AlertComp from '../components/Alerts/Alert'
import Stack from '@mui/material/Stack';
import { useAlert } from '../contexts/AlertsContext';
const Layout = ({ children }) => {
const { user ,logout} = useAuth();
const {alerts,addAlert,removeAlert}=useAlert()
  return (
    <div>
        {user!==null?
    <div className="layout-container">
      {/* <Navbar /> */}
      <SideNav />
      <div className="main-container">
        <header className="header" >
        <div className="flex justify-between">
        <h1>Header Section</h1>
        <button style={{ backgroundColor: 'var(--button-color)' }} 
        onClick={logout}
        className='p-1 rounded'
        >
        logout
        </button>
          </div>
          <div className='absolute right-0 m-2 z-10'>
          <Stack sx={{ width: '100%' }} spacing={2}>
          {alerts.map((al)=>{
          return <AlertComp key={al.id} id={al.id} title={al.title} msg={al.msg} removeAlert={removeAlert}/>
        })}
        </Stack> 
        </div>
        </header>
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
