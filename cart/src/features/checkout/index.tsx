import React from "react";
import { Link } from "react-router-dom";
import useStore from "../../store";
import ErrorBoundary from "../../components/ErrorBoundary";
// @ts-ignore
import products from "PRODUCTS/products";
// @ts-ignore
const ProductCard = React.lazy(() => import("PRODUCTS/ProductCard"));

type Product = {
  name: string;
  price?: number;
  quantity?: number;
};

type PriceMap = Record<string, number>;
const priceMap = products.reduce((acc: PriceMap, cur: Product) => {
  return { ...acc, [cur.name]: cur.price };
}, {});
export const CheckoutPage = () => {
  const cart = useStore((store) => store.cart);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product: Product = cart[i];
    total = total + (product?.quantity || 1) * priceMap[product.name];
  }
  return (
    <div>
      <Link to="/">&larr; Back</Link>
      <h1>Checkout</h1>
      <p>Total: ${total.toFixed(2)}</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {cart.map(({ name, quantity }) => (
          <div key={name} style={{ margin: 20 }}>
            <ErrorBoundary>
              <React.Suspense fallback="Loading...">
                <ProductCard
                  name={name}
                  quantity={quantity}
                  price={name in priceMap ? priceMap[name] : 0}
                />
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
