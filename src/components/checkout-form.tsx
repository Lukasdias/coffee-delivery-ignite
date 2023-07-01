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

export const CheckoutForm = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
    watch,
  } = form;

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
  }, [errors]);

  const onSubmit = (data: CheckoutFormData) => {
    console.log(data);
  };

  return (
    <form
      className={"flex flex-col gap-2 items-start w-full"}
      onSubmit={form.handleSubmit(onSubmit)}
    >
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
            maxSize={200}
            value={getValues("cep")}
            {...register("cep")}
          />
          {errors.cep && (
            <span className={"text-red-500 text-sm"}>{errors.cep.message}</span>
          )}
          <Input
            type={"text"}
            placeholder={"Rua"}
            value={getValues("street")}
            {...register("street")}
          />
          {errors.street && (
            <span className={"text-red-500 text-sm"}>
              {errors.street.message}
            </span>
          )}
          <div className={"flex gap-2 w-full"}>
            <div>
              <Input
                type={"text"}
                placeholder={"Número"}
                maxSize={175}
                value={getValues("number")}
                {...register("number")}
              />
              {errors.number && (
                <span className={"text-red-500 text-sm"}>
                  {errors.number.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <Input
                type={"text"}
                placeholder={"Complemento"}
                floatLabel
                value={getValues("complement")}
                {...register("complement")}
              />
              {errors.complement && (
                <span className={"text-red-500 text-sm"}>
                  {errors.complement.message}
                </span>
              )}
            </div>
          </div>
          <div className={"flex gap-2 w-full"}>
            <div>
              <Input
                type={"text"}
                placeholder={"Bairro"}
                value={getValues("neighborhood")}
                {...register("neighborhood")}
                maxSize={200}
              />
              {errors.neighborhood && (
                <span className={"text-red-500 text-sm"}>
                  {errors.neighborhood.message}
                </span>
              )}
            </div>
            <div>
              <Input
                type={"text"}
                placeholder={"Cidade"}
                value={getValues("city")}
                {...register("city")}
              />
              {errors.city && (
                <span className={"text-red-500 text-sm"}>
                  {errors.city.message}
                </span>
              )}
            </div>
            <div>
              <Input
                type={"text"}
                placeholder={"UF"}
                value={getValues("state")}
                {...register("state")}
                maxSize={80}
              />
              {errors.state && (
                <span className={"text-red-500 text-sm"}>
                  {errors.state.message}
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
    </form>
  );
};

export default CheckoutForm;
