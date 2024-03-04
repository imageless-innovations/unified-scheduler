import { createContext, useContext, useState, useEffect } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
const [alerts, setAlerts] = useState([]);
// {id:"1234",title:'success',msg:'This is a success message'},
// {id:"12345",title:'error',msg:'This is an error message'},
// {id:"456",title:'warning',msg:'This is a warning message'}

const addAlert = (alert) => {
    setAlerts((prev) => [...prev, alert]);
  };
  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};

