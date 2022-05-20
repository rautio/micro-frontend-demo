import React, { FC } from "react";
import ProductCard from "../ProductCard";
import Fruit from "../Fruit";

type Props = {
  name: string;
  price: number;
};

const Product: FC<Props> = ({ name, price }) => (
  <ProductCard name={name} price={price}>
    <Fruit name={name} />
  </ProductCard>
);

export const ProductsList = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Product name="Grapefruit" price={1.5} />
      <Product name="Apple" price={0.75} />
      <Product name="Guava" price={0.5} />
      <Product name="PassionFruit" price={1.0} />
    </div>
  );
};

export default ProductsList;
