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

      if (!income) {
        const { data, request } = await getSalesmanIA(token, router.query.salesman, true);
        if (request.ok) {
          setIncome(data[0]);
        }
      }
    }
    if (!salesman || !indicator || !salesmanSales || !income) {
      fetchData();
    }
  }, [token]);

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
        <title>Account | Material Kit</title>
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
                <StatisticPanel value={indicator.purchases} title="Ventas realizadas" />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel value={`# ${indicator.biggest_sale}`} title="Venta mas alta" />
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
                  title="Proyeccion monto siguiente venta"
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
