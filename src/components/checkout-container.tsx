import React from "react";

interface Props {
  children: React.ReactNode;
}

export function CheckoutContainer({ children }: Props) {
  return (
    <div
      className={
        "rounded-tl-xs rounded-tr-xl rounded-bl-xl rounded-br-xs bg-base-card relative flex flex-col p-10 w-full"
      }
    >
      {children}
    </div>
  );
}
