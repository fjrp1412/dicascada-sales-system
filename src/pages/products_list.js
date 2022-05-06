import { useContext, useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  TableFooter,
  TablePagination,
  TableContainer,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { AppContext } from "../context/AppContext";
import { DashboardLayout } from "../components/dashboard-layout";
import { getProducts } from "../utils/api/products";

const ProductsList = (props) => {
  const { token, products, setProducts } = useContext(AppContext);
  const [page, setPage] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handlePageChange = async (event, newPage) => {
    const newUrl = newPage > page ? products.next : products.previous;
    setPage(newPage);
    const { data, request } = await getProducts(token, newUrl);
    setProducts(data);
  };

  return (
    <DashboardLayout>
      <Card {...props}>
        <CardHeader title="Lista de Productos" />
        <Box sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: "100%", width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Costo</TableCell>
                  <TableCell>Presentacion</TableCell>
                  <TableCell>Precio general</TableCell>
                  <TableCell>Precio especial</TableCell>
                  <TableCell>Precio convenio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.results.map((product) => (
                    <TableRow hover key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category.name}</TableCell>
                      <TableCell>{product.cost}</TableCell>
                      <TableCell>{product.presentation}</TableCell>
                      <TableCell>{product.price_1}</TableCell>
                      <TableCell>{product.price_2}</TableCell>
                      <TableCell>{product.price_3}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {products && (
                    <TablePagination
                      colSpan={3}
                      count={products.count}
                      rowsPerPage={100}
                      onPageChange={handlePageChange}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                    />
                  )}
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        ></Box>
      </Card>
    </DashboardLayout>
  );
};

export default ProductsList;
