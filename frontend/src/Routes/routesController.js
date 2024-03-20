// renderRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  PrivateRoute from '../PrivateRoute'
const renderRoutes = (myroutes,user,handleAuthentication,type="common",allowedRoles) => (
  <Routes>
    {myroutes.map((myroute) => (
      <Route
        key={myroute.path}
        path={myroute.path}
      >
        <Route
            path={myroute.path}
            index
            element= {
            type==="common" &&
            <PrivateRoute  component={myroute.component} />

            }
        />
        {myroute.subRoutes?.map((subroute)=>{
            return <Route
            key={subroute.path}
            path={subroute.path}
            element={<PrivateRoute  component={subroute.component} />}
            />
        })}
        </Route>
    ))}
  </Routes>
);

export default renderRoutes;