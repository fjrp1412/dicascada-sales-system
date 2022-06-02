import { useContext } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { InputLabel, Select, MenuItem } from "@mui/material";

import { AppContext } from "../../context/AppContext";

export const FormSalesProductsModal = ({ open, handleClose, setCartProducts, cartProducts }) => {
  const { products } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      name: null,
      quantity: null,
      total: null,
      price: null,
      product: null,
      id: null,
    },
    onSubmit: (form) => {
      console.log(form);
    },
  });

  const handleSubmit = (form) => {
    const product = products.results.find((product) => product.id === form.product);
    let typePrice;

    if(form.price === "price_1") {
        typePrice = "Precio general"
    }

    else if(form.price === "price_2") {
        typePrice = "Precio especial"
    }

    else {
        typePrice = "Precio convenio"
    }

    console.log(cartProducts);
    setCartProducts([...cartProducts, 
        {
        product: product.id,
        name: product.name,
        quantity: form.quantity,
        income: parseFloat(product[form.price]) * form.quantity,
        price: Math.round(form.price * 100) / 100,
        typePrice: typePrice
    }]
        );
    handleClose()
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar producto a venta</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <InputLabel id="label-product">Producto</InputLabel>
            <Select
              sx={{ marginTop: 2, marginBottom: 5 }}
              fullWidth
              label="Product"
              labelId="label-product"
              value={formik.values.product}
              name="product"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              {products &&
                products.results.map((product) => (
                  <MenuItem value={product.id} key={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
            </Select>

            <TextField
              error={Boolean(formik.touched.id && formik.errors.id)}
              fullWidth
              helperText={formik.touched.id && formik.errors.id}
              label="Cantidad"
              margin="normal"
              name="quantity"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.id}
              variant="outlined"
            />

            <InputLabel id="label-product" sx={{ marginTop: 5 }}>
              Precio
            </InputLabel>
            <Select
              sx={{ marginTop: 2, marginBottom: 1 }}
              fullWidth
              label="Precio"
              labelId="label-price"
              value={formik.values.price}
              name="price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <MenuItem value={"price_1"}>Precio general</MenuItem>
              <MenuItem value={"price_2"}>Precio especial</MenuItem>
              <MenuItem value={"price_3"}>Precio Convenio</MenuItem>
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => handleSubmit(formik.values)}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
