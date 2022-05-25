import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [value, setValue] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [sales, setSales] = useState(null);
  const [userSales, setUserSales] = useState(null);
  const [products, setProducts] = useState(null);
  const [clients, setClients] = useState(null);
  const [loguedUser, setLoguedUser] = useState(null);
  const [salesmans, setSalesmans] = useState(null);
  const [salesCount, setSalesCount] = useState(null);


  useEffect(() => {
    setValue({
      token,
      setToken,
      isAdmin,
      setIsAdmin,
      sales,
      setSales,
      userSales,
      setUserSales,
      products,
      setProducts,
      clients,
      setClients,
      loguedUser,
      setLoguedUser,
      salesmans,
      setSalesmans,
      salesCount,
      setSalesCount,
    });
  }, [token, isAdmin, sales, userSales, products, clients, loguedUser, salesmans, salesCount]);


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
