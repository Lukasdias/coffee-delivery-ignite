import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CheckoutForm from "../components/checkout-form";
import CheckoutOverview from "../components/checkout-overview";
import { ContentContainer } from "../components/content.container";
import { Coffee, useCoffeeCart } from "../store/coffee-cart";
import { useCoffeeRequestsStore } from "../store/coffee-requests";
import { useNavigate, useNavigation } from "react-router-dom";

export const CheckoutFormSchema = z.object({
    cep: z
        .string()
        .min(8, {
            message: "CEP deve conter 8 dígitos",
        })
        .max(8, {
            message: "CEP deve conter 8 dígitos",
        }),
    street: z.string({
        description: "A rua é obrigatória",
    }),
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
        resetOptions: {
            keepDirty: false,
            keepDirtyValues: false,
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

    const [addCoffeeRequest] = useCoffeeRequestsStore((store) => [
        store.actions.addCoffeeRequest,
    ]);

    const [coffeesInsideCart, finalPrice] = useCoffeeCart((store) => [
        store.state.shoppingCart.coffees,
        store.state.shoppingCart.finalPrice,
    ]);

    const bindAddressToRequest = (address: Address) => {
        if (!address) return;

        const coffees = Object.keys(coffeesInsideCart).map((key) => {
            const coffee = coffeesInsideCart[key] as Coffee;
            return coffee;
        });

        addCoffeeRequest(
            {
                coffees,
            },
            address
        );
    };

    const navigate = useNavigate();

    const onSubmit = form.handleSubmit((data) => {
        bindAddressToRequest(data);
        navigate("/success", {});
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
