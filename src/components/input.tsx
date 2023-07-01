import clsx from "clsx";
import React, { MutableRefObject, forwardRef } from "react";

interface InputProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange" | "placeholder"
  > {
  floatLabel?: boolean;
  maxSize?: number;
}

export const Input = forwardRef<
  MutableRefObject<React.InputHTMLAttributes<HTMLInputElement>>,
  InputProps
>(({ floatLabel, maxSize, onChange, placeholder, type, value }) => {
  return (
    <div
      className={clsx(
        "relative flex flex-col",
        maxSize ? `max-w-[${maxSize}px]` : "w-full"
      )}
    >
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={floatLabel ? "" : "Opcional"}
        className={clsx(
          "flex-1 items-center justify-start p-3 text-xs placeholder:text-base-label active:border-brand-yellow-dark focus:border-brand-yellow-dark border-2  outline-none rounded-default transition duration-200 bg-base-input",
          floatLabel && "pr-10",
          maxSize ? `max-w-[${maxSize}px]` : "w-full"
        )}
      />
      {floatLabel && (
        <span className="text-base-label text-xs absolute top-1/2 right-4 -translate-y-1/2">
          Opcional
        </span>
      )}
    </div>
  );
});
