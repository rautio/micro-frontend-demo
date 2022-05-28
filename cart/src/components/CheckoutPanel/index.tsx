import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ErrorBoundary from "../ErrorBoundary";
import useStore from "../../store";
// @ts-ignore
// const products = import("PRODUCTS/products");
// @ts-ignore
const ProductCard = React.lazy(() => import("PRODUCTS/ProductCard"));

type Props = {
  onClose: () => void;
};

// TODO: How to do in-browser routing if using different verisons of react-router-dom
export const CheckoutPanel: FC<Props> = ({ onClose }) => {
  const cart = useStore((store) => store.cart);
  const navigate = useNavigate();
  return (
    <div style={{ minWidth: 200 }}>
      <h2 style={{ textAlign: "center" }}>Cart</h2>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            onClose();
            navigate("checkout");
          }}
        >
          Checkout
        </Button>
      </div>
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
