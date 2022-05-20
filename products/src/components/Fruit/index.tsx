import React, { FC } from "react";

import GrapeFruit from "./images/grapefruit.jpg";
import Apple from "./images/apple.jpg";
import Banana from "./images/bananas.jpg";
import FruitBowl from "./images/bowl_fruit1.jpg";
import Guava from "./images/guava.jpg";
import PassionFruit from "./images/passion_fruit.jpg";
import Pineapple from "./images/pineapple1.jpg";
import Pomegranite from "./images/pomegranite.jpg";
import Watermelon from "./images/watermelon.jpg";
import NoImage from "./images/no-image.png";

interface Props {
  name: string;
  width?: string;
  height?: string;
}

export const Fruit: FC<Props> = ({ name, width = "200", height }) => {
  let imgSrc = "";
  switch (name) {
    case "Grapefruit":
      imgSrc = GrapeFruit;
      break;
    case "Apple":
      imgSrc = Apple;
      break;
    case "Banana":
      imgSrc = Banana;
      break;
    case "FruitBowl":
      imgSrc = FruitBowl;
      break;
    case "Guava":
      imgSrc = Guava;
      break;
    case "PassionFruit":
      imgSrc = PassionFruit;
      break;
    case "Pineapple":
      imgSrc = Pineapple;
      break;
    case "Pomegranite":
      imgSrc = Pomegranite;
      break;
    case "Watermelon":
      imgSrc = Watermelon;
      break;
    default:
      imgSrc = NoImage;
  }
  return <img width={width} height={height || width} src={imgSrc} alt={name} />;
};

export default Fruit;
