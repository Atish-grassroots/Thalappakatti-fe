import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({checkstatus: '0'});
  //  console.log("AuthProvider " ,auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token::",token)
    // console.log("useEffect AuthProvider " ,auth);
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log('token decodedToken ::: ', decodedToken)
      setAuth({
        isAuthenticated: true,
        role: decodedToken.userId.Role === '1' ? 'Admin' : 
        decodedToken.userId.Role === '2' ? 'Agent' : 
        decodedToken.userId.Role === '3' ? 'SuperAdmin' : 'User',
        userDetails: decodedToken.userId,
        email: decodedToken.userId.Email,
        checkstatus: '1',
      });
    } else {
      setAuth({
        isAuthenticated: false,
        role: '',
        userDetails: '',
        email: '',
        checkstatus: '0',
      });
    }
  }, []);

  const handleSetAuth = (newAuth) => {
    // setAuth(newAuth);
    if (!newAuth.isAuthenticated) {
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: handleSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
