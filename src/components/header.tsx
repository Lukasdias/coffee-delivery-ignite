import { MapPin, ShoppingCart } from "phosphor-react";
import { Link } from "react-router-dom";
import { useCoffeeStore } from "../store/coffee-delivery";
import LogoImage from "./../assets/logo.svg";
import { Button } from "./button";
import { ContentContainer } from "./content.container";

type Props = {};

const Logo = () => {
  return (
    <Link
      to="/"
      className={
        "no-underline decoration-inherit w-40 h-12 flex hover:opacity-60 transition-all duration-200"
      }
    >
      <img
        src={LogoImage}
        alt={"Coffee Delivery Logo"}
        className={"max-w-full h-auto"}
      />
    </Link>
  );
};

const ItemsOnCart = () => {
  const count = useCoffeeStore(
    (store) => Object.entries(store.state.shoppingCart.coffees).length
  );

  return (
    <div
      className={
        "absolute -top-2 -right-2 rounded-full flex justify-center items-center bg-brand-yellow-dark w-6 h-6 overflow-hidden"
      }
    >
      <span className={"text-sm text-white font-bold"}>{count}</span>
    </div>
  );
};

const Actions = () => {
  return (
    <div className={"flex items-center gap-3"}>
      <Button
        className={"bg-brand-purple-light hover:opacity-50 w-auto lg:w-[143px]"}
      >
        <MapPin
          weight={"bold"}
          className="w-4 h-4 lg:w-6 lg:h-6 text-brand-purple-dark"
        />
        <span className={"text-xs lg:text-sm text-brand-purple-dark"}>
          São Luís, MA
        </span>
      </Button>
      <Link to="checkout" className={"no-underline decoration-inherit"}>
        <Button className={"bg-brand-yellow-light hover:opacity-50 relative"}>
          <ShoppingCart
            weight={"fill"}
            className="w-4 h-4 lg:w-6 lg:h-6 text-brand-yellow-dark"
          />
          <ItemsOnCart />
        </Button>
      </Link>
    </div>
  );
};

export const Header = (props: Props) => {
  return (
    <ContentContainer>
      <div className={"flex w-full justify-between"}>
        <Logo />
        <Actions />
      </div>
    </ContentContainer>
  );
};
