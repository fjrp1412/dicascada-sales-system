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
import { DashboardLayout } from "../../components/dashboard-layout";
import { AppContext } from "src/context/AppContext";
import { ProductsList } from "../../components/products/products-list";
import { getProducts } from "../../utils/api/products";
import { getSale } from "../../utils/api/sales";
import { FormSalesProductsModal } from "../../components/sales/form-products-modal";
import { getLocalStorage } from "../../utils/helpers/localStorage";

const SaleDetail = () => {
  const router = useRouter();
  const [pageProducts, setPageProducts] = useState(0);
  const [productsCart, setProductsCart] = useState([]);
  const { isAdmin, clients, products, setClients, setProducts } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState(null);
  const [sale, setSale] = useState(null);

  useEffect(() => {
    const aux = getLocalStorage("token");
    setToken(getLocalStorage("token"));
    if (!aux) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!sale) {
        console.log("query", router.query.sale);
        const { data, request } = await getSale(token, router.query.sale);
        console.log("sale", data);
        if (request.ok) {
          setSale(data);
        }
      }

      if (!products) {
        const { data, request } = await getProducts(token, null);

        if (request.ok) {
          setProducts(data);
        }
      }
    }

    if (!sale || !products) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (!productsCart.length && sale) {
      setProductsCart(sale.product);
    }
  }, [sale]);

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
      id: sale ? sale.id : null,
      income: sale ? sale.income : "",
      client: sale ? sale.client.name : "",
      income_currency: "USD",
      products: sale ? sale.product : [],
      salesman: sale ? sale.salesman.name : "",
      status: sale ? sale.status : "",
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
        {token && products && sale && (
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
                  fullWidth
                  helperText={formik.touched.id && formik.errors.id}
                  label="Factura"
                  margin="normal"
                  disabled
                  name="id"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={sale.id}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  disabled
                  label="Monto"
                  margin="normal"
                  name="income"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={sale.income}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  disabled
                  label="Divisa"
                  margin="normal"
                  name="income_currency"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={sale.income_currency}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Estado"
                  margin="normal"
                  name="status"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  disabled={isAdmin ? false : true}
                  type="text"
                  value={sale.status}
                  variant="outlined"
                />

                <InputLabel id="label-client">Cliente</InputLabel>
                <TextField
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  label="Cliente"
                  labelId="label-client"
                  disabled
                  value={sale.client.name}
                  name="client"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <InputLabel id="label-salesman">Vendedor</InputLabel>
                <TextField
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  label="Vendedor"
                  labelId="label-salesman"
                  name="salesman"
                  value={sale.salesman.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  variant="outlined"
                  disabled
                ></TextField>

                <ProductsList
                  products={productsCart}
                  editable={true}
                  headLabels={["Producto", "Cantidad", "Precio", "Total"]}
                  productsFields={["name", "quantity", "typePrice", "total"]}
                  page={pageProducts}
                  handlePageChange={handlePageChangeProducts}
                  handleRemove={handleRemoveProduct}
                ></ProductsList>

                <ProductsList
                  products={productsCart}
                  editable={true}
                  headLabels={["Producto", "Cantidad", "Precio", "Total"]}
                  productsFields={["name", "quantity", "typePrice", "total"]}
                  page={pageProducts}
                  handlePageChange={handlePageChangeProducts}
                  handleRemove={handleRemoveProduct}
                ></ProductsList>

                {sale.status.toLowerCase() !== "completed" && (
                  <>
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
                    </Box>
                  </>
                )}
              </form>
            </Container>
          </Box>
        )}
      </DashboardLayout>
    </>
  );
};

export default SaleDetail;