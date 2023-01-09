import React from "react";
import CheckoutForm from "../components/checkout-form";
import CheckoutOverview from "../components/checkout-overview";
import { ContentContainer } from "../components/content.container";

type Props = {};

export function Checkout({}: Props) {
  return (
    <ContentContainer>
      <div
        className={
          "w-full flex flex-col lg:flex-row gap-8 mt-10 lg:justify-between"
        }
      >
        <CheckoutForm />
        <CheckoutOverview />
      </div>
    </ContentContainer>
  );
}
