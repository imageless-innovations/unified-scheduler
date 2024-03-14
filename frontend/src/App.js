// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './Layouts/Layout';
import RoomReserve from './pages/Rooms/Rooms';
import RoomAdd from './pages/Rooms/AddRoom';
import Resources from './pages/Resources/Resources';
import ResourcePolicy from './pages/Resources/Policy/ResourcePolicy';
import CreatePolicy from './pages/Resources/Policy/Create';
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
        <Route
          path="/*"
          element={
             <PrivateRoute component={Home} />
          }
        />
        <Route path="/resources/*"  >
          <Route index element={<PrivateRoute component={Resources} />} />
          <Route path="policy" element={<PrivateRoute component={ResourcePolicy} />} />
          <Route path="policy/create" element={<PrivateRoute component={CreatePolicy} />} />
        </Route>
        <Route path="/rooms/*" element={<PrivateRoute component={RoomReserve} />} />
          <Route path='/rooms/add' element={<PrivateRoute component={RoomAdd} />}/>
        <Route path="/admin"  element={<PrivateRoute component={AdminDashboard} />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      </Layout>
    </Router>
    </AlertProvider>
  );
};


export default App;
