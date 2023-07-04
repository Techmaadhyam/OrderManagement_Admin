import React, { createContext, useState } from "react";

export const LogoContext = createContext();

export const LogoProvider = ({ children }) => {
  const [logo, setLogo] = useState("");

  return (
    <LogoContext.Provider value={{ logo, setLogo }}>
      {children}
    </LogoContext.Provider>
  );
};
