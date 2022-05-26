import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { Box, Container, Grid, Select, MenuItem, Paper } from "@mui/material";
import { Budget } from "../dashboard/budget";
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

const DashboardSalesman = ({
  pageSales,
  pageProducts,
  pageClients,
  handlePageChangeSales,
  handlePageChangeProducts,
  handlePageChangeClients,
  user,
}) => {
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

  const [tableSelected, setTableSelected] = useState("sales");

  useEffect(() => {
    async function fetchData() {
      if (!sales) {
        const { data, request } = await getSales(token, null);
        if (request.ok) {
          setSales(data);
          setSalesCount(data.count);
        }
      }
      if (!products) {
        const { data, request } = await getProducts(token, null);
        if (request.ok) {
          setProducts(data);
        }
      }
      if (!clients) {
        const { data, request } = await getClients(token, null);
        if (request.ok) {
          setClients(data);
        }
      }
    }
    fetchData();
  }, [token]);

  const handleChangeTable = (event) => {
    setTableSelected(event.target.value);
  };

  return (
    <>
      <DashboardLayout>
        <Head>
          <title>Dashboard Salesman| Material Kit</title>
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
                <Budget purchases={120} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TotalCustomers biggestSale={"0003200"} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TasksProgress />
              </Grid>
              <Grid  item lg={12} md={12} xl={9} xs={12}>
                <Grid 
                item xl={3} lg={3} sm={6} xs={12}>
                  <Select 
                  sx={{border: '1px solid #ced4da', marginBottom: 1}}
                  value={tableSelected} onChange={handleChangeTable}>
                    <MenuItem value={"sales"}>Ventas</MenuItem>
                    <MenuItem value={"products"}>Productos</MenuItem>
                    <MenuItem value={"clients"}>Clientes</MenuItem>
                  </Select>
                </Grid>

                {sales && tableSelected === "sales" && (
                  <LatestOrders
                    sales={sales}
                    handlePageChange={handlePageChangeSales}
                    page={pageSales}
                  />
                )}

                {products && tableSelected === "products" && (
                  <ProductsList
                    products={products}
                    handlePageChange={handlePageChangeProducts}
                    page={pageProducts}
                  />
                )}

                {clients && tableSelected === "clients" && (
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
      </DashboardLayout>
    </>
  );
};

export { DashboardSalesman };
