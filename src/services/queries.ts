import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Coffee, CoffeeVariants } from "./../store/coffe";

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
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const { data, loading, error } = useQuery<{
    coffees: CoffeeQuery[];
  }>(GET_COFFEES, {
    onCompleted(data) {
      setCoffees(
        data?.coffees.map((coffee) => ({
          id: coffee.id,
          name: coffee.title,
          description: coffee.description,
          price: coffee.price,
          tags: coffee.tags,
          thumbnail: coffee.thumbnail.url,
        })) as Coffee[]
      );
    },
  });

  return { data: coffees, loading, error };
};
