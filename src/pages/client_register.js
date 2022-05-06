import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DashboardLayout } from "../components/dashboard-layout";
import { AppContext } from "src/context/AppContext";
import { ProductsList } from "../components/products/products-list";
import { getProducts } from "../utils/api/products";
import { FormSalesProductsModal } from "../components/sales/form-products-modal";

const ClientRegister = () => {
  const { token } = useContext(AppContext);

  const router = useRouter();
  useEffect(() =>{
  if(!token) {
    router.push("/login");
  }

  }, [])

  const formik = useFormik({
    initialValues: {
        address: "",
        identity_card: "",
        name: "",
        phone: "",

    },
    validationSchema: Yup.object({
      identity_card: Yup.string().required("Cedula o Rif requerido"),
      name: Yup.string().required("Nombre del cliente requerido"),
      phone: Yup.string().required("Telefono requerido"),
    }),
    onSubmit: async (form) => {
      console.log(form);
    },
  });

  return (
    <>
      <Head>
        <title>Registrar Cliente</title>
      </Head>
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            width: "100%",
          }}
        >
          <Container sx={{width: "100%"}} >
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Registrar Cliente
                </Typography>
              </Box>
              <Grid container spacing={3}></Grid>

              <TextField
                error={Boolean(formik.touched.id && formik.errors.id)}
                fullWidth
                helperText={formik.touched.id && formik.errors.id}
                label="Nombre"
                margin="normal"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.name}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Cedula o Rif"
                margin="normal"
                name="identity_card"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.identity_card}
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Address"
                margin="normal"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.address}
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Numero de tlf"
                margin="normal"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.phone}
                variant="outlined"
              />

             <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Registrar Cliente
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default ClientRegister;
