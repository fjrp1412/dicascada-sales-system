import React, { useEffect, useState } from "react";
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

const LineChartComponent = ({ arrays }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let aux = [];
    let keys = Object.keys(arrays);
    let months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    for (let i = 0; i < 12; i++) {
      let obj = {};
      obj.month = months[i];
      for (let j = 0; j < keys.length; j++) {
        if(arrays[keys[j]]) {
        if (arrays[keys[j]][i]) {
          obj[keys[j]] = arrays[keys[j]][i].count;
        }
        }

      }
      aux.push({ ...obj });
    }
    setData(aux);
  }, [arrays]);

  return (
    <Grid component={Paper} sx={{ padding: 2 }}>
      {data && (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={data}
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
            <YAxis domain={["dataMin", "auto"]} />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="predicted" stroke="#186df5" />
            <Line type="monotone" dataKey="previous" stroke="#18f54c" />
            <Line type="monotone" dataKey="actual" stroke="#ed022a" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Grid>
  );
};

export { LineChartComponent };
