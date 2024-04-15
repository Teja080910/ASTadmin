// SessionProvider.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const savedSession = Cookies.get('session');
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
  }, []);

  const handleLogin = (user) => {
    setSession(user);
    Cookies.set('session', JSON.stringify(user), { expires: 7 }); // Set cookie expiration, e.g., 7 days
  };

  const handleLogout = () => {
    setSession(null);
    Cookies.remove('session');
  };

  return (
    <SessionContext.Provider value={{ session, handleLogin, handleLogout }}>
      {children}
    </SessionContext.Provider>
  );
};
