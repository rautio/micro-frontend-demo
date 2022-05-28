import React from "react";
import { Link } from "react-router-dom";
import useStore from "../../store";
import ErrorBoundary from "../../components/ErrorBoundary";
// @ts-ignore
const ProductCard = React.lazy(() => import("PRODUCTS/ProductCard"));

export const CheckoutPage = () => {
  const cart = useStore((store) => store.cart);
  return (
    <div>
      <Link to="/">&larr; Back</Link>
      <h1>Checkout</h1>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {cart.map(({ name, quantity }) => (
          <div key={name} style={{ margin: 20 }}>
            <ErrorBoundary>
              <React.Suspense fallback="Loading...">
                <ProductCard name={name} quantity={quantity} />
              </React.Suspense>
            </ErrorBoundary>
          </div>
        ))}
        {cart.length === 0 && <p>No items in cart</p>}
      </div>
    </div>
  );
};

export default CheckoutPage;
