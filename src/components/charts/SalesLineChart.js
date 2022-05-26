import React, { useEffect } from "react";
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
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const LineChartComponent = ({ sales, predicted }) => {
  return (
    <Grid component={Paper} sx={{ padding: 2 }}>
      {sales && (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={sales}
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
            <XAxis dataKey="month" />
            <YAxis domain={['dataMin', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Grid>
  );
};

export { LineChartComponent };
