import clsx from "clsx";
import {
  Coffee,
  CurrencyDollar,
  IconProps,
  MapPin,
  Package,
  ShoppingCart,
  Timer,
} from "phosphor-react";

interface Props {
  icon: "pin" | "coffee" | "package" | "shopping-cart" | "timer" | "money";
  color:
    | "purple"
    | "light-purple"
    | "yellow"
    | "light-yellow"
    | "black"
    | "dark-yellow";
}

export const Bubble = ({ ...props }: Props) => {
  const { icon, color } = props;
  const Icons: Record<
    (typeof props)["icon"],
    React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >
  > = {
    pin: MapPin,
    timer: Timer,
    "shopping-cart": ShoppingCart,
    coffee: Coffee,
    money: CurrencyDollar,
    package: Package,
  };
  const Icon = Icons[icon];
  return (
    <div
      className={clsx(
        "w-[24px] h-[24px] p-5 relative rounded-full",
        color === "purple" && "bg-brand-purple-base",
        color === "light-purple" && "bg-brand-purple-light",
        color === "yellow" && "bg-brand-yellow-base",
        color === "light-yellow" && "bg-brand-yellow-light",
        color === "dark-yellow" && "bg-brand-yellow-dark",
        color === "black" && "bg-base-text"
      )}
    >
      <Icon
        weight={"fill"}
        className={
          "w-4 h-4 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }
      />
    </div>
  );
};
