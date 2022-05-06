import { useContext, useState, useEffect } from "react";
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
import { getClients } from "../utils/api/clients";
import { SeverityPill } from "../components/severity-pill";

const ClientsList = (props) => {
  const { token, clients, setClients } = useContext(AppContext);
  const [page, setPage] = useState(0);

  const handlePageChange = async (event, newPage) => {
    const newUrl = newPage > page ? clients.next : clients.previous;
    setPage(newPage);
    const { data, request } = await getClients(token, newUrl);
    setClients(data);
  };

  return (
    <DashboardLayout>
      <Card {...props}>
        <CardHeader title="Lista de Clientes" />
        <Box sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: "100%", width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Cedula o Rif</TableCell>
                  <TableCell>Numero de tlf</TableCell>
                  <TableCell>Direccion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.results &&
                  clients.results.map((client) => (
                    <TableRow hover key={client.id}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.identity_card}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.address}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={clients.count}
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

export default ClientsList;
