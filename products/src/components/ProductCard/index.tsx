import React, { FC, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  AddShoppingCart,
  Check,
  Add,
  Remove,
  Delete,
} from "@mui/icons-material";
import Fruit from "../Fruit";

interface Props {
  name: string;
  price: number;
  cartView?: boolean;
}

interface Product {
  name: string;
  quantity?: number;
}

// @ts-ignore
const events = window.fsEvents;

export const ProductCard: FC<Props> = ({ name, price, cartView = false }) => {
  const [cart, setCart] = useState<{ name: string; quantity: number }[]>([]);
  useEffect(() => {
    // @ts-ignore
    const subID = events?.subscribe("cart", function ({ cart }) {
      setCart(cart);
    });
    return () => {
      if (subID) {
        events?.unsubscribe(subID);
      }
    };
  }, []);
  let action = (
    <Button
      size="small"
      variant="contained"
      endIcon={<AddShoppingCart />}
      sx={{ marginBottom: "40px" }}
      onClick={() => {
        events?.publish("addItem", { name, price });
      }}
    >
      Add to Cart
    </Button>
  );
  const itemIndex = cart.findIndex((product: Product) => product.name === name);
  const isItemInCart = itemIndex > -1;
  if (isItemInCart) {
    const { quantity } = cart[itemIndex];
    action = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <IconButton
            onClick={() => {
              events?.publish("removeItem", { name, quantity: 1 });
            }}
          >
            <Remove />
          </IconButton>
          {quantity}
          <IconButton
            onClick={() => {
              events?.publish("addItem", { name });
            }}
          >
            <Add />
          </IconButton>
        </div>
        <Button
          size="small"
          onClick={() => {
            events?.publish("removeItem", { name, quantity });
          }}
          endIcon={<Delete />}
        >
          Remove
        </Button>
      </div>
    );
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: cartView ? "row" : "column",
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
          {name}{" "}
          {isItemInCart && !cartView && <Check sx={{ float: "right" }} />}
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Fruit name={name} width={cartView ? "75" : "150"} />
        </div>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ${(price || 0).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>{action}</CardActions>
    </Card>
  );
};

export default ProductCard;
