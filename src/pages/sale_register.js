import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { login, getMe } from "../utils/api/user";
import { DashboardLayout } from "../components/dashboard-layout";
import { AppContext } from "src/context/AppContext";
import { ProductsList } from "../components/products/products-list";
import { getProducts } from "../utils/api/products";

const SaleRegister = () => {
  const router = useRouter();
  const [pageProducts, setPageProducts] = useState(0);
  const [products, setProducts] = useState(null);
  const { token } = useContext(AppContext);

  useEffect(async () => {
    const { data, request } = await getProducts(token, null);
    if (request.ok) {
      setProducts(data);
    }
  }, [token]);

  const handlePageChangeProducts = async (event, newPage) => {
    const newUrl = newPage > pageProducts ? products.next : products.previous;
    setPageProducts(newPage);
    const { data, request } = await getProducts(token, newUrl);
    setProducts(data);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      income: "",
      client: "cliente",
      income_currency: "USD",
      products: null,
      salesman: "vendedor",
      status: "PENDING",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Numero de factura requerido"),
    }),
    onSubmit: async (form) => {
      console.log(form);
    },
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Registrar Venta
                </Typography>
              </Box>
              <Grid container spacing={3}></Grid>

              <TextField
                error={Boolean(formik.touched.id && formik.errors.id)}
                fullWidth
                helperText={formik.touched.id && formik.errors.id}
                label="Factura"
                margin="normal"
                name="id"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.id}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Monto"
                margin="normal"
                name="income"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.income}
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Divisa"
                margin="normal"
                name="income_currency"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.income_currency}
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Estado"
                margin="normal"
                name="status"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.status}
                variant="outlined"
              />

              <InputLabel id="label-client">Cliente</InputLabel>
              <Select
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                label="Cliente"
                labelId="label-client"
                value={formik.values.client}
                name="client"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

              <InputLabel id="label-salesman">Vendedor</InputLabel>
              <Select
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                label="Vendedor"
                labelId="label-salesman"
                value={formik.values.salesman}
                name="salesman"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                variant="outlined"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>



              <ProductsList
                products={formik.values.products}
                headLabels={["Producto", "Cantidad", "Precio", "Total", "Eliminar", "Editar"]}
                page={pageProducts}
                handlePageChange={handlePageChangeProducts}
              ></ProductsList>
              <Box sx={{ py: 2, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <IconButton
                >
                <AddCircleIcon/>
                </IconButton>
              </Box>

              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Registrar Venta
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default SaleRegister;
