import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import useStore from "../../store";
// @ts-ignore
// const products = import("PRODUCTS/products");
const ProductCard = React.lazy(
  // @ts-ignore
  () => import("PRODUCTS/ProductCard")
);

export const CheckoutPanel = () => {
  const cart = useStore((store) => store.cart);
  return (
    <div style={{ minWidth: 200 }}>
      <h2 style={{ textAlign: "center" }}>Cart</h2>
      <p>TODO: Link to checkout page</p>
      <p>Total: $ XX.XX</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {cart.map(({ name, quantity }) => (
          <div key={name} style={{ margin: 20 }}>
            <ErrorBoundary>
              <React.Suspense fallback="Loading...">
                <ProductCard name={name} quantity={quantity} cartView />
              </React.Suspense>
            </ErrorBoundary>
          </div>
        ))}
        {cart.length === 0 && <p>No items in cart</p>}
      </div>
    </div>
  );
};

export default CheckoutPanel;
