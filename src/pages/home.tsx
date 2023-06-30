import { useEffect } from "react";
import { CoffeeList } from "../components/coffee-list";
import { Presentation } from "../components/presentation";
import { useCoffeesQuery } from "../services/queries";
import { useCoffeeStore } from "../store/coffee-delivery";

type Props = {};

export function Home({}: Props) {
  const [coffeeList, fillCoffeePool] = useCoffeeStore((store) => [
    store.state.availableCoffees,
    store.actions.fillCoffeePool,
  ]);

  const { data: coffees, error, loading } = useCoffeesQuery();

  useEffect(() => {
    console.log("coffees", coffees);
    fillCoffeePool(coffees);
  }, [coffees]);

  return (
    <div className={"w-full text-brand-purple-base"}>
      <Presentation />
      <CoffeeList coffeeList={coffeeList} error={error} isLoading={loading} />
    </div>
  );
}
