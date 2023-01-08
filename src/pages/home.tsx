import React from "react";
import shallow from "zustand/shallow";
import { CoffeeList } from "../components/coffee-list";
import { Presentation } from "../components/presentation";
import { useCoffeeStore } from "../store/coffe";

type Props = {};

export function Home({}: Props) {
  const coffeeList = useCoffeeStore((state) => state.availableCoffees, shallow);
  return (
    <div className={"w-full text-brand-purple-base"}>
      <Presentation />
      <CoffeeList coffeeList={coffeeList} />
    </div>
  );
}
