import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../dashboard/budget";
import { MonthSales } from "./month-sales";
import { LatestOrders } from "../dashboard/latest-orders";
import { LatestProducts } from "../dashboard/latest-products";
import { Sales } from "../dashboard/sales";
import { TasksProgress } from "../dashboard/tasks-progress";
import { TotalCustomers } from "../dashboard/total-customers";
import { ProductsList } from "../dashboard/products-list";
import { TotalProfit } from "../dashboard/total-profit";
import { TrafficByDevice } from "../dashboard/traffic-by-device";
import { DashboardLayout } from "../dashboard-layout";
import { AppContext } from "../../context/AppContext";
import { getSales } from "../../utils/api/sales";
import { getClients } from "../../utils/api/clients";
import { getProducts } from "../../utils/api/products";
import { ClientsList } from "../dashboard/clients-list";
import { ComparativePercentagePanel } from "./comparative-percentage-panel";
import { MonthSalesChart } from "./month-sales-chart";
import { MonthCategoriesChart } from "./month-categories-chart";

const DashboardAdmin = () => {
  const { token, globalSales, setGlobalSales } = useContext(AppContext);
  const [sales, setSales] = useState(null);
  const [pageSales, setPageSales] = useState(0);
  const [products, setProducts] = useState(null);
  const [pageProducts, setPageProducts] = useState(0);
  const [pageClients, setPageClients] = useState(0);
  const [clients, setClients] = useState(null);

  return (
    <>
      <Head>
        <title>Dashboard Admin| Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <DashboardLayout>
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <MonthSales />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TotalCustomers biggestSale={"0001300"}/>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TasksProgress />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <ComparativePercentagePanel />
              </Grid>

              <MonthSalesChart />

              <MonthCategoriesChart />
            </Grid>
          </Container>
        </DashboardLayout>
      </Box>
    </>
  );
};

export { DashboardAdmin };
