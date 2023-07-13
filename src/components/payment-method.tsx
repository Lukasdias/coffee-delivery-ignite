import clsx from "clsx";
import {
    CreditCard,
    Bank,
    CurrencyDollarSimple,
    IconProps,
} from "phosphor-react";
import { Button } from "./button";

interface Props {
    isSelected: boolean;
    onChangePaymentMethod: (method: "credit" | "money" | "debit") => void;
    variant: "credit" | "money" | "debit";
    title: string;
}

const PaymentMethodIcon = ({
    icon,
    ...props
}: {
    icon: "credit" | "money" | "debit";
} & IconProps) => {
    if (!icon) return <></>;
    if (icon === "money") return <CurrencyDollarSimple {...props} />;
    if (icon === "credit") return <CreditCard {...props} />;
    if (icon === "debit") return <Bank {...props} />;
    return <></>;
};

export const PaymentMethodButton = ({
    onChangePaymentMethod,
    variant,
    title,
    isSelected,
}: Props) => {
    return (
        <Button
            onClick={() => onChangePaymentMethod("credit")}
            className={clsx(
                "hover:opacity-50 flex-1 justify-center items-center ",
                {
                    "border-brand-purple-base border-2 bg-opacity-20 bg-brand-purple-base":
                        isSelected,
                    "bg-base-button ": !isSelected,
                }
            )}
        >
            <PaymentMethodIcon
                icon={variant}
                className={clsx("w-4 h-4 text-brand-purple-base")}
                weight="bold"
            />
            <span className={clsx("ml-2 text-base-text text-sm")}>{title}</span>
        </Button>
    );
};
