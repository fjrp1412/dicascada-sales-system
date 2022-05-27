import {
  Box,
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
import { SeverityPill } from "../severity-pill";

export const LatestOrders = (props) => {
  const { sales, handlePageChange, page } = props;

  return (
    <Card {...props}>
      <CardHeader title="Ventas" />
      <Box sx={{ minWidth: 320 }}>
        {sales && (
          <TableContainer sx={{ maxHeight: 600, minWidth: 320 }}>
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
                {sales.results.map((order) => (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.client.name}</TableCell>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <SeverityPill
                        color={
                          (order.status.toLowerCase() === "completed" && "success") ||
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
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
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
