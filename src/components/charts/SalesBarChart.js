import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const LineChartComponent = ({ sales, predicted }) => {
  useEffect(() => {
    if (sales) {
      sales.results.forEach((value) => {
        value.income = parseFloat(value.income);
      });
    }
  }, [sales]);
  return (
    <Grid component={Paper} sx={{ padding: 2 }}>
      {sales && (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={sales.results}
            width={500}
            height={500}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" hide />
            <YAxis type="number" domain={[0, (dataMax) => dataMax + 100]} />
            <Tooltip />
            <Legend />
            <Bar type="monotone" dataKey="income" stroke="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Grid>
  );
};

export { LineChartComponent };
