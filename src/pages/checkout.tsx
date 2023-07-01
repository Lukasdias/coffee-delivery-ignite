import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CheckoutForm from "../components/checkout-form";
import CheckoutOverview from "../components/checkout-overview";
import { ContentContainer } from "../components/content.container";

export const CheckoutFormSchema = z.object({
  cep: z.string().min(1, {
    message: "CEP deve conter pelo menos 1 caractere",
  }),
  street: z.string().min(1, {
    message: "Rua deve conter pelo menos 1 caractere",
  }),
  number: z.number().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, {
    message: "Bairro deve conter pelo menos 1 caractere",
  }),
  city: z.string().min(1, {
    message: "Cidade deve conter pelo menos 1 caractere",
  }),
  state: z.string(),
  paymentMethod: z.enum(["credit", "debit", "money"]),
});

export type CheckoutFormData = z.infer<typeof CheckoutFormSchema>;

export function Checkout() {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      cep: "90250-440",
      street: "Rua João Daniel Martinelli",
      number: 102,
      complement: "",
      neighborhood: "Farrapos",
      city: "Porto Alegre",
      state: "RS",
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
