import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const { loguedUser, isAdmin } = useContext(AppContext);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="medium" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          {loguedUser && isAdmin && (
            <Typography
              color="textPrimary"
              gutterBottom
              variant="overline"
              sx={{ fontSize: "1.5rem" }}
            >
              Admin
            </Typography>
          )}

          {loguedUser && !isAdmin && (
            <Typography
              color="textPrimary"
              gutterBottom
              variant="overline"
              sx={{ fontSize: "1.5rem" }}
            >
              Vendedor: {loguedUser.name}
            </Typography>
          )}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
