import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { ProductsList } from "../components/dashboard/products-list";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { AppContext } from "src/context/AppContext";
import { getSales } from "../utils/api/sales";
import { getClients } from "../utils/api/clients";
import { getProducts } from "../utils/api/products";
import { ClientsList } from "../components/dashboard/clients-list";
import { DashboardAdmin } from "../components/admin/dashboard-admin";
import { DashboardSalesman } from "../components/salesman/dashboard-salesman";

const Dashboard = () => {
  const { token, isAdmin } = useContext(AppContext);
  const [sales, setSales] = useState(null);
  const [pageSales, setPageSales] = useState(0);
  const [products, setProducts] = useState(null);
  const [pageProducts, setPageProducts] = useState(0);
  const [pageClients, setPageClients] = useState(0);
  const [clients, setClients] = useState(null);

  useEffect(async () => {
    const { data, request } = await getSales(token, null);
    if (request.ok) {
      setSales(data);
    }
  }, [token]);

  useEffect(async () => {
    const { data, request } = await getProducts(token, null);
    if (request.ok) {
      setProducts(data);
    }
  }, [token]);

  useEffect(async () => {
    const { data, request } = await getClients(token, null);
    if (request.ok) {
      setClients(data);
    }
  }, [token]);

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

  return <>
  {(isAdmin && <DashboardAdmin />) || (sales && products && clients && <DashboardSalesman 
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
  />)
  }
  </>;
};

export default Dashboard;
