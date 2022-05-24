import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import PerfectScrollbar from "react-perfect-scrollbar";
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
import { SeverityPill } from "../components/severity-pill";
import { getSales } from "../utils/api/sales";

const SalesList = (props) => {
  const { token, sales, setSales } = useContext(AppContext);
  const [page, setPage] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
        const { data, request } = await getSales(token, null);
        if (request.ok) {
          setSales(data);
        }
      }

      if(!sales) {
        fetchData();
      }

  }, [token])

  const handlePageChange = async (event, newPage) => {
    const newUrl = newPage > page ? sales.next : sales.previous;
    setPage(newPage);
    const { data, request } = await getProducts(token, newUrl);
    setSales(data);
  };

  return (
    <DashboardLayout>
      <Card {...props}>
        <CardHeader title="Lista de Ventas" />
        <Box sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: "100%", width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Factura</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Vendedor</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales &&
                  sales.results.map((sale) => (
                    <TableRow hover key={sale.id}>
                      <TableCell>{sale.id}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>{sale.income}</TableCell>
                      <TableCell>{sale.salesman.name}</TableCell>
                      <TableCell>{sale.client.name}</TableCell>
                      <TableCell>
                        <SeverityPill
                          color={
                            (sale.status === "delivered" && "success") ||
                            (sale.status === "refunded" && "error") ||
                            "warning"
                          }
                        >
                          {sale.status}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {sales && (
                    <TablePagination
                      colSpan={3}
                      count={sales.count}
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

export default SalesList;
