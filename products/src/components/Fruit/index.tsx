import React, { FC } from "react";

// eslint-disable-next-line
import GrapeFruit from "file-loader!./images/grapefruit.jpeg";

interface Props {
  name: string;
}

export const Fruit: FC<Props> = ({ name }) => {
  return <img width="200" height="200" src={GrapeFruit} alt={name} />;
};

export default Fruit;
