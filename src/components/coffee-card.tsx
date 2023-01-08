import { FC, memo, useState } from "react";
import { Coffee, useCoffeeStore } from "../store/coffe";

interface CoffeeCardProps {
  coffee: Coffee;
}

export const CoffeeCard: FC<CoffeeCardProps> = memo(({ coffee }) => {
  const [count, setCount] = useState(1);
  const { description, id, name, price, tags, thumbnail } = coffee;
  return <>{coffee}</>;
});
