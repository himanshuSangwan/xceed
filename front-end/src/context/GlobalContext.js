import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isAuthentiCated, setIsAuthentiCated] = useState(localStorage.getItem("token") ? true : false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <GlobalContext.Provider
      value={{
        auth: [isAuthentiCated, setIsAuthentiCated],
        user: [user, setUser],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;
