import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RemoteWrapper from "../RemoteWrapper";

const Cart = React.lazy(
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
          <RemoteWrapper>
            <Cart />
          </RemoteWrapper>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default StoreHeader;
