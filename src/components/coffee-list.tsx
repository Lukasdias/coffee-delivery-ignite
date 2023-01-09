import { ApolloError } from "@apollo/client";
import { FC, memo } from "react";
import { Coffee } from "../store/coffe";
import { CoffeeCard } from "./coffee-card";
import { ContentContainer } from "./content.container";

interface CoffeeListProps {
  coffeeList: Coffee[];
  isLoading?: boolean;
  error?: ApolloError;
}

const CoffeeListHeader = () => {
  return (
    <h3>
      <h1 className={"text-base-subtitle font-bold text-3xl mb-14"}>
        Nossos cafés
      </h1>
    </h3>
  );
};

const EmptyCoffeeList = () => {
  return (
    <h3
      className={`
        text-2xl font-bold font-baloo-2 text-brand-purple-base animate-pulse
      `}
    >
      Sem cafés cadastrados...
    </h3>
  );
};

export const CoffeeList: FC<CoffeeListProps> = memo(
  ({ coffeeList, error, isLoading }) => {
    if (coffeeList.length === 0)
      return (
        <ContentContainer>
          <CoffeeListHeader />
          <EmptyCoffeeList />
        </ContentContainer>
      );
    return (
      <ContentContainer>
        <CoffeeListHeader />
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"}>
          {coffeeList.map((coffee) => (
            <CoffeeCard coffee={coffee} />
          ))}
        </div>
      </ContentContainer>
    );
  }
);
