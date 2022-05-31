import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Filter = ({ fields, onFilter, onClear }) => {
  const [query, setQuery] = useState({});

  const handleChange = (field, event) => {
    setQuery({ ...query, [field]: event.target.value });
    console.log(query);
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Typography gutterBottom variant="overline" sx={{ fontSize: "0.9rem" }}>
            Filtros
          </Typography>
        </Grid>
      </Grid>
      {fields &&
        fields.map((field) => (
          <TextField
            key={field.field}
            label={field.title}
            variant="outlined"
            onChange={(event) => handleChange(field.field, event)}
          />
        ))}
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Button size="large" variant="contained" onClick={() => onFilter(query)} sx={{ margin: 2 }}>
          Filtrar
        </Button>
        <Button size="large" variant="contained" onClick={onClear}>
          Limpiar
        </Button>
      </Grid>
    </Box>
  );
};

export { Filter };
