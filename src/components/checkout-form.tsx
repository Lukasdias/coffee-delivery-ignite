import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinLine } from "phosphor-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
});

type CheckoutFormData = z.infer<typeof schema>;

export function CheckoutForm({}: Props) {
  const { register, handleSubmit, watch, formState, reset } =
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
      },
    });

  return (
    <div className={"flex flex-col gap-2 items-start w-full"}>
      <span className={"font-baloo-2 font-bold text-lg"}>
        Complete seu pedido
      </span>
      <CheckoutContainer>
        <div className="flex items-center gap-2 mb-2 ">
          <div className={"flex flex-col"}>
            <span className={"text-base text-base-text flex gap-2"}>
              <MapPinLine className={"text-brand-yellow-dark w-6 h-6"} />
              Endereço de entrega
            </span>
            <span className={"text-sm text-base-text flex gap-2"}>
              <div className={"flex w-6 h-6"} />
              Informe o endereço onde deseja receber seu pedido
            </span>
          </div>
        </div>
        <form className={"flex flex-col gap-2 flex-1"}>
          <Input
            type={"text"}
            placeholder={"CEP"}
            maxWidth={"max-w-[200px]"}
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
        </form>
      </CheckoutContainer>
      <CheckoutContainer>CheckoutForm 2</CheckoutContainer>
    </div>
  );
}

export default CheckoutForm;
