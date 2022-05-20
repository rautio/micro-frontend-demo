import React from "react";
import Button from "./Button";
import ProductsList from "./components/ProductsList";

export const App = () => {
  return (
    <div>
      <h1>Products</h1>
      <Button />
      <ProductsList />
    </div>
  );
};

export default App;
