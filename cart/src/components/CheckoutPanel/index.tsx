import React, { FC } from "react";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import useStore from "../../store";
import RemoteComponent from "../../../../main/src/components/RemoteComponent";
// Importing components and list of products from products app directly
// to simplify import/export. Products list should be taken care of by a communication layer
// And the ProductCard should be a published npm package or shared remote but need
// to figure out how to load multiple versions of the same remote in 1 app.
import products from "../../../../products/src/products";

type PriceMap = Record<string, number>;
// @ts-ignore
const priceMap: PriceMap = products.reduce((acc: PriceMap, cur: Product) => {
  return { ...acc, [cur.name]: cur.price };
}, {});

type Props = {
  onClose: () => void;
};

type Product = {
  name: string;
  price?: number;
  quantity?: number;
};

// TODO: How to do in-browser routing if using different verisons of react-router-dom
export const CheckoutPanel: FC<Props> = ({ onClose }) => {
  // @ts-ignore
  const cart = useStore((store) => store.cart);
  const navigate = useNavigate();
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product: Product = cart[i];
    total = total + (product?.quantity || 1) * priceMap[product.name];
  }
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
      <p>Total: ${total.toFixed(2)}</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {cart.map(({ name, quantity }) => (
          <div key={name} style={{ margin: 20 }}>
            <RemoteComponent
              fallback="Loading..."
              remote="PRODUCTS"
              component="ProductCard"
              name={name}
              quantity={quantity}
              cartView
              price={name in priceMap ? priceMap[name] : 0}
            />
          </div>
        ))}
        {cart.length === 0 && <p>No items in cart</p>}
      </div>
    </div>
  );
};

export default CheckoutPanel;
