import React, { PureComponent } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
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

const data = [
  {
    name: "Quesos",
    pastMonth: 4000,
    currentMonth: 2400,
  },
  {
    name: "Frica",
    pastMonth: 3000,
    currentMonth: 1398,
  },
  {
    name: "Productos de cerdo",
    pastMonth: 2000,
    currentMonth: 9800,
  },
  {
    name: "Bebidas",
    pastMonth: 2780,
    currentMonth: 3908,
  },
  {
    name: "Chocolates",
    pastMonth: 1890,
    currentMonth: 4800,
  },
  {
    name: "Viveres",
    pastMonth: 2390,
    currentMonth: 3800,
  },
];

const MonthCategoriesChart = () => {
  return (
    <Card
      sx={{
        marginTop: 10,
        padding: 5,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="overline"
            sx={{ fontSize: 24}}
          >
            VOLUMEN POR CATEGORIAS
          </Typography>
        <BarChart
          width={1400}
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
          <Bar dataKey="pastMonth" name="Mes pasado" fill="#8884d8" />
          <Bar dataKey="currentMonth" name="Mes actual" fill="#82ca9d" />
        </BarChart>
      </CardContent>
    </Card>
  );
};

export { MonthCategoriesChart };
