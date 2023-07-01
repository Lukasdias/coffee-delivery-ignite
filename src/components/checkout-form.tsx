import clsx from "clsx";
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  CurrencyDollarSimple,
  MapPinLine,
} from "phosphor-react";
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { CheckoutFormData } from "../pages/checkout";
import { Button } from "./button";
import { CheckoutContainer } from "./checkout-container";
import { Input } from "./input";

type Props = {
  form: UseFormReturn<CheckoutFormData>;
};

const CheckoutFormHeader = (props: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2 mb-2 ">
      <div className={"flex flex-col"}>
        <span className={"text-base text-base-text flex gap-2"}>
          {props.icon}
          {props.title}
        </span>
        <span className={"text-sm text-base-text flex gap-2"}>
          <div className={"flex w-6 h-6"} />
          {props.subtitle}
        </span>
      </div>
    </div>
  );
};

export function CheckoutForm({ form }: Props) {
  const { register, formState, getValues, setValue, clearErrors, watch } = form;

  const handleSelectPaymentMethod = (
    paymentMethod: "credit" | "money" | "debit"
  ) => {
    setValue("paymentMethod", paymentMethod);
  };

  const isCreditCardSelected = watch("paymentMethod") === "credit";
  const isDebitCardSelected = watch("paymentMethod") === "debit";
  const isMoneySelected = watch("paymentMethod") === "money";

  useEffect(() => {
    const interval = setInterval(() => {
      clearErrors();
    }, 3000);
    return () => clearInterval(interval);
  }, [formState.errors]);

  return (
    <div className={"flex flex-col gap-2 items-start w-full"}>
      <span className={"font-baloo-2 font-bold text-lg"}>
        Complete seu pedido
      </span>
      <CheckoutContainer>
        <div className="flex items-center gap-2 mb-2 ">
          <CheckoutFormHeader
            title={"Endereço de entrega"}
            subtitle={"Informe o endereço onde deseja receber seu pedido"}
            icon={<MapPinLine className={"text-brand-yellow-dark w-6 h-6"} />}
          />
        </div>
        <section className={"flex flex-col gap-2 flex-1"}>
          <Input
            type={"text"}
            placeholder={"CEP"}
            maxWidth={"max-w-[200px]"}
            {...register("cep")}
          />
          {formState.errors.cep && (
            <span className={"text-red-500 text-sm"}>
              {formState.errors.cep.message}
            </span>
          )}
          <Input type={"text"} placeholder={"Rua"} {...register} />
          {formState.errors.street && (
            <span className={"text-red-500 text-sm"}>
              {formState.errors.street.message}
            </span>
          )}
          <div className={"flex gap-2 w-full"}>
            <div>
              <Input
                type={"text"}
                placeholder={"Número"}
                maxWidth={"max-w-[175px]"}
                {...register("number")}
              />
              {formState.errors.number && (
                <span className={"text-red-500 text-sm"}>
                  {formState.errors.number.message}
                </span>
              )}
            </div>
            <div>
              <Input
                type={"text"}
                placeholder={"Complemento"}
                floatLabel
                {...register("complement")}
              />
              {formState.errors.complement && (
                <span className={"text-red-500 text-sm"}>
                  {formState.errors.complement.message}
                </span>
              )}
            </div>
          </div>
          <div className={"flex gap-2 w-full"}>
            <div>
              <Input
                type={"text"}
                placeholder={"Bairro"}
                {...register("neighborhood")}
                maxWidth={"max-w-[200px]"}
              />
              {formState.errors.neighborhood && (
                <span className={"text-red-500 text-sm"}>
                  {formState.errors.neighborhood.message}
                </span>
              )}
            </div>
            <div>
              <Input type={"text"} placeholder={"Cidade"} {...register} />
              {formState.errors.city && (
                <span className={"text-red-500 text-sm"}>
                  {formState.errors.city.message}
                </span>
              )}
            </div>
            <div>
              <Input
                type={"text"}
                placeholder={"UF"}
                {...register("state")}
                maxWidth={"max-w-[80px]"}
              />
              {formState.errors.state && (
                <span className={"text-red-500 text-sm"}>
                  {formState.errors.state.message}
                </span>
              )}
            </div>
          </div>
        </section>
      </CheckoutContainer>
      <CheckoutContainer>
        <CheckoutFormHeader
          title={"Pagamento"}
          subtitle={
            "O pagamento é feito na entrega. Escolha a forma que deseja pagar"
          }
          icon={<CurrencyDollar className={"text-brand-purple-base w-6 h-6"} />}
        />
        <div className="flex w-full flex-row justify-between gap-4">
          <Button
            onClick={() => handleSelectPaymentMethod("credit")}
            className={clsx(
              "bg-base-button hover:opacity-50 flex-1 justify-center items-center",
              {
                "bg-brand-purple-base": isCreditCardSelected,
              }
            )}
          >
            <CreditCard
              className={clsx("w-4 h-4 text-brand-purple-base", {
                "text-white": isCreditCardSelected,
              })}
              weight="bold"
            />
            <span
              className={clsx("ml-2 text-base-text text-sm", {
                "text-white font-semibold": isCreditCardSelected,
              })}
            >
              Cartão de crédito
            </span>
          </Button>
          <Button
            onClick={() => handleSelectPaymentMethod("debit")}
            className={clsx(
              "bg-base-button hover:opacity-50 flex-1 justify-center items-center",
              {
                "bg-brand-purple-base": isDebitCardSelected,
              }
            )}
          >
            <Bank
              className={clsx("w-4 h-4 text-brand-purple-base", {
                "text-white": isDebitCardSelected,
              })}
              weight="bold"
            />
            <span
              className={clsx("ml-2 text-base-text text-sm", {
                "text-white font-semibold": isDebitCardSelected,
              })}
            >
              Cartão de débito
            </span>
          </Button>
          <Button
            onClick={() => handleSelectPaymentMethod("money")}
            className={clsx(
              "bg-base-button bg-base hover:opacity-50 flex-1 justify-center items-center",
              {
                "bg-brand-purple-base": isMoneySelected,
              }
            )}
          >
            <CurrencyDollarSimple
              className={clsx("w-4 h-4 text-brand-purple-base", {
                "text-white": isMoneySelected,
              })}
              weight="bold"
            />
            <span
              className={clsx("ml-2 text-base-text text-sm", {
                "text-white font-semibold": isMoneySelected,
              })}
            >
              Dinheiro
            </span>
          </Button>
        </div>
      </CheckoutContainer>
    </div>
  );
}

export default CheckoutForm;
