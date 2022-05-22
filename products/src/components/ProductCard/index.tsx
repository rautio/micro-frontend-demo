import React, { FC, ReactNode } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// @ts-ignore
import { useStore } from "CART/cartStore";

interface Props {
  name: string;
  price: number;
  children: ReactNode;
}

export const ProductCard: FC<Props> = ({ name, price, children }) => {
  // @ts-ignore
  const addItem = useStore((state) => state.addItem);
  // @ts-ignore
  const cart = useStore((state) => state.cart);
  console.log({ cart });
  return (
    <Card sx={{ width: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        {children}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ${price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            // @ts-ignore
            addItem({ name, price });
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
