import React from "react";
import { CheckoutContainer } from "./checkout-container";

type Props = {};

export function CheckoutForm({}: Props) {
  return (
    <div className={"flex flex-col gap-2 items-start max-w-[640px]"}>
      <span className={"font-baloo-2 font-bold text-lg"}>
        Complete seu pedido
      </span>
      <CheckoutContainer>CheckoutForm</CheckoutContainer>
      <CheckoutContainer>CheckoutForm 2</CheckoutContainer>
    </div>
  );
}

export default CheckoutForm;
