import React from "react";
import ProductCard from "../ProductCard";
import Fruit from "../Fruit";

export const ProductsList = () => {
  return (
    <ProductCard name="Grapefruit" price={1.24}>
      <Fruit name="grapefruit" />
    </ProductCard>
  );
};

export default ProductsList;
