import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { AppContext } from "src/context/AppContext";
import { getSales } from "../utils/api/sales";

const Dashboard = () => {
  const { token, globalSales, setGlobalSales } = useContext(AppContext);
  const [sales, setSales] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(async () => {
    const { data, request } = await getSales(token, null);
    if (request.ok) {
      setSales(data);
    }
  }, [token]);

  const handlePageChange = async (event, newPage) => {
    setPage(newPage)
    ref.current.scrollIntoView();
    const { data, request } = await getSales(token, sales.next);
    setSales(data);
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
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              {sales && <LatestOrders orders={sales} 
              handlePageChange={handlePageChange} 
              page={page}

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
