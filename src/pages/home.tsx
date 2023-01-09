import React, { useEffect } from "react";
import shallow from "zustand/shallow";
import { CoffeeList } from "../components/coffee-list";
import { Presentation } from "../components/presentation";
import { useCoffeesQuery } from "../services/queries";
import { addAvailableCoffees, useCoffeeStore } from "../store/coffe";

type Props = {};

export function Home({}: Props) {
  const coffeeList = useCoffeeStore((state) => state.availableCoffees, shallow);

  const { data, error, loading } = useCoffeesQuery();
  console.log(data, error, loading);

  useEffect(() => {
    if (data) {
      addAvailableCoffees(data);
    }
  }, [data, error, loading]);

  return (
    <div className={"w-full text-brand-purple-base"}>
      <Presentation />
      <CoffeeList coffeeList={coffeeList} error={error} isLoading={loading} />
    </div>
  );
}
