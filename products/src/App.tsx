import React from "react";
import Button from "./Button";
import ProductsList from "./components/ProductsList";

const Cart = React.lazy(
  // @ts-ignore
  () => import("CART/Cart")
);

export const App = () => {
  return (
    <div>
      <h1>Products</h1>
      <Button />
      <ProductsList />
      <React.Suspense fallback="Loading Button">
        <Cart />
      </React.Suspense>
    </div>
  );
};

export default App;
