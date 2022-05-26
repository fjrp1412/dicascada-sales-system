import { useRef, useState, useEffect } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DeleteOutline } from "@mui/icons-material";

export const ProductsList = (props) => {
  const { products, handlePageChange, page, headLabels, pagination, productsFields, editable, handleRemove } =
    props;

  console.log('products', products)
  return (
    <Card {...props}>
      <CardHeader title="Lista de Productos" />
      <Box sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 600, width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                {headLabels.map((label) => (
                  <TableCell key={label}>{label}</TableCell>
                ))}
                {editable && (
                  <>
                  <TableCell>Editar</TableCell>
                  <TableCell>Eliminar</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 &&
                products.map((product) => (
                  <TableRow hover key={product.name}>
                    {productsFields.map((field) => (
                      <TableCell key={field}>{product[field]}</TableCell>
                    ))}

                    {editable && (
                      <>
                        <TableCell>
                          <EditIcon />
                        </TableCell>
                        <TableCell onClick={() => handleRemove(product.name)}>
                          <DeleteOutlineIcon />
                        </TableCell>
                      </>
                    )}
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
