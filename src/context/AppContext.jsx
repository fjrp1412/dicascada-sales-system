import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [value, setValue] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [globalSales, setGlobalSales] = useState([]);
  const [userSales, setUserSales] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setValue({
      token,
      setToken,
      isAdmin,
      setIsAdmin,
      globalSales,
      setGlobalSales,
      userSales,
      setUserSales,
    });
  }, [token, isAdmin, globalSales, userSales]);


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
