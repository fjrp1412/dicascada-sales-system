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
import { getSale, updateSale } from "../../utils/api/sales";
import { FormSalesProductsModal } from "../../components/sales/form-products-modal";
import { getLocalStorage } from "../../utils/helpers/localStorage";
import { getMe } from "../../utils/api/user";

const SaleDetail = () => {
  const router = useRouter();
  const [pageProducts, setPageProducts] = useState(0);
  const [productsCart, setProductsCart] = useState([]);
  const {
    clients,
    products,
    setClients,
    setProducts,
    isAdmin,
    loguedUser,
    setLoguedUser,
    setIsAdmin,
  } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState(null);
  const [sale, setSale] = useState(null);
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState(null);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    const aux = getLocalStorage("token");
    setToken(getLocalStorage("token"));
    if (!aux) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log(router.isReady);
      if (!sale && router.isReady) {
        console.log("query", router.query.sale);
        const { data, request } = await getSale(token, router.query.sale);
        console.log("sale", data);
        if (request.ok) {
          setSale(data);
          setOrder(data.order);
          console.log("order", data.order);
          setStatus(data.status);
          setIncome(data.income);
        }
      }

      if (!loguedUser) {
        const { data, request } = await getMe({ token });
        if (request.ok) {
          setLoguedUser(data);
          if (data.type.toLowerCase() !== "salesman") {
            setIsAdmin(true);
          }
        }
      }

      if (!products) {
        const { data, request } = await getProducts(token, null);

        if (request.ok) {
          setProducts(data);
        }
      }
    }

    if (!sale || !products || !loguedUser) {
      fetchData();
    }
  }, [token, router.isReady]);

  useEffect(() => {
    if (!productsCart.length && sale) {
      setProductsCart(sale.product);
    }
  }, [sale]);

  useEffect(() => {
    let aux = 0;

    productsCart.forEach((product) => {
      console.log("product income", product.income);
      aux += parseFloat(product.income);
    });

    setIncome(Math.round(aux * 100) / 100);
    console.log("income", aux);
  }, [productsCart]);

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

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
      product: sale ? sale.product : [],
      salesman: sale ? sale.salesman.name : "",
      status: sale ? sale.status : "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (form) => {
      form.product = [...productsCart];
      form.id = sale.id;
      form.status = status;
      console.log("form sale", form);
    },
  });

  return (
    <>
      <Head>
        <title>Detalle de Venta</title>
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
                  value={income}
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

                <InputLabel id="label-status">Estado</InputLabel>
                <Select
                  value={status}
                  sx={{ border: "1px solid #ced4da", marginBottom: 1 }}
                  fullWidth
                  labelId="label-status"
                  onChange={handleChangeStatus}
                  disabled={!isAdmin || sale.status === "COMPLETED"}
                >
                  <MenuItem value="PENDING">PENDIENTE</MenuItem>
                  <MenuItem value="COMPLETED">COMPLETADO</MenuItem>
                </Select>

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
                {!Array.isArray(order) && order && (
                  <ProductsList
                    products={order.product}
                    headLabels={["Producto", "Cantidad", "Total"]}
                    productsFields={["name", "quantity", "income"]}
                    page={pageProducts}
                    handlePageChange={handlePageChangeProducts}
                    handleRemove={handleRemoveProduct}
                    title="Productos de la orden"
                  ></ProductsList>
                )}

                <ProductsList
                  products={productsCart}
                  editable={isAdmin || sale.status !== "COMPLETED"}
                  headLabels={["Producto", "Cantidad", "Total"]}
                  productsFields={["name", "quantity", "income"]}
                  page={pageProducts}
                  handlePageChange={handlePageChangeProducts}
                  handleRemove={handleRemoveProduct}
                ></ProductsList>

                {sale.status.toLowerCase() !== "completed" && isAdmin && (
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
                        disabled={formik.isSubmitting || sale.status.toLowerCase() === "competed" || !isAdmin}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Registrar Venta
                      </Button>

                      {openModal &&  (
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
