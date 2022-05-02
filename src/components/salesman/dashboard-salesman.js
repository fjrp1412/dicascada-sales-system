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

const DashboardSalesman = ({token, sales, pageSales, product, pageProducts, pageClients, clients}) => {
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
              {sales && (
                <LatestOrders
                  orders={sales}
                  handlePageChange={handlePageChangeSales}
                  page={pageSales}
                />
              )}
            </Grid>

            <Grid item lg={12} md={12} xl={9} xs={12}>
              {products && (
                <ProductsList
                  products={products}
                  handlePageChange={handlePageChangeProducts}
                  page={pageProducts}
                />
              )}
            </Grid>

            <Grid item lg={12} md={12} xl={9} xs={12}>
              {clients && (
                <ClientsList
                  clients={clients}
                  handlePageChange={handlePageChangeClients}
                  page={pageClients}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export { DashboardSalesman };
