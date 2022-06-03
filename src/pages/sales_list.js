import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  TableContainer,
} from "@mui/material";
import { AppContext } from "../context/AppContext";
import { DashboardLayout } from "../components/dashboard-layout";
import { getProducts } from "../utils/api/products";
import { SeverityPill } from "../components/severity-pill";
import { getSales } from "../utils/api/sales";
import { getLocalStorage } from "../utils/helpers/localStorage";
import { Filter } from "../components/filter";
import { getMe } from "../utils/api/user";

const SalesList = (props) => {
  const { sales, setSales, isAdmin, loguedUser, setLoguedUser, setIsAdmin } =
    useContext(AppContext);
  const [page, setPage] = useState(0);
  const [token, setToken] = useState(null);
  const [filteredSales, setFilteredSales] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const aux = getLocalStorage("token");
    setToken(getLocalStorage("token"));
    if (!aux) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!filteredSales) {
        if (!isAdmin) {
          const { data, request } = await getSales(token, null, `status=COMPLETED`);
          if (request.ok) {
            setFilteredSales(data);
          }
        } else {
          const { data, request } = await getSales(
            token,
            null,
            `salesman=${loguedUser.salesman.salesman.id}&status=COMPLETED`
          );
          if (request.ok) {
            setFilteredSales(data);
          }
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
    }

    if (!filteredSales || !loguedUser) {
      fetchData();
    }
  }, [token]);

  const handlePageChange = async (event, newPage) => {
    const newUrl = newPage > page ? sales.next : sales.previous;
    setPage(newPage);
    const { data, request } = await getProducts(token, newUrl);
    setSales(data);
  };

  const handleClick = (sale) => {
    router.push(`/sale_detail/${sale.id}`);
  };

  const handleFilter = async (query) => {
    let aux = "";
    console.log(query);
    Object.entries(query).forEach((element) => {
      aux = aux + `${element[0]}=${element[1]}&`;
    });
    console.log("aux", aux);

    const { data, request } = await getSales(token, null, aux);
    if (request.ok) {
      setFilteredSales(data);
    }
  };

  const handleClear = () => {
    setFilteredSales(sales);
  };

  return (
    <>
      <Head>
        <title>Lista de Ventas</title>
      </Head>
      <DashboardLayout>
        <Card {...props}>
          <CardHeader title="Lista de Ventas" />
          <Box sx={{ width: "100%" }}>
            <Filter
              fields={[{ title: "Factura", field: "id", type: "text" }]}
              onFilter={handleFilter}
              onClear={handleClear}
            ></Filter>
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
                  {filteredSales &&
                    filteredSales.results.map((sale) => (
                      <TableRow hover key={sale.id} onClick={() => handleClick(sale)}>
                        <TableCell>{sale.id}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>{sale.income}</TableCell>
                        <TableCell>{sale.salesman.name}</TableCell>
                        <TableCell>{sale.client.name}</TableCell>
                        <TableCell>
                          <SeverityPill
                            color={
                              (sale.status.toLowerCase() === "completed" && "success") ||
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
                    {filteredSales && (
                      <TablePagination
                        colSpan={3}
                        count={filteredSales.count}
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
    </>
  );
};

export default SalesList;
