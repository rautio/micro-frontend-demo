import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RemoteComponent from "../RemoteComponent";

// TODO: Cart doesn't work. Circular issue with loading products within Cart?
React.lazy(
  // @ts-ignore
  () => import("CART/Cart")
);

const StoreHeader = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Fruit Store
          </Typography>
          <RemoteComponent remote="CART" component="Cart" />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default StoreHeader;
