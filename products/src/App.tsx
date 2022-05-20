import React from "react";
import Button from "./Button";

export const App = () => {
  console.log({ url: window.location.href });
  return (
    <div>
      <h1>Products</h1>
      <Button />
    </div>
  );
};

export default App;
