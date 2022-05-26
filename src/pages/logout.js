import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/router";

const Logout = () => {
  const {
    setToken,
    setIsAdmin,
    setSales,
    setUserSales,
    setProducts,
    setClients,
    setLoguedUser,
    setSalesmans,
    setSalesCount,
  } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    setToken("");
    setIsAdmin(false);
    setSales(null);
    setUserSales(null);
    setProducts(null);
    setClients(null);
    setLoguedUser(null);
    setSalesmans(null);
    setSalesCount(null);
    router.push("/login");
  }, []);

  return <></>;
};

export default Logout;
