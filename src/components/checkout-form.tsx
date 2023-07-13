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
import { Address } from "../pages/checkout";
import { Button } from "./button";
import { CheckoutContainer } from "./checkout-container";
import { Input } from "./input";
import { PaymentMethodButton } from "./payment-method";
import { AnimatePresence, motion } from "framer-motion";
import { useCoffeeRequestsStore } from "../store/coffee-requests";
import { Coffee, useCoffeeCart } from "../store/coffee-cart";

type Props = {
    form: UseFormReturn<Address>;
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

const CheckoutFormInputError = (props: {
    message: string | undefined;
    isVisible: boolean;
}) => {
    return (
        <AnimatePresence>
            {props.isVisible && (
                <motion.span
                    className={"text-red-500 text-sm"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {props.message}
                </motion.span>
            )}
        </AnimatePresence>
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

    return (
        <form className={"flex flex-col gap-2 items-start w-full"}>
            <span className={"font-baloo-2 font-bold text-lg"}>
                Complete seu pedido
            </span>
            <CheckoutContainer>
                <div className="flex items-center gap-2 mb-2 ">
                    <CheckoutFormHeader
                        title={"Endereço de entrega"}
                        subtitle={
                            "Informe o endereço onde deseja receber seu pedido"
                        }
                        icon={
                            <MapPinLine
                                className={"text-brand-yellow-dark w-6 h-6"}
                            />
                        }
                    />
                </div>
                <section className={"flex flex-col gap-2 flex-1"}>
                    <Input
                        type={"text"}
                        placeholder={"CEP"}
                        maxSize={200}
                        register={register("cep")}
                        ErrorFallback={
                            <CheckoutFormInputError
                                isVisible={!!errors.cep}
                                message={errors.cep?.message}
                            />
                        }
                    />

                    <Input
                        type={"text"}
                        placeholder={"Rua"}
                        register={register("street")}
                        ErrorFallback={
                            <CheckoutFormInputError
                                isVisible={!!errors.street}
                                message={errors.street?.message}
                            />
                        }
                    />

                    <div className={"flex gap-2 w-full"}>
                        <div>
                            <Input
                                type={"text"}
                                placeholder={"Número"}
                                maxSize={175}
                                register={register("number")}
                                ErrorFallback={
                                    <CheckoutFormInputError
                                        isVisible={!!errors.number}
                                        message={errors.number?.message}
                                    />
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                type={"text"}
                                placeholder={"Complemento"}
                                floatLabel
                                register={register("complement")}
                                ErrorFallback={
                                    <CheckoutFormInputError
                                        isVisible={!!errors.complement}
                                        message={errors.complement?.message}
                                    />
                                }
                            />
                        </div>
                    </div>
                    <div className={"flex gap-2 w-full"}>
                        <div>
                            <Input
                                type={"text"}
                                placeholder={"Bairro"}
                                register={register("neighborhood")}
                                maxSize={200}
                                ErrorFallback={
                                    <CheckoutFormInputError
                                        isVisible={!!errors.neighborhood}
                                        message={errors.neighborhood?.message}
                                    />
                                }
                            />
                        </div>
                        <div>
                            <Input
                                type={"text"}
                                placeholder={"Cidade"}
                                register={register("city")}
                                ErrorFallback={
                                    <CheckoutFormInputError
                                        isVisible={!!errors.city}
                                        message={errors.city?.message}
                                    />
                                }
                            />
                        </div>
                        <div>
                            <Input
                                type={"text"}
                                placeholder={"UF"}
                                register={register("state")}
                                ErrorFallback={
                                    <CheckoutFormInputError
                                        isVisible={!!errors.state}
                                        message={errors.state?.message}
                                    />
                                }
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
                    icon={
                        <CurrencyDollar
                            className={"text-brand-purple-base w-6 h-6"}
                        />
                    }
                />
                <div className="flex w-full flex-row justify-between gap-4">
                    <PaymentMethodButton
                        onChangePaymentMethod={() =>
                            handleSelectPaymentMethod("credit")
                        }
                        isSelected={isCreditCardSelected}
                        variant="credit"
                        title="Cartão de crédito"
                    />

                    <PaymentMethodButton
                        onChangePaymentMethod={() =>
                            handleSelectPaymentMethod("debit")
                        }
                        isSelected={isDebitCardSelected}
                        variant="debit"
                        title="Cartão de débito"
                    />

                    <PaymentMethodButton
                        onChangePaymentMethod={() =>
                            handleSelectPaymentMethod("money")
                        }
                        isSelected={isMoneySelected}
                        variant="money"
                        title="Dinheiro"
                    />
                </div>
            </CheckoutContainer>
        </form>
    );
};

export default CheckoutForm;
