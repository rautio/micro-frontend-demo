import React, { FC, ReactNode } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  name: string;
  price: number;
  children: ReactNode;
}

export const ProductCard: FC<Props> = ({ name, price, children }) => {
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
        <Button size="small" variant="contained">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
