import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart } from "phosphor-react";
import { FC, memo, useCallback, useState } from "react";
import { Coffee, useCoffeeStore } from "../store/coffee-delivery";
import { Button } from "./button";

const MAX_COUNT = 10;
const MIN_COUNT = 1;

interface CoffeeCardProps {
  itemIndex: number;
  coffee: Coffee;
}

export const CoffeeCounter: FC<{
  minCount?: number;
  maxCount?: number;
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}> = ({
  increaseCount,
  count,
  decreaseCount,
  minCount = MIN_COUNT,
  maxCount = MAX_COUNT,
}) => {
  return (
    <div
      className={
        "flex min-w-[72px] p-2 justify-between items-center gap-2 bg-base-button rounded-default"
      }
    >
      <button
        onClick={decreaseCount}
        disabled={count === minCount}
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
        disabled={count === maxCount}
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

export const CoffeeCard: FC<CoffeeCardProps> = memo(({ coffee, itemIndex }) => {
  const [count, setCount] = useState(1);
  const { description, id, name, price, tags, thumbnail } = coffee;

  const [addCoffeeToChart, getAmountOfGivenCoffeeInCart] = useCoffeeStore(
    (store) => [
      store.actions.addCoffeeToCart,
      store.actions.getAmountOfGivenCoffeeInCart,
    ]
  );

  const amountOnCart = getAmountOfGivenCoffeeInCart(id);

  const increaseCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const decreaseCount = useCallback(() => {
    setCount((prevCount) => prevCount - 1);
  }, []);

  const onCoffeeAdd = useCallback(() => {
    addCoffeeToChart(coffee, count);
    setCount(1);
  }, [count, coffee]);

  return (
    <AnimatePresence>
      {coffee && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 200 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1 * itemIndex,
          }}
          className={
            "rounded-tl-xs py-[74px] mt-[74px] max-w-[265px] rounded-tr-xl rounded-bl-xl rounded-br-xs bg-base-card px-5 pb-5 relative flex flex-col"
          }
        >
          <div className={"absolute -top-2 -right-2"}>
            <AnimatePresence>
              {amountOnCart > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 200 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                >
                  <CardTag tag={amountOnCart.toString()} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <img
            src={thumbnail}
            alt={name}
            className={
              "w-[120px] h-[120px] absolute -top-14 left-1/2 translate-x-[-50%]"
            }
          />
          <div className={"flex flex-wrap w-full mb-4 gap-1 justify-center"}>
            {tags.map((tag, index) => (
              <CardTag key={index} tag={tag} />
            ))}
          </div>
          <span
            className={
              "font-baloo-2 text-xl text-base-subtitle font-bold mb-2 text-center"
            }
          >
            {name}
          </span>
          <span className={"text-base-label mb-8 text-center"}>
            {description}
          </span>
          <div className={"gap-6 w-full flex mt-auto"}>
            <div className={"flex items-center gap-1"}>
              <span className={"text-base-text"}>R$</span>
              <span
                className={"text-base-text font-bold font-baloo-2 text-2xl"}
              >
                {price}
              </span>
            </div>
            <div className={"flex gap-3 ml-auto"}>
              <CoffeeCounter
                count={count}
                increaseCount={increaseCount}
                decreaseCount={decreaseCount}
              />
              <ShoppingCartButton onClick={onCoffeeAdd} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
