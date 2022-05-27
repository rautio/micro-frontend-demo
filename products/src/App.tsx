import React from "react";
import ProductsList from "./components/ProductsList";
import ErrorBoundary from "./components/ErrorBoundary";

const Cart = React.lazy(
  // @ts-ignore
  () => import("CART/Cart")
);

export const App = () => {
  return (
    <div>
      <ErrorBoundary>
        <React.Suspense fallback="Loading Button">
          <Cart />
        </React.Suspense>
      </ErrorBoundary>
      <h1>Products</h1>
      <ProductsList />
    </div>
  );
};

export default App;
