import { useRef, useState, useEffect } from "react";
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
  const { products, handlePageChange, page, headLabels, pagination, productsFields } = props;

  return (
    <Card {...props}>
      <CardHeader title="Lista de Productos" />
      <Box sx={{  width: "100%" }}>
        <TableContainer sx={{ maxHeight: 600, width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                {headLabels.map((label) => (
                  <TableCell key={label}>{label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 &&
                products.map((product) => (
                  <TableRow hover key={product.id}>
                    {productsFields.map((field) => (
                      <TableCell key={field}>{product[field]}</TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                {pagination && (
                  <TablePagination
                    colSpan={3}
                    count={-1}
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
  );
};
