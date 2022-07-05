import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StoreHeader from "./components/StoreHeader";
import RemoteControls from "./components/RemoteControls";
import RemoteComponent from "./components/RemoteComponent";
import RemotesProvider from "./context/remotes";
export const App = () => {
  return (
    <RemotesProvider>
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
                    <RemoteComponent
                      fallback="Loading..."
                      remote="CART"
                      component="CheckoutPage"
                    />
                  }
                />
              </Routes>
            </div>
          </>
        </BrowserRouter>
      </div>
    </RemotesProvider>
  );
};
export default App;
