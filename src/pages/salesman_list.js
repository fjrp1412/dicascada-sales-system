import React, { useState, useEffect, useContext } from "react";
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

const SalesmanList = (props) => {
  const { token } = useContext(AppContext);
  const [salesmans, setSalesmans] = useState(null);
  const [page, setPage] = useState(0);

  const router = useRouter();

  useEffect(() =>{
  if(!token) {
    router.push("/login");
  }

  }, [])


  useEffect(async () => {
    if (!salesmans) {
      const { data, request } = await getSalesmans(token, null);
      if (request.ok) {
        setSalesmans(data);
      }
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
      <DashboardLayout>
        <Card {...props}>
          <CardHeader title="Lista de Vendedores" />
          <Box sx={{ minWidth: 320 }}>
            <TableContainer sx={{ maxHeight: 600, minWidth: 320 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Cedula/rif</TableCell>
                    <TableCell>Tlf</TableCell>
                    <TableCell>Direccion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesmans &&
                    salesmans.results.map((salesman) => (
                      <TableRow hover key={salesman.id}>
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
