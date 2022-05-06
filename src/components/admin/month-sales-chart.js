import React, { PureComponent } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Semana 1",
    sales: 40,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Semana 2",
    sales: 100,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Semana 3",
    sales: 50,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Semana 4",
    sales: 200,
    pv: 3908,
    amt: 2000,
  },
];

const MonthSalesChart = () => (
  <>
    <Card
      sx={{ marginTop: 10, padding: 5, width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <CardContent 
      sx={{display: "flex", alignItems: "center", flexDirection: "column" }}
      >
          <Typography
            color="textPrimary"
            gutterBottom
            variant="overline"
            sx={{ fontSize: 24}}
          >
            VENTAS DEL MES
          </Typography>
        <LineChart
          width={1000}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" name="Ventas" dataKey="sales" stroke="#82ca9d" />
        </LineChart>
      </CardContent>
    </Card>
  </>
);

export { MonthSalesChart };
