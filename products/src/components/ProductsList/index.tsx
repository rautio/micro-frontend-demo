import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "../ProductCard";

type Props = {
  name: string;
  price: number;
};

const items = [
  { name: "Grapefruit", price: 1.5 },
  { name: "Apple", price: 0.75 },
  { name: "Guava", price: 0.75 },
  { name: "PassionFruit", price: 0.75 },
  { name: "Banana", price: 0.75 },
  { name: "FruitBowl", price: 0.75 },
  { name: "Pineapple", price: 0.75 },
  { name: "Pomegranate", price: 0.75 },
  { name: "Watermelon", price: 0.75 },
];
const Product: FC<Props> = ({ name, price }) => (
  <Grid item>
    <ProductCard name={name} price={price} />
  </Grid>
);

export const ProductsList = () => {
  return (
    <Grid container direction="row" spacing={2}>
      {items.map(({ name, price }) => (
        <Product name={name} key={name} price={price} />
      ))}
    </Grid>
  );
};

export default ProductsList;
