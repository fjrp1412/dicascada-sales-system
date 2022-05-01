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

export const ProductsList = (props) => {
 const {products, handlePageChange, page } = props;

  return (
    <Card {...props}>
      <CardHeader title="Lista de Productos" />
        <Box sx={{ minWidth: 800 }}>
        <TableContainer sx={{ maxHeight: 600 }} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Factura</TableCell>
                <TableCell>Precio general</TableCell>
                <TableCell>Precio especial</TableCell>
                <TableCell>Precio convenio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.results.map((product) => (
                <TableRow hover key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.price_1} {product.price_1_currency}</TableCell>
                  <TableCell>{product.price_2} {product.price_2_currency}</TableCell>
                  <TableCell>{product.price_3} {product.price_3_currency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
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
