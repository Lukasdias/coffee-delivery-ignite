import { animated, config, useSpring } from "@react-spring/web";
import { MapPin, ShoppingCart } from "phosphor-react";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import shallow from "zustand/shallow";
import { useCoffeeStore } from "../store/coffe";
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
    (state) => state.shoppingCart.selectedCoffees.length,
    shallow
  );

  const [props, api] = useSpring(
    () => ({
      from: { num: 0, y: 50, scale: 0.2 },
      to: { num: count, y: 0, scale: 1 },
      config: config.stiff,
    }),
    [count]
  );

  return (
    <div
      className={
        "absolute -top-2 -right-2 rounded-full flex justify-center items-center bg-brand-yellow-dark w-6 h-6 overflow-hidden"
      }
    >
      <animated.text
        className={"text-sm text-white font-bold"}
        style={{
          transform: props.y.to((y) => `translateY(${y}px)`),
          transformOrigin: "center",
          scale: props.scale,
        }}
      >
        {props.num.to((n) => Math.round(n))}
      </animated.text>
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
