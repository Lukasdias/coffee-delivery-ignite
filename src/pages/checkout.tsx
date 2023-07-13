import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CheckoutForm from "../components/checkout-form";
import CheckoutOverview from "../components/checkout-overview";
import { ContentContainer } from "../components/content.container";

export const CheckoutFormSchema = z.object({
    cep: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    paymentMethod: z.enum(["credit", "debit", "money"]),
});

export type Address = z.infer<typeof CheckoutFormSchema>;

export function Checkout() {
    const form = useForm<Address>({
        resolver: zodResolver(CheckoutFormSchema),
        delayError: 3000,
        resetOptions: {
            keepErrors: false,
            keepDirtyValues: false,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
        },
        defaultValues: {
            cep: "",
            street: "",
            number: "",
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
