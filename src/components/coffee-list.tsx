import { ApolloError } from "@apollo/client";
import { FC, memo } from "react";
import { Coffee } from "../store/coffe";
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
    <div
      className={`
      flex flex-col items-center justify-center
    `}
    >
      <h3
        className={`
        text-2xl font-bold font-baloo-2 text-brand-purple-base animate-pulse
      `}
      >
        Sem cafés cadastrados...
      </h3>
    </div>
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
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"}>
          {coffeeList.map((coffee) => (
            <div
              className={`
          flex flex-col items-center justify-center
          bg-white rounded-lg shadow-lg
          p-4
        `}
              key={coffee.id}
            >
              <img
                src={coffee.thumbnail}
                alt={coffee.name}
                className={`
            w-24 h-24
            object-cover
            rounded-full
          `}
              />
              <h3
                className={`
            text-xl font-bold font-baloo-2 text-brand-purple-base
            mt-4
          `}
              >
                {coffee.name}
              </h3>
              <span
                className={`
            text-gray-500
          `}
              >
                {coffee.description}
              </span>
            </div>
          ))}
        </div>
      </ContentContainer>
    );
  }
);
