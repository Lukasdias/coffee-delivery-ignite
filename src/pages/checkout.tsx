import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CheckoutForm from "../components/checkout-form";
import CheckoutOverview from "../components/checkout-overview";
import { ContentContainer } from "../components/content.container";

export const CheckoutFormSchema = z.object({
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

export type CheckoutFormData = z.infer<typeof CheckoutFormSchema>;

export function Checkout() {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutFormSchema),
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

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <ContentContainer>
      <div
        className={
          "w-full flex flex-col lg:flex-row gap-8 mt-10 lg:justify-between"
        }
      >
        <CheckoutForm form={form} />
        <CheckoutOverview onConfirmPurchase={onSubmit} />
      </div>
    </ContentContainer>
  );
}
