import React, { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext({ userData: null, setUserData: () => { } });


export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  // console.log(userData);
  useEffect(() => {
    //console.log(userData);
  }, [userData]);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};