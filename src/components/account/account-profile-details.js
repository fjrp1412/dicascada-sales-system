import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    name: '',
    phone: '', 
    address: '',
    identity_card: '',
  });

  useEffect(()  => {
    setValues({...props.client});
  }, []);

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="La informacion puede ser editada"
          title="Perfil de cliente"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Especificar el nombre del cliente"
                label="Name"
                name="Name"
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Numero de telefono"
                name="phone"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Cedula o Rif"
                name="identity_card"
                required
                value={values.identity_card}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Direccion"
                name="address"
                required
                value={values.address}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Editar detalles
          </Button>
        </Box>
      </Card>
    </form>
  );
};
