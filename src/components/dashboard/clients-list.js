import { useRef, useState, useEffect } from 'react';
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
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
import { SeverityPill } from "../severity-pill";

export const ClientsList = (props) => {
 const {clients, handlePageChange, page } = props;

  return (
    <Card {...props}>
      <CardHeader title="Lista de Clientes" />
        <Box sx={{ minWidth: 320 }}>
        <TableContainer sx={{ maxHeight: 600, minWidth: 320 }} >
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
              {clients.results.map((client) => (
                <TableRow hover key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.identity_card}</TableCell>
                  <TableCell>{client.phone === "nan" ? "" : client.phone}</TableCell>
                  <TableCell>{client.address === "nan" ? "" : client.address}</TableCell>
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
      >
      </Box>
    </Card>
  );
};
