import React from "react";
import { CheckoutContainer } from "./checkout-container";

type Props = {};

export function CheckoutOverview({}: Props) {
  return (
    <div className={"flex flex-col gap-2 items-start w-full"}>
      <span className={"font-baloo-2 font-bold text-lg"}>
        Cafés selecionados
      </span>
      <CheckoutContainer>CheckoutOverview</CheckoutContainer>
    </div>
  );
}

export default CheckoutOverview;
