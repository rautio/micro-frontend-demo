import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StoreHeader from "./components/StoreHeader";
import RemoteControls from "./components/RemoteControls";
import RemoteWrapper from "./components/RemoteWrapper";
// @ts-ignore
const CheckoutPage = React.lazy(() => import("CART/CheckoutPage"));
// @ts-ignore
const Products = React.lazy(() => import("PRODUCTS/ProductsList"));
export const App = () => {
  return (
    <>
      <Header />
      <RemoteControls />
      <div style={{ margin: "10px", border: "1px solid black" }}>
        <StoreHeader />
        <div style={{ marginTop: 40 }}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <RemoteWrapper fallback="Loading Products...">
                    <Products />
                  </RemoteWrapper>
                }
              />
              <Route
                path="/checkout"
                element={
                  <RemoteWrapper fallback="Loading...">
                    <CheckoutPage />
                  </RemoteWrapper>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};
export default App;
