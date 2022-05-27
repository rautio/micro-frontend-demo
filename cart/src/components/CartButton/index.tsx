import React from "react";
import IconButton from "@mui/material/IconButton";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useCartCount } from "../../store";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const Cart = () => {
  const count = useCartCount();
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="cart"
      sx={{ mr: 2, marginLeft: "48px" }}
      onClick={() => {
        console.log("cart clicked!");
      }}
    >
      <StyledBadge badgeContent={count} color="secondary">
        <ShoppingCart />
      </StyledBadge>
    </IconButton>
  );
};

export default Cart;
