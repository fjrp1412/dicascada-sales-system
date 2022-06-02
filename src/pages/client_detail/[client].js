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
import { getLocalStorage } from "../../utils/helpers/localStorage";
import { TasksProgress } from "../../components/dashboard/tasks-progress";
import { getMe } from "../../utils/api/user";

const ClientDetail = () => {
  const router = useRouter();
  const { isAdmin, loguedUser, setLoguedUser, setIsAdmin } = useContext(AppContext);
  const [client, setClient] = useState(null);
  const [indicator, setIndicator] = useState(null);
  const [statistic, setStatistic] = useState(null);
  const [clientSales, setClientSales] = useState(null);
  const [page, setPage] = useState(0);
  const [incomePredicted, setIncomePredicted] = useState(null);
  const [statisticType, setStatisticType] = useState("salesman");
  const [variable, setVariable] = useState("count");
  const options = {
    salesman: "salesman",
    category: "categories",
    product: "products",
  };
  const [token, setToken] = useState(null);

  const [salesPredicted, setSalesPredicted] = useState(null);
  const [salesMonth, setSalesMonth] = useState(null);
  const [salesMonthIncomePredicted, setSalesMonthIncomePredicted] = useState(null);
  const [salesMonthIncome, setSalesMonthIncome] = useState(null);

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
    const aux = getLocalStorage("token");
    setToken(getLocalStorage("token"));
    if (!aux) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!client) {
        const { data, request } = await getClient(token, router.query.client);
        if (request.ok) {
          setClient(data);
        }
      }

      if (!loguedUser) {
        const { data, request } = await getMe({ token });
        console.log("user", data);
        if (request.ok) {
          setLoguedUser(data);
          if (data.type.toLowerCase() !== "salesman") {
            setIsAdmin(true);
          }
        }
      }

      if (!indicator) {
        const { data, request } = await getClientIndicator(token, router.query.client);
        if (request.ok) {
          setIndicator(data);
        }
      }

      if (!clientSales) {
        const { data, request } = await getSales(token, null, `client=${router.query.client}`);
        if (request.ok) {
          setClientSales(data);
        }
      }

      if (!salesPredicted) {
        const { data, request } = await getClientIA(token, router.query.client, false);
        if (request.ok) {
          setSalesPredicted(data);
        }
      }

      if (!salesMonthIncomePredicted) {
        const { data, request } = await getClientIA(token, router.query.client, true);
        if (request.ok) {
          setSalesMonthIncomePredicted(data);
        }
      }

      if (!salesMonth) {
        const { data, request } = await getSales(
          token,
          null,
          `date_start=2022-02-01&date_end=2022-03-01&client=${router.query.client}`
        );
        if (request.ok) {
          console.log("febrero sales ", data);
          setSalesMonth(data.count);
          let summ = 0;
          for (let i = 0; i < data.results.length; i++) {
            const aux_date = new Date(data.results[i].date);
            if (aux_date.getMonth() === 1) {
              console.log("date", aux_date);
              summ += parseFloat(data.results[i].income);
              console.log("valor a sumar", parseFloat(data.results[i].income));
            }
          }
          setSalesMonthIncome(summ);
        }
      }
    }
    if (!client || !indicator || !clientSales || !incomePredicted) {
      fetchData();
    }
  }, [token, router]);

  useEffect(() => {
    async function fetchData() {
      const { data, request } = await getClientStatistic(token, router.query.client, statisticType);
      if (request.ok && Object.entries(data).length !== 0 && router.query.client) {
        console.log("data", data);
        const aux = data[router.query.client];
        const option = options[statisticType];
        setStatistic({ statistic: Object.values(aux[option]) });
      }
    }
    fetchData();
  }, [token, statisticType, router]);

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
              {isAdmin && (
                <Grid container spacing={3}>
                  {statistic ? (
                    <>
                      {" "}
                      <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <StatisticPanel
                          title="Ingresos generados del mes"
                          value={`${Math.round(salesMonthIncome * 100) / 100}$`}
                          subTitle="Cantidad de ventas del mes del cliente"
                          valueSubTitle={salesMonth}
                        />
                      </Grid>
                      <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <StatisticPanel
                          title="Ingresos esperados generados por el cliente"
                          value={Math.round(salesMonthIncomePredicted * 100) / 100}
                          subTitle="Ingresos esperados generados por el cliente"
                          valueSubTitle={Math.round(salesPredicted * 100) / 100}
                        />
                      </Grid>
                      <Grid item xl={3} lg={3} sm={6} xs={12}>
                        <TasksProgress
                          task="Progreso del objetivo del mes del cliente, cantidad de ventas"
                          goal={salesPredicted}
                          current={salesMonth}
                        />
                      </Grid>
                      <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <TasksProgress
                          task="Progreso del objetivo del mes del cliente, ingresos generados"
                          goal={salesMonthIncomePredicted}
                          current={salesMonthIncome}
                        />
                      </Grid>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <StatisticPanel value={0} title="Compras realizadas" />
                      </Grid>
                      <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <StatisticPanel
                          value="No hay compras registradas"
                          title="Compras mas alta"
                        />
                      </Grid>{" "}
                      <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <StatisticPanel value={`0$`} title="Ingresos generados" />
                      </Grid>{" "}
                      <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <StatisticPanel value={`0$`} title="Proyeccion monto siguiente compra" />
                      </Grid>
                    </>
                  )}
                </Grid>
              )}

              <Grid item lg={4} md={6} xs={12}>
                <AccountProfile user={client} />
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
              {statistic && (
                <Grid item lg={12} md={12} xl={9} xs={12}>
                  <BarChartWithTable
                    values={statistic}
                    handleChange={handleChangeStatistic}
                    statistic={statisticType}
                    handleChangeVariable={handleChangeVariable}
                    variable={variable}
                    options={options}
                  />
                </Grid>
              )}
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
