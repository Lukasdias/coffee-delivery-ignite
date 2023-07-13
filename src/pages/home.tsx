import { useEffect } from "react";
import { CoffeeList } from "../components/coffee-list";
import { Presentation } from "../components/presentation";
import { useCoffeesQuery } from "../services/queries";
import { useCoffeeCart } from "../store/coffee-cart";

type Props = {};

export function Home({}: Props) {
    const [coffeeList] = useCoffeeCart((store) => [
        store.state.availableCoffees,
    ]);

    const { error, loading } = useCoffeesQuery();

    return (
        <div className={"w-full text-brand-purple-base"}>
            <Presentation />
            <CoffeeList
                coffeeList={coffeeList}
                error={error}
                isLoading={loading}
            />
        </div>
    );
}
