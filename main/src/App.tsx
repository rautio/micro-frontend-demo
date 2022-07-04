import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StoreHeader from "./components/StoreHeader";
import RemoteControls from "./components/RemoteControls";
import RemoteWrapper from "./components/RemoteWrapper";
import RemoteComponent from "./components/RemoteComponent";
// @ts-ignore
const CheckoutPage = React.lazy(() => import("CART/CheckoutPage"));
export const App = () => {
  return (
    <>
      <Header />
      <RemoteControls />
      <div style={{ margin: "10px", border: "1px solid black" }}>
        <BrowserRouter>
          <>
            <StoreHeader />
            <div style={{ marginTop: 40 }}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <RemoteComponent
                      fallback="Loading Products..."
                      remote="PRODUCTS"
                      component="ProductsList"
                    />
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
            </div>
          </>
        </BrowserRouter>
      </div>
    </>
  );
};
export default App;
