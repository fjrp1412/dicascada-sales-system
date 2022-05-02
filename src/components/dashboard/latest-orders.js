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

export const LatestOrders = (props) => {
 const {orders, handlePageChange, page } = props;
 const ref = useRef(null)

 console.log(orders);

  return (
    <Card {...props}>
      <CardHeader title="Ventas" />
        <Box sx={{ minWidth: 320 }}>
        <TableContainer sx={{ maxHeight: 600, minWidth: 320 }} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Factura</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Fecha
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.results.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.client.name}</TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (order.status === "delivered" && "success") ||
                        (order.status === "refunded" && "error") ||
                        "warning"
                      }
                    >
                      {order.status}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={orders.count}
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
