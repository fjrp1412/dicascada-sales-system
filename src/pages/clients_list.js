import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import { AppContext } from "../context/AppContext";
import { DashboardLayout } from "../components/dashboard-layout";
import { getClients, getClientIndicator } from "../utils/api/clients";
import { getLocalStorage } from "../utils/helpers/localStorage";
import { Filter } from "../components/filter";

const ClientsList = (props) => {
  const { clients, setClients } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [filteredClients, setFilteredClients] = useState(null);

  useEffect(() => {
    const aux = getLocalStorage("token");
    setToken(getLocalStorage("token"));
    if (!aux) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { data, request } = await getClientIndicator(token, null);
      if (request.ok) {
        data.results = data.results.filter((element) => element.purchases > 8);
        setClients(data);
      }
      console.log("indicators", data);
    }
    fetchData();
  }, [token]);

  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  const handleFilter = async (query) => {
    let aux = "";
    console.log(query);
    Object.entries(query).forEach((element) => {
      aux = aux + `${element[0]}=${element[1]}&`;
    });
    console.log("aux", aux);

    const { data, request } = await getClients(token, null, aux);
    if (request.ok) {
      setFilteredClients({ ...filteredClients, clients: data.results });
    }
    console.log('filtered results', data)
    console.log('filtered results 2', filteredClients)
  };

  const handleClear = () => {
    setFilteredClients(clients);
  };

  const handlePageChange = async (event, newPage) => {
    const newUrl = newPage > page ? clients.next : clients.previous;
    setPage(newPage);
    const { data, request } = await getClients(token, newUrl);
    setClients(data);
  };

  return (
    <DashboardLayout>
      <Card {...props}>
        <CardHeader title="Lista de Clientes" />
        <Box sx={{ width: "100%" }}>
          <Filter
            fields={[
              { title: "Nombre", field: "name", type: "text" },
              { title: "Cedula/Rif", field: "identity_card", type: "text" },
            ]}
            onFilter={handleFilter}
            onClear={handleClear}
          ></Filter>
          <TableContainer sx={{ maxHeight: "100%", width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Cedula o Rif</TableCell>
                  <TableCell>Numero de tlf</TableCell>
                  <TableCell>Direccion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClients &&
                  filteredClients.results.map((client) => (
                    <TableRow
                      hover
                      key={client.client.id}
                      onClick={() => router.push(`/client_detail/${client.client.id}`)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{client.client.name}</TableCell>
                      <TableCell>{client.client.identity_card}</TableCell>
                      <TableCell>{client.client.phone}</TableCell>
                      <TableCell>{client.client.address}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {filteredClients && (
                    <TablePagination
                      colSpan={3}
                      count={clients.count}
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
    </DashboardLayout>
  );
};

export default ClientsList;
