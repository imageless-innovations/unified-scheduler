// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useAuth } from "./contexts/AuthContexts";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Set loading to false when user information is available
  }, [user]);

  if (loading) {
    // Render loading state or spinner while waiting for user information
    return <div>Loading...</div>;
  }
  if (user === undefined || user === null) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the component if user is authenticated and has required roles
  return <Component />;
};

export default PrivateRoute;
