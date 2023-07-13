import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import {
    Coffee,
    CoffeeVariants,
    setterCoffeeCartStore,
} from "./../store/coffee-cart";
import { toast } from "react-hot-toast";

type CoffeeQuery = {
    id: string;
    price: number;
    tags: CoffeeVariants[];
    thumbnail: {
        url: string;
    };
    title: string;
    description: string;
};

export const useCoffeesQuery = () => {
    const GET_COFFEES = gql`
        query GetCoffees {
            coffees(orderBy: title_ASC, first: 500) {
                id
                price
                tags
                thumbnail {
                    url
                }
                title
                description
            }
        }
    `;

    const { loading, error } = useQuery<{
        coffees: CoffeeQuery[];
    }>(GET_COFFEES, {
        onCompleted(data) {
            setterCoffeeCartStore((store) => {
                const coffees = data?.coffees.map((coffee) => ({
                    id: coffee.id,
                    name: coffee.title,
                    description: coffee.description,
                    price: coffee.price,
                    tags: coffee.tags,
                    thumbnail: coffee.thumbnail.url,
                })) as Coffee[];
                store.state.availableCoffees = coffees;
            });
        },
        onError(error) {
            toast.error("Erro ao carregar cafés", {
                icon: "❌",
            });
        },
    });

    return { loading, error };
};
