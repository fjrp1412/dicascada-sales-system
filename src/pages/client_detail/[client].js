import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container, Grid, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { StatisticPanel } from "../../components/statistics/statistic_panel";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import { getClient, getClientIndicator } from "../../utils/api/clients";
import { AppContext } from "../../context/AppContext";

const ClientDetail = () => {
  const router = useRouter();
  const { token } = useContext(AppContext);
  const [client, setClient] = useState(null);
  const [indicator, setIndicator] = useState(null);

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
        setIndicator(data);
      }
    }
    fetchData();
  }, [client]);

  console.log(client);
  console.log(indicator);

  return (
    <DashboardLayout>
      <Head>
        <title>Account | Material Kit</title>
      </Head>
      {client ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              Account
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <AccountProfile />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <AccountProfileDetails client={client} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel value={indicator.purchases} title="Ventas realizadas" />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel value={`# ${indicator.biggest_sale}`} title="Venta mas alta" />
              </Grid>{" "}
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel value={`${indicator.money_generated}$`} title="Dinero generado" />
              </Grid>{" "}
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticPanel value={120} title="ventas realizadas" />
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
