// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import renderRoutes from './Routes/routesController';
import { commonRoutes,allowedRoutes } from './Routes/routerConfig';
import Login from './pages/Auth/Login'
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './Layouts/Layout'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useAuth } from './contexts/AuthContexts'
import { AlertProvider } from './contexts/AlertsContext';
const App = () => {
  const { user } = useAuth(); // Use the useAuth hook to get user information
  return (
    <AlertProvider>
    <Router>
      <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        
      </Routes>
      {renderRoutes(commonRoutes)}
      </Layout>
    </Router>
    </AlertProvider>
  );
};


export default App;
