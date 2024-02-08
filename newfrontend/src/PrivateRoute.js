// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "./contexts/AuthContexts";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the component if user is authenticated and has required roles
  return <Component />;
};

export default PrivateRoute;
