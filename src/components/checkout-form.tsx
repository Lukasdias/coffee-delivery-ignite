import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  CurrencyDollarSimple,
  MapPinLine,
} from "phosphor-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./button";
import { CheckoutContainer } from "./checkout-container";
import { Input } from "./input";
type Props = {};

const schema = z.object({
  cep: z
    .string()
    .min(8, {
      message: "CEP deve conter 8 dígitos",
    })
    .max(8, {
      message: "CEP deve conter 8 dígitos",
    }),
  street: z.string().min(1, {
    message: "Rua deve conter pelo menos 1 caractere",
  }),
  number: z.number(),
  complement: z.string().min(1, {
    message: "Complemento deve conter pelo menos 1 caractere",
  }),
  neighborhood: z.string().min(1, {
    message: "Bairro deve conter pelo menos 1 caractere",
  }),
  city: z.string().min(1, {
    message: "Cidade deve conter pelo menos 1 caractere",
  }),
  state: z
    .string()
    .min(2, {
      message: "Digite somente a uf do estado",
    })
    .max(2, {
      message: "Digite somente a uf do estado",
    }),
  paymentMethod: z.enum(["credit", "debit", "money"]),
});

type CheckoutFormData = z.infer<typeof schema>;

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

export function CheckoutForm({}: Props) {
  const { register, handleSubmit, watch, formState, reset, getValues } =
    useForm<CheckoutFormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        cep: "",
        street: "",
        number: 0,
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        paymentMethod: "credit",
      },
    });

  const handleSelectPaymentMethod = (
    paymentMethod: "credit" | "money" | "debit"
  ) => {
    reset({
      ...watch(),
      paymentMethod,
    });
  };

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
            mask="99999-999"
            {...register}
          />
          <Input type={"text"} placeholder={"Rua"} {...register} />
          <div className={"flex gap-2 w-full"}>
            <Input
              type={"text"}
              placeholder={"Número"}
              maxWidth={"max-w-[175px]"}
              {...register}
            />
            <Input
              type={"text"}
              placeholder={"Complemento"}
              floatLabel
              {...register}
            />
          </div>
          <div className={"flex gap-2 w-full"}>
            <Input
              type={"text"}
              placeholder={"Bairro"}
              {...register}
              maxWidth={"max-w-[200px]"}
            />
            <Input type={"text"} placeholder={"Cidade"} {...register} />
            <Input
              type={"text"}
              placeholder={"UF"}
              {...register}
              maxWidth={"max-w-[80px]"}
            />
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
                "bg-brand-purple-base": getValues("paymentMethod") === "credit",
              }
            )}
          >
            <CreditCard
              className={clsx("w-4 h-4 text-brand-purple-base", {
                "text-white": getValues("paymentMethod") === "credit",
              })}
              weight="bold"
            />
            <span
              className={clsx("ml-2 text-base-text text-sm", {
                "text-white font-semibold":
                  getValues("paymentMethod") === "credit",
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
                "bg-brand-purple-base": getValues("paymentMethod") === "debit",
              }
            )}
          >
            <Bank
              className={clsx("w-4 h-4 text-brand-purple-base", {
                "text-white": getValues("paymentMethod") === "debit",
              })}
              weight="bold"
            />
            <span
              className={clsx("ml-2 text-base-text text-sm", {
                "text-white font-semibold":
                  getValues("paymentMethod") === "debit",
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
                "bg-brand-purple-base": getValues("paymentMethod") === "money",
              }
            )}
          >
            <CurrencyDollarSimple
              className={clsx("w-4 h-4 text-brand-purple-base", {
                "text-white": getValues("paymentMethod") === "money",
              })}
              weight="bold"
            />
            <span
              className={clsx("ml-2 text-base-text text-sm", {
                "text-white font-semibold":
                  getValues("paymentMethod") === "money",
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
