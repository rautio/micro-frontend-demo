import React from "react";
import { BrowserRouter } from "react-router-dom";
import Cart from "./components/CartButton";

export const App = () => {
  return (
    <BrowserRouter>
      <h1>Cart</h1>
      <Cart />
    </BrowserRouter>
  );
};

export default App;
