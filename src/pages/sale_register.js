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
import { getClientIndicator } from "../utils/api/clients";
import { FormSalesProductsModal } from "../components/sales/form-products-modal";
import { getLocalStorage } from "../utils/helpers/localStorage";
import { createOrder, createProductOrder } from "../utils/api/orders";

const SaleRegister = () => {
  const router = useRouter();
  const [pageProducts, setPageProducts] = useState(0);
  const [productsCart, setProductsCart] = useState([]);
  const { clients, loguedUser, products, setClients, setProducts } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState(null);
  const [income, setIncome] = useState(null);

  useEffect(() => {
    const aux = getLocalStorage("token");
    setToken(getLocalStorage("token"));
    if (!aux) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!clients) {
        const { data, request } = await getClientIndicator(token, null);
        if (request.ok) {
          setClients(data);
        }
      }

      if (!products) {
        const { data, request } = await getProducts(token, null);

        if (request.ok) {
          setProducts(data);
        }
      }
    }

    if (!clients || !products) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    let aux = 0;

    productsCart.forEach((product) => {
      aux += product.income;
    });

    setIncome(Math.round(aux * 100) / 100);
    console.log("income", aux);
  }, [productsCart]);

  const handlePageChangeProducts = async (event, newPage) => {
    const newUrl = newPage > pageProducts ? productsCart.next : productsCart.previous;
    setPageProducts(newPage);
    const { data, request } = await getProducts(token, newUrl);
    setProductsCart(data);
  };

  const handleRemoveProduct = async (name) => {
    console.log(name);
    const newProducts = productsCart.filter((product) => product.name !== name);
    setProductsCart([...newProducts]);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      income: "",
      client: "cliente",
      income_currency: "USD",
      products: null,
      salesman: "",
      status: "PENDING",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Numero de factura requerido"),
      client: Yup.string().required("Cliente requerido"),
      status: Yup.string().required("Estado requerido"),
    }),
    onSubmit: async (form) => {
      form.products = productsCart;
      form.income = income;
      form.salesman = loguedUser.id;

      const { data, request } = await createOrder(token, form);

      console.log(request);

      if (request.ok) {
        router.push("/");
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <DashboardLayout>
        {token && clients && products && (
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
            <Container sx={{ width: "100%" }}>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography color="textPrimary" variant="h4">
                    Registrar Venta
                  </Typography>
                </Box>
                <Grid container spacing={3}></Grid>

                <TextField
                  error={Boolean(formik.touched.id && formik.errors.id)}
                  helperText={formik.touched.id && formik.errors.id}
                  fullWidth
                  label="Factura"
                  margin="normal"
                  name="id"
                  onBlur={formik.handleBlur}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.id}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Monto"
                  margin="normal"
                  name="income"
                  onBlur={formik.handleBlur}
                  type="text"
                  value={income}
                  variant="outlined"
                  disabled
                />

                <TextField
                  error={Boolean(formik.touched.income_currency && formik.errors.income_currency)}
                  helperText={formik.touched.income_currency && formik.errors.income_currency}
                  fullWidth
                  label="Divisa"
                  margin="normal"
                  name="income_currency"
                  onBlur={formik.handleBlur}
                  type="text"
                  value={formik.values.income_currency}
                  variant="outlined"
                  disabled
                />

                <TextField
                  error={Boolean(formik.touched.status && formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                  fullWidth
                  label="Estado"
                  margin="normal"
                  name="status"
                  onBlur={formik.handleBlur}
                  type="text"
                  value={formik.values.status}
                  variant="outlined"
                  disabled
                />

                <InputLabel id="label-client">Cliente</InputLabel>
                <Select
                  error={Boolean(formik.touched.client && formik.errors.client)}
                  helperText={formik.touched.client && formik.errors.client}
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  label="Cliente"
                  labelId="label-client"
                  value={formik.values.client}
                  name="client"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  {clients &&
                    clients.results.map((client) => (
                      <MenuItem value={client.client.id} key={client.client.id}>
                        {client.client.name}
                      </MenuItem>
                    ))}
                </Select>

                <InputLabel id="label-salesman">Vendedor</InputLabel>
                <TextField
                  error={Boolean(formik.touched.salesman && formik.errors.salesman)}
                  helperText={formik.touched.salesman && formik.errors.salesman}
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  label="Vendedor"
                  labelId="label-salesman"
                  value={loguedUser.name}
                  name="salesman"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  variant="outlined"
                  disabled
                ></TextField>

                <ProductsList
                  error={Boolean(formik.touched.products && formik.errors.products)}
                  helperText={formik.touched.products && formik.errors.products}
                  products={productsCart}
                  editable={true}
                  headLabels={["Producto", "Cantidad", "Precio", "Total"]}
                  productsFields={["name", "quantity", "typePrice", "income"]}
                  page={pageProducts}
                  handlePageChange={handlePageChangeProducts}
                  handleRemove={handleRemoveProduct}
                ></ProductsList>
                <Box sx={{ py: 2, display: "flex", justifyContent: "flex-end", width: "100%" }}>
                  <IconButton
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <AddCircleIcon />
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
                {openModal && (
                  <FormSalesProductsModal
                    open={openModal}
                    handleClose={() => {
                      setOpenModal(false);
                    }}
                    cartProducts={productsCart}
                    setCartProducts={setProductsCart}
                  ></FormSalesProductsModal>
                )}
              </form>
            </Container>
          </Box>
        )}
      </DashboardLayout>
    </>
  );
};

export default SaleRegister;
