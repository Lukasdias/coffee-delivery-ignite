import { animated, useSpring } from "@react-spring/web";
import { Minus, Plus, ShoppingCart } from "phosphor-react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { Coffee, useCoffeeStore } from "../store/coffe";
import { Button } from "./button";

const MAX_COUNT = 10;
const MIN_COUNT = 1;

interface CoffeeCardProps {
  coffee: Coffee;
}

const Counter: FC<{
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}> = ({ increaseCount, count, decreaseCount }) => {
  return (
    <div
      className={
        "flex min-w-[72px] p-2 justify-between items-center gap-2 bg-base-button rounded-default"
      }
    >
      <button
        onClick={decreaseCount}
        disabled={count === MIN_COUNT}
        className={"group"}
      >
        <Minus
          weight={"fill"}
          className={
            "w-[14px] h-[14px] text-brand-purple-base hover:text-brand-purple-dark transition duration-200 group-disabled:text-base-subtitle"
          }
        />
      </button>
      <span className={"text-base-title"}>{count}</span>
      <button
        type={"button"}
        onClick={increaseCount}
        disabled={count === MAX_COUNT}
        className={"group"}
      >
        <Plus
          weight={"fill"}
          className={
            "w-[14px] h-[14px] text-brand-purple-base hover:text-brand-purple-dark transition duration-200 group-disabled:text-base-subtitle"
          }
        />
      </button>
    </div>
  );
};

const ShoppingCartButton: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Button
      className={
        "bg-brand-purple-dark hover:bg-brand-purple-base transition duration-200"
      }
      onClick={onClick}
    >
      <ShoppingCart
        weight={"fill"}
        className={"w-[22px] h-[22px] text-white"}
      />
    </Button>
  );
};

const CardTag = ({ tag }: { tag: string }) => {
  return (
    <span
      className={
        "bg-brand-yellow-light text-brand-yellow-dark px-2 py-1 flex justify-center items-center rounded-full text-xs font-bold"
      }
    >
      {tag}
    </span>
  );
};

export const CoffeeCard: FC<CoffeeCardProps> = memo(({ coffee }) => {
  const [count, setCount] = useState(1);
  const { description, id, name, price, tags, thumbnail } = coffee;

  const addCoffeeToChart = useCoffeeStore(
    useCallback((state) => state.addCoffeeToCart, [])
  );

  const amountOnCart = useCoffeeStore(
    useCallback(
      (state) =>
        state.shoppingCart.selectedCoffees.filter((coffee) => coffee.id === id)
          .length,
      [id]
    )
  );

  const increaseCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const decreaseCount = useCallback(() => {
    setCount((prevCount) => prevCount - 1);
  }, []);

  const onCoffeeAdd = useCallback(() => {
    for (let i = 0; i < count; i++) {
      addCoffeeToChart(coffee);
    }
    setCount(1);
  }, [count, coffee]);

  return (
    <div
      className={
        "rounded-tl-xs py-[74px] mt-[74px] max-w-[265px] rounded-tr-xl rounded-bl-xl rounded-br-xs bg-base-card px-5 pb-5 relative flex flex-col"
      }
    >
      <div className={"absolute -top-2 -right-2"}>
        {amountOnCart > 0 && <CardTag tag={amountOnCart.toString()} />}
      </div>
      <img
        src={thumbnail}
        alt={name}
        className={
          "w-[120px] h-[120px] absolute -top-14 left-1/2 translate-x-[-50%]"
        }
      />
      <div className={"flex flex-wrap w-full mb-4 gap-1 justify-center"}>
        {tags.map((tag) => (
          <CardTag tag={tag} />
        ))}
      </div>
      <span
        className={
          "font-baloo-2 text-xl text-base-subtitle font-bold mb-2 text-center"
        }
      >
        {name}
      </span>
      <span className={"text-base-label mb-8 text-center"}>{description}</span>
      <div className={"gap-6 w-full flex mt-auto"}>
        <div className={"flex items-center gap-1"}>
          <span className={"text-base-text"}>R$</span>
          <span className={"text-base-text font-bold font-baloo-2 text-2xl"}>
            {price}
          </span>
        </div>
        <div className={"flex gap-3 ml-auto"}>
          <Counter
            count={count}
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
          />
          <ShoppingCartButton onClick={onCoffeeAdd} />
        </div>
      </div>
    </div>
  );
});
