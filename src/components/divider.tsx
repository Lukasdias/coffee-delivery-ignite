import clsx from "clsx";

interface Props {
  marginTop?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  marginBottom?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

export function Divider(props: Props) {
  return (
    <div
      className={clsx(
        "h-[2px] bg-base-button w-full rounded-lg",
        props.marginTop && `mt-${props.marginTop}`,
        props.marginBottom && `mb-${props.marginBottom}`
      )}
    />
  );
}
