import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "src/context/AppContext";
import { getSales, getAllSales } from "../utils/api/sales";
import { getClients } from "../utils/api/clients";
import { getProducts } from "../utils/api/products";
import { ClientsList } from "../components/dashboard/clients-list";
import { DashboardAdmin } from "../components/admin/dashboard-admin";
import { DashboardSalesman } from "../components/salesman/dashboard-salesman";

const Dashboard = () => {
  const {
    token,
    isAdmin,
    clients,
    setClients,
    products,
    setProducts,
    loguedUser,
    setLoguedUser,
    sales,
    setSales,
    salesCount,
    setSalesCount,
  } = useContext(AppContext);

  const [pageSales, setPageSales] = useState(0);
  const [pageProducts, setPageProducts] = useState(0);
  const [pageClients, setPageClients] = useState(0);
  const [allSales, setAllSales] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handlePageChangeSales = async (event, newPage) => {
    setPageSales(newPage);
    const newUrl = newPage > pageSales ? sales.next : sales.previous;
    const { data, request } = await getSales(token, newUrl);
    setSales(data);
  };

  const handlePageChangeProducts = async (event, newPage) => {
    const newUrl = newPage > pageProducts ? products.next : products.previous;
    setPageProducts(newPage);
    const { data, request } = await getProducts(token, newUrl);
    setProducts(data);
  };

  const handlePageChangeClients = async (event, newPage) => {
    setPageClients(newPage);
    const newUrl = newPage > pageClients ? clients.next : clients.previous;
    const { data, request } = await getSales(token, newUrl);
    setClients(data);
  };

  return (
    <>
      {(isAdmin && <DashboardAdmin />) ||
        ((!isAdmin && loguedUser) && (
          <DashboardSalesman
            token={token}
            sales={sales}
            pageSales={pageSales}
            products={products}
            pageProducts={pageProducts}
            pageClients={pageClients}
            clients={clients}
            handlePageChangeSales={handlePageChangeSales}
            handlePageChangeProducts={handlePageChangeProducts}
            handlePageChangeClients={handlePageChangeClients}
            user={loguedUser}
          />
        ))}
    </>
  );
};

export default Dashboard;
