import { useState, useEffect, useContext } from "react";
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
import { getSalesmans } from "../utils/api/salesman";
import { DashboardLayout } from "../components/dashboard-layout";
import { getLocalStorage } from "../utils/helpers/localStorage";
import { getMe } from "../utils/api/user";

const SalesmanList = (props) => {
  const [page, setPage] = useState(0);
  const [token, setToken] = useState(null);

  const router = useRouter();
  const { salesmans, setSalesmans, isAdmin, loguedUser, setLoguedUser, setIsAdmin } =
    useContext(AppContext);

  useEffect(() => {
    const aux = getLocalStorage("token");
    setToken(getLocalStorage("token"));
    if (!aux) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!loguedUser) {
        const { data, request } = await getMe({ token });
        if (request.ok) {
          setLoguedUser(data);
          if (data.type.toLowerCase() !== "salesman") {
            setIsAdmin(true);
          }
        }
      }
      if (!salesmans) {
        const { data, request } = await getSalesmans(token, null);
        if (request.ok) {
          setSalesmans(data);
        }
      }
    }

    if (!salesmans || !loguedUser) {
      fetchData();
    }
  }, [token]);

  const handlePageChange = async (event, newPage) => {
    setPage(newPage);
    const newUrl = newPage > pageSales ? sales.next : sales.previous;

    const { data, request } = await getSalesmans(token, newUrl);
    setSalesmans(data);
  };

  return (
    <>
      <Head>
        <title>Lista de vendedores</title>
      </Head>
      <DashboardLayout>
        <Card {...props}>
          <CardHeader title="Lista de Vendedores" />
          <Box sx={{ minWidth: 320 }}>
            <TableContainer sx={{ maxHeight: 600, minWidth: 320 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vendedor</TableCell>
                    <TableCell>Cedula</TableCell>
                    <TableCell>Tlf</TableCell>
                    <TableCell>Direccion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesmans &&
                    salesmans.results.map((salesman) => (
                      <TableRow
                        hover
                        key={salesman.id}
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push(`/salesman_detail/${salesman.id}`)}
                      >
                        <TableCell>{salesman.name}</TableCell>
                        <TableCell>{salesman.identity_card}</TableCell>
                        <TableCell>{salesman.phone === "nan" ? "" : salesman.phone}</TableCell>
                        <TableCell>{salesman.address === "nan" ? "" : salesman.address}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    {salesmans && (
                      <TablePagination
                        colSpan={3}
                        count={salesmans.count}
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

export default SalesmanList;
