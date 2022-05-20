import React, { FC } from "react";
import Button from "@mui/material/Button";

const ProductButton: FC = () => {
  console.log({ url: window.location.href });
  return <Button>Products Button</Button>;
};
export default ProductButton;
