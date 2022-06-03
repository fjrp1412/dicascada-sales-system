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
  getSalesman,
  getSalesmanIndicator,
  getSalesmanStatistic,
  getSalesmanIA,
} from "../../utils/api/salesman";
import { getSales } from "../../utils/api/sales";
import { AppContext } from "../../context/AppContext";
import { BarChartWithTable } from "../../components/charts/BarChartWithTable";
import { getLocalStorage } from "../../utils/helpers/localStorage";
import { TasksProgress } from "../../components/dashboard/tasks-progress";

const SalesmanDetail = () => {
  const router = useRouter();
  const [salesman, setSalesman] = useState(null);
  const [indicator, setIndicator] = useState(null);
  const [statistic, setStatistic] = useState(null);
  const [salesmanSales, setSalesmanSales] = useState(null);
  const [page, setPage] = useState(0);
  const [income, setIncome] = useState(null);
  const [statisticType, setStatisticType] = useState("client");
  const [variable, setVariable] = useState("count");
  const options = {
    client: "clients",
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
    const newUrl = newPage > page ? salesmanSales.next : salesmanSales.previous;
    const { data, request } = await getSales(token, newUrl, `salesman=${router.query.salesman}`);
    setSalesmanSales(data);
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
      if (!salesman) {
        const { data, request } = await getSalesman(token, router.query.salesman);
        if (request.ok) {
          setSalesman(data);
        }
      }

      if (!indicator) {
        const { data, request } = await getSalesmanIndicator(token, router.query.salesman);
        if (request.ok) {
          setIndicator(data);
        }
      }

      if (!salesmanSales) {
        const { data, request } = await getSales(token, null, `salesman=${router.query.salesman}`);
        if (request.ok) {
          setSalesmanSales(data);
        }
      }

      if (!salesPredicted) {
        const { data, request } = await getSalesmanIA(token, router.query.salesman, false);
        if (request.ok) {
          setSalesPredicted(data);
        }
      }

      if (!salesMonthIncomePredicted) {
        const { data, request } = await getSalesmanIA(token, router.query.salesman, true);
        if (request.ok) {
          setSalesMonthIncomePredicted(data);
        }
      }

      if (!salesMonth) {
        const { data, request } = await getSales(
          token,
          null,
          `date_start=2022-02-01&date_end=2022-03-01&salesman=${router.query.salesman}`
        );
        if (request.ok) {
          console.log("febrero sales ", data);
          setSalesMonth(data.count);
          let summ = 0;
          for (let i = 0; i < data.results.length; i++) {
            const aux_date = new Date(data.results[i].date);
            if (aux_date.getMonth() === 1) {
              console.log('date', aux_date)
              summ += parseFloat(data.results[i].income);
              console.log('valor a sumar', parseFloat(data.results[i].income))
            }
          }
            setSalesMonthIncome(summ);
        }
      }
    }
    if (!salesman || !indicator || !salesmanSales || !income) {
      fetchData();
    }
  }, [token]);

  // useEffect(() => {
  //   let summ = 0;

  //   console.log("a", salesmanSales);

  //   if (salesmanSales) {
  //     for (let i = 0; i < salesmanSales.results.length; i++) {
  //       const aux_date = new Date(salesmanSales.results[i].date);
  //       if (aux_date.getUTCMonth() === 1) {
  //         summ += parseFloat(salesmanSales.results[i].income);
  //       }
  //       setSalesMonthIncome(summ);
  //     }
  //   }
  // }, [salesmanSales]);

  useEffect(() => {
    async function fetchData() {
      const { data, request } = await getSalesmanStatistic(
        token,
        router.query.salesman,
        statisticType
      );
      if (request.ok) {
        console.log("query param", router.query.salesman);
        const aux = data[router.query.salesman];
        const option = options[statisticType];
        console.log(aux);
        setStatistic({ statistic: Object.values(aux[option]) });
      }
    }
    fetchData();
  }, [token, statisticType]);

  return (
    <DashboardLayout>
      <Head>
        <title>Detalle de Vendedor</title>
      </Head>
      {salesman && indicator ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              Detalle de Vendedor
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel
                  title="Ingresos generados del mes"
                  value={`${Math.round(salesMonthIncome * 100) / 100}$`}
                  subTitle="Cantidad de ventas del mes del vendedor"
                  valueSubTitle={salesMonth}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel
                  title="Ingresos esperados generados por el vendedor"
                  value={Math.round(salesMonthIncomePredicted * 100) / 100}
                  subTitle="Ingresos esperados generados por el vendedor"
                  valueSubTitle={Math.round(salesPredicted * 100) / 100}
                />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TasksProgress
                  task="Progreso del objetivo del mes del vendedor, cantidad de ventas"
                  goal={salesPredicted}
                  current={salesMonth}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TasksProgress
                  task="Progreso del objetivo del mes del vendedor, ingresos generados"
                  goal={salesMonthIncomePredicted}
                  current={salesMonthIncome}
                />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <AccountProfile user={salesman} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <AccountProfileDetails client={salesman} />
              </Grid>
              <Grid item lg={12} md={12} xl={9} xs={12}>
                {salesmanSales ? (
                  <LatestOrders
                    sales={salesmanSales}
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
                  options={options}
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

export default SalesmanDetail;
