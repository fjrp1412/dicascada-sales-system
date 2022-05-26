import Head from "next/head";
import Skeleton from "@mui/material/Skeleton";
import { useState, useEffect, useContext } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Budget } from "../dashboard/budget";
import { MonthSales } from "./month-sales";
import { LatestOrders } from "../dashboard/latest-orders";
import { LatestProducts } from "../dashboard/latest-products";
import { Sales } from "../dashboard/sales";
import { TasksProgress } from "../dashboard/tasks-progress";
import { TotalCustomers } from "../dashboard/total-customers";
import { ProductsList } from "../dashboard/products-list";
import { TrafficByDevice } from "../dashboard/traffic-by-device";
import { DashboardLayout } from "../dashboard-layout";
import { AppContext } from "../../context/AppContext";
import { getSales, getSalesIA } from "../../utils/api/sales";
import { getClients } from "../../utils/api/clients";
import { getProducts } from "../../utils/api/products";
import { ClientsList } from "../dashboard/clients-list";
import { ComparativePercentagePanel } from "./comparative-percentage-panel";
import { MonthSalesChart } from "./month-sales-chart";
import { LineChartComponent } from "../charts/SalesLineChart";
import { StatisticPanel } from "../statistics/statistic_panel";

const DashboardAdmin = () => {
  const { token } = useContext(AppContext);
  const [filteredDateSales, setFilteredDateSales] = useState(null);
  const [page, setPage] = useState(0);
  const [monthSales, setMonthSales] = useState(null);
  const [predictedMonth, setPredictedMonth] = useState(null);
  const [yearPredicted, setYearPredicted] = useState(null);

  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
    const newUrl = newPage > page ? filteredDateSales.next : filteredDateSales.previous;
    const { data, request } = await getSales(token, newUrl);
    setClientSales(data);
  };

  useEffect(() => {
    async function fetchData() {
      const { data, request } = await getSalesIA(token, false, "", true);
      if (request.ok) {
        setPredictedMonth(data[0]);
      }
    }
    fetchData();
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      let { data, request } = await getSales(
        token,
        null,
        `date_start=2022-02-01&date_end=2022-03-1`
      );
      console.log(data);
      if (request.ok) {
        setFilteredDateSales(data);
        setMonthSales(data.count);
      }
    }
    fetchData();
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      const { data, request } = await getSalesIA(token, false, "month", true);
      if (request.ok) {
        console.log("EL MALDITO ARRAY QUE NECESITO", data);
        let aux = [];
        Object.entries(data).forEach((element) => {
          aux.push({ month: element[0], sales: element[1] });
        });
        setYearPredicted(aux);
      }
    }
    fetchData();
  }, [token]);

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
                <StatisticPanel value={monthSales} title="Cantidad de ventas en el mes" />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TotalCustomers biggestSale={"0001300"} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TasksProgress
                  task="Porcentaje del objetivo de ventas en el mes"
                  goal={predictedMonth}
                  current={monthSales}
                />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <StatisticPanel value={predictedMonth} title="Cantidad esperada de ventas" />
              </Grid>

              <Grid item lg={12} md={12} xl={9} xs={12}>
                {filteredDateSales ? (
                  <LatestOrders
                    sales={filteredDateSales}
                    handlePageChange={handlePageChange}
                    page={page}
                  />
                ) : (
                  <Skeleton variant="rectangular" width={210} height={118} />
                )}
              </Grid>
              <Grid item lg={12} md={12} xl={9} xs={12}>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="overline"
                  sx={{ fontSize: "1rem" }}
                >
                  Proyeccion de ventas de este año
                </Typography>
                <LineChartComponent sales={yearPredicted}></LineChartComponent>
              </Grid>
            </Grid>
          </Container>
        </DashboardLayout>
      </Box>
    </>
  );
};

export { DashboardAdmin };
