import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container, Grid, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { StatisticPanel } from "../../components/statistics/statistic_panel";
import { LatestOrders } from "../../components/dashboard/latest-orders";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import {
  getClient,
  getClientIndicator,
  getClientStatistic,
  getClientIA,
} from "../../utils/api/clients";
import { getSales } from "../../utils/api/sales";
import { AppContext } from "../../context/AppContext";
import { BarChartWithTable } from "../../components/charts/BarChartWithTable";

const ClientDetail = () => {
  const router = useRouter();
  const { token } = useContext(AppContext);
  const [client, setClient] = useState(null);
  const [indicator, setIndicator] = useState(null);
  const [statistic, setStatistic] = useState(null);
  const [clientSales, setClientSales] = useState(null);
  const [page, setPage] = useState(0);
  const [income, setIncome] = useState(null);
  const [statisticType, setStatisticType] = useState("salesman");
  const [variable, setVariable] = useState("count");
  const options = {
    salesman: "salesman",
    category: "categories",
    product: "products",
  };

  const handleChangeStatistic = (event) => {
    setStatisticType(event.target.value);
  };
  const handleChangeVariable = (event) => {
    setVariable(event.target.value);
  };

  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
    const newUrl = newPage > page ? clientSales.next : clientSales.previous;
    const { data, request } = await getSales(token, newUrl, `client=${router.query.client}`);
    setClientSales(data);
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      const { data, request } = await getClient(token, router.query.client);
      if (request.ok) {
        setClient(data);
      }
    }
    if (!client) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      const { data, request } = await getClientIndicator(token, router.query.client);
      if (request.ok) {
        setIndicator({ ...data });
      }
    }
    fetchData();
  }, [client]);

  useEffect(() => {
    async function fetchData() {
      const { data, request } = await getClientStatistic(token, router.query.client, statisticType);
      if (request.ok) {
        const aux = data[router.query.client];
        const option = options[statisticType];
        setStatistic({ statistic: Object.values(aux[option]) });
      }
    }
    fetchData();
  }, [token, statisticType]);

  useEffect(() => {
    async function fetchData() {
      const { data, request } = await getSales(token, null, `client=${router.query.client}`);
      if (request.ok) {
        setClientSales(data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { data, request } = await getClientIA(token, router.query.client, true);
      if (request.ok) {
        setIncome(data[0]);
      }
    }
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <Head>
        <title>Account | Material Kit</title>
      </Head>
      {client && indicator ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              Detalle de Cliente
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel value={indicator.purchases} title="Compras realizadas" />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel value={`# ${indicator.biggest_sale}`} title="Compras mas alta" />
              </Grid>{" "}
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel
                  value={`${indicator.money_generated}$`}
                  title="Ingresos generados"
                />
              </Grid>{" "}
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel
                  value={`${Math.round(income * 100) / 100}$`}
                  title="Proyeccion monto siguiente compra"
                />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <AccountProfile />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <AccountProfileDetails client={client} />
              </Grid>
              <Grid item lg={12} md={12} xl={9} xs={12}>
                {clientSales ? (
                  <LatestOrders
                    sales={clientSales}
                    handlePageChange={handlePageChange}
                    page={page}
                  />
                ) : (
                  <Skeleton variant="rectangular" width={210} height={118} />
                )}
              </Grid>
              <Grid item lg={12} md={12} xl={9} xs={12}>
                <BarChartWithTable
                  values={statistic}
                  handleChange={handleChangeStatistic}
                  statistic={statisticType}
                  handleChangeVariable={handleChangeVariable}
                  variable={variable}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default ClientDetail;
