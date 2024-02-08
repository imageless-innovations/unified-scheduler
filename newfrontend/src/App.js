// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContexts';
import PrivateRoute from './PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './Layouts/Layout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Calendar from './components/calendar';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
             <PrivateRoute component={Home} />
          }
        />
        <Route path="/admin"  element={<PrivateRoute component={AdminDashboard} />} />
        <Route path="/reserve" element={<Calendar />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      </Layout>
    </Router>
    </AuthProvider>
  );
};


export default App;
