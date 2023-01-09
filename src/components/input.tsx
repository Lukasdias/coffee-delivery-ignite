import React, { forwardRef, MutableRefObject } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  floatLabel?: boolean;
  maxWidth?: string;
}

export const Input = forwardRef<
  MutableRefObject<React.InputHTMLAttributes<HTMLInputElement>>,
  InputProps
>(({ ...props }) => {
  return (
    <div className={`relative flex flex-1 ${props.maxWidth}`}>
      <input
        {...props}
        className={`flex-1 items-center justify-start p-3 text-xs placeholder:text-base-label active:border-brand-yellow-dark focus:border-brand-yellow-dark border-2  outline-none rounded-default transition duration-200 bg-base-input ${
          props.maxWidth
        } ${props.floatLabel ? "pr-20" : ""}`}
      />
      {props.floatLabel && (
        <span className="text-base-label text-xs absolute top-1/2 right-4 -translate-y-1/2">
          Opcional
        </span>
      )}
    </div>
  );
});
