import React, { FC } from "react";
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
// @ts-ignore
import { useStore } from "CART/cartStore";
import Fruit from "../Fruit";

interface Props {
  name: string;
  price: number;
}

interface Product {
  name: string;
  quantity?: number;
}

export const ProductCard: FC<Props> = ({ name, price }) => {
  // @ts-ignore
  const addItem = useStore((state) => state.addItem);
  // @ts-ignore
  const removeItem = useStore((state) => state.removeItem);
  // @ts-ignore
  const cart = useStore((state) => state.cart);
  console.log({ cart });
  let action = (
    <Button
      size="small"
      variant="contained"
      endIcon={<AddShoppingCart />}
      sx={{ marginBottom: "40px" }}
      onClick={() => {
        // @ts-ignore
        addItem({ name, price });
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
          <IconButton onClick={() => removeItem(name, 1)}>
            <Remove />
          </IconButton>
          {quantity}
          <IconButton onClick={() => addItem({ name })}>
            <Add />
          </IconButton>
        </div>
        <Button
          size="small"
          onClick={() => removeItem(name, quantity)}
          endIcon={<Delete />}
        >
          Remove from Cart
        </Button>
      </div>
    );
  }

  return (
    <Card sx={{ width: 275 }} variant="outlined">
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
          {name} {isItemInCart && <Check sx={{ float: "right" }} />}
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Fruit name={name} width="150" />
        </div>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ${price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>{action}</CardActions>
    </Card>
  );
};

export default ProductCard;
