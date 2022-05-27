import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "../ProductCard";
import items from "../../products";

type Props = {
  name: string;
  price: number;
};

const Product: FC<Props> = ({ name, price }) => (
  <Grid item>
    <ProductCard name={name} price={price} />
  </Grid>
);

export const ProductsList = () => {
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      sx={{ justifyContent: "center" }}
    >
      {items.map(({ name, price }) => (
        <Product name={name} key={name} price={price} />
      ))}
    </Grid>
  );
};

export default ProductsList;
