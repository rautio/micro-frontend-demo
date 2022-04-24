import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import ErrorBoundary from "../ErrorBoundary";

const Cart = React.lazy(
  // @ts-ignore
  () => import('CART/Cart')
);

export const Header = () => {
  console.log({ Cart });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ minHeight: "48px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {}}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Micro Frontend Demo
          </Typography>
          <ErrorBoundary>
            <React.Suspense fallback='Loading Button'>
              <Cart />
            </React.Suspense>
          </ErrorBoundary>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
