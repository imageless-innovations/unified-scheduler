// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user && user.role === 'admin' && <li><Link to="/admin">Admin Dashboard</Link></li>}
        {user ? (
          <li><Link to="/logout">Logout</Link></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
