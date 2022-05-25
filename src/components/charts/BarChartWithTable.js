import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartWithTable = ({
  options,
  values,
  handleChange,
  statistic,
  variable,
  handleChangeVariable,
}) => {
  console.log("values", values);
  return (
    <Grid
      container
      spacing={1}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        padding: 3,
        flexDirection: "column",
      }}
      component={Paper}
    >
      <Grid>
        <Select value={statistic} onChange={handleChange} sx={{ margin: 3 }}>
          {options && Object.entries(options).map((option) => (
            <MenuItem value={option[0]} key={option[0]}>
              {option[1]}
            </MenuItem>
          ))}
        </Select>
        <Select value={variable} onChange={handleChangeVariable} sx={{ margin: 3 }}>
          <MenuItem value="count">Volumen de ventas</MenuItem>
          <MenuItem value="total_income">Ingresos totales generados</MenuItem>
        </Select>
      </Grid>
      <TableContainer
        sx={{
          maxHeight: 600,
          border: "1px solid #e0e0e0",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Volumen de ventas</TableCell>
              <TableCell align="center">Ingresos totales generados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values &&
              values.statistic.map((stat) => (
                <TableRow
                  key={stat.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{stat.name}</TableCell>
                  <TableCell align="center">{stat.count}</TableCell>
                  <TableCell align="center">{Math.round(stat.total_income * 100) / 100}$</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {values && (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            width={500}
            height={300}
            data={values.statistic}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={variable} fill="#8884d8" maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Grid>
  );
};

export { BarChartWithTable };
