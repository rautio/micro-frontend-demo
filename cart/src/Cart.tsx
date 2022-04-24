import React from "react";
import IconButton from "@mui/material/IconButton";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

export const Cart = () => {
  console.log("rendering cart!")
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2, marginLeft: "48px" }}
      onClick={() => {console.log("cart clicked!")}}
    >
      <ShoppingCart />
    </IconButton>
  );
};

export default Cart;
