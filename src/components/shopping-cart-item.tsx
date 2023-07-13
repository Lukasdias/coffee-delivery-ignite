import { Trash } from "phosphor-react";
import { Coffee } from "../store/coffee-cart";
import { Button } from "./button";

import { AnimatePresence, motion } from "framer-motion";
import { formatToBrazilianCurrency } from "../utils";
import { CoffeeCounter } from "./coffee-card";

interface Props {
    item: Coffee;
    qty: number;
    onEditCoffeeFromCart: (id: string, qty: number) => void;
}

export function ShoppingCardItem(props: Props) {
    const { item, qty, onEditCoffeeFromCart } = props;
    const { name, thumbnail, price } = item;

    const increaseCount = () => {
        onEditCoffeeFromCart(item.id, qty + 1);
    };

    const decreaseCount = () => {
        onEditCoffeeFromCart(item.id, qty - 1);
    };

    const totalPrice = formatToBrazilianCurrency(price * qty);

    return (
        <AnimatePresence>
            {qty > 0 && (
                <motion.div
                    className="w-full flex py-2"
                    initial={{ opacity: 0, y: 20, scale: 0.4 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.2 },
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        y: 100,
                        transition: { duration: 0.2 },
                        scale: 0.4,
                    }}
                >
                    <div className="flex w-1/6 justify-center items-center p-2">
                        <img src={thumbnail} alt={name} className="w-16 h-16" />
                    </div>
                    <div className="flex w-2/3 flex-col justify-start items-start p-2">
                        <span className="font-bold text-base-text">{name}</span>
                        <div className="flex gap-2">
                            <CoffeeCounter
                                minCount={0}
                                count={qty}
                                increaseCount={increaseCount}
                                decreaseCount={decreaseCount}
                            />
                            <Button
                                className={
                                    "bg-base-button hover:bg-brand-yellow-light transition duration-200"
                                }
                                onClick={() => onEditCoffeeFromCart(item.id, 0)}
                            >
                                <Trash
                                    weight={"fill"}
                                    className={
                                        "w-[22px] h-[22px] text-brand-purple-dark"
                                    }
                                />
                                <span className="text-xs text-base-text font-serif font-bold">
                                    REMOVER
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex w-1/6 flex-col justify-center items-center flex-1 p-2">
                        <span className="font-bold text-base-text">
                            {totalPrice}
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
