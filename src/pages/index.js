import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { ProductsList} from "../components/dashboard/products-list";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { AppContext } from "src/context/AppContext";
import { getSales } from "../utils/api/sales";
import { getClients } from "../utils/api/clients";
import { getProducts } from "../utils/api/products";
import { ClientsList } from "../components/dashboard/clients-list";

const Dashboard = () => {
  const { token, globalSales, setGlobalSales } = useContext(AppContext);
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
    setPageSales(newPage)
    const newUrl = newPage > pageSales ? sales.next : sales.previous;
    const { data, request } = await getSales(token, newUrl);
    setSales(data);
  }

  const handlePageChangeProducts = async (event, newPage) => {
    const newUrl = newPage > pageProducts ? products.next : products.previous;
    setPageProducts(newPage)
    const { data, request } = await getProducts(token, newUrl);
    setProducts(data);
  }

  const handlePageChangeClients = async (event, newPage) => {
    setPageClients(newPage)
    const newUrl = newPage > pageClients ? clients.next : clients.previous;
    const { data, request } = await getSales(token, newUrl);
    setClients(data);
  }




  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress />
            </Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              {sales && <LatestOrders orders={sales} 
              handlePageChange={handlePageChangeSales} 
              page={pageSales}

              />}
            </Grid>

            <Grid item lg={12} md={12} xl={9} xs={12}>
              {products && <ProductsList products={products} 
              handlePageChange={handlePageChangeProducts} 
              page={pageProducts}

              />}
            </Grid>

            <Grid item lg={12} md={12} xl={9} xs={12}>
              {clients && <ClientsList clients={clients} 
              handlePageChange={handlePageChangeClients} 
              page={pageClients}

              />}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
