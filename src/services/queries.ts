import { gql, useQuery } from "@apollo/client";
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
      coffees(orderBy: title_ASC) {
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
  const { data, loading, error } = useQuery<{
    coffees: CoffeeQuery[];
  }>(GET_COFFEES);

  return { data: data?.coffees, loading, error };
};
