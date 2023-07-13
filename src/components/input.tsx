import clsx from "clsx";
import React, {
    MutableRefObject,
    RefObject,
    forwardRef,
    useImperativeHandle,
} from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { Address } from "../pages/checkout";

interface InputProps
    extends Pick<
        React.InputHTMLAttributes<HTMLInputElement>,
        "type" | "placeholder"
    > {
    floatLabel?: boolean;
    maxSize?: number;
    register: UseFormRegisterReturn<any>;
    ErrorFallback?: React.ReactNode;
}

export const Input = (props: InputProps) => {
    const { type, placeholder, floatLabel, maxSize, ErrorFallback, register } =
        props;

    return (
        <div
            className={clsx(
                "relative flex flex-col",
                maxSize ? `max-w-[${maxSize}px]` : "w-full"
            )}
        >
            <input
                type={type || "text"}
                placeholder={placeholder}
                className={clsx(
                    "flex-1 items-center justify-start p-3 text-xs placeholder:text-base-label active:border-brand-yellow-dark focus:border-brand-yellow-dark border-2  outline-none rounded-default transition duration-200 bg-base-input",
                    floatLabel && "pr-10",
                    maxSize ? `max-w-[${maxSize}px]` : "w-full"
                )}
                {...register}
            />
            {floatLabel && (
                <span className="text-base-label text-xs absolute top-1/2 right-4 -translate-y-1/2">
                    Opcional
                </span>
            )}
            {ErrorFallback ? ErrorFallback : null}
        </div>
    );
};
