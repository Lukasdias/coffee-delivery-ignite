import { useMemo } from "react";
import { useCoffeeStore } from "../store/coffee-delivery";
import { formatToBrazilianCurrency } from "../utils";
import { Button } from "./button";
import { CheckoutContainer } from "./checkout-container";
import { Divider } from "./divider";
import { ShoppingCardItem } from "./shopping-cart-item";

type Props = {
  onConfirmPurchase: () => void;
};

export function CheckoutOverview({ onConfirmPurchase }: Props) {
  const [cart, addCoffeeToCart, removeCoffeeFromCart, editCoffeeFromCart] =
    useCoffeeStore((store) => [
      store.state.shoppingCart,
      store.actions.addCoffeeToCart,
      store.actions.removeCoffeeFromCart,
      store.actions.editCoffeeFromCart,
    ]);

  const parsedCart = useMemo(
    () => Object.entries(cart.coffees).map(([id, coffee]) => coffee),
    [cart]
  );

  const totalItemsPrice = useMemo(
    () =>
      Object.entries(cart.coffees).reduce(
        (acc, [_, coffee]) => acc + coffee.qty * coffee.price,
        0
      ),
    [cart]
  );

  const deliveryTax = useMemo(() => totalItemsPrice * 0.05, [totalItemsPrice]);

  return (
    <div className={"flex flex-col gap-2 items-start w-full max-w-lg"}>
      <span className={"font-baloo-2 font-bold text-lg"}>
        Cafés selecionados
      </span>
      <CheckoutContainer>
        <section className={"flex flex-col gap-2"}>
          {Object.entries(cart.coffees).length > 0 ? (
            <section className="flex-1  w-full flex flex-col max-h-[225px] overflow-y-auto overflow-x-hidden">
              {parsedCart.map((coffee, index) => (
                <div
                  key={`${coffee.id}-${index}`}
                  className="flex flex-col gap-2"
                >
                  <ShoppingCardItem
                    item={coffee}
                    qty={coffee.qty ?? 0}
                    onEditCoffeeFromCart={editCoffeeFromCart}
                  />
                  <Divider />
                </div>
              ))}
            </section>
          ) : (
            <>
              <section className="flex justify-center align-center">
                <span className={"font-baloo-2 font-bold text-lg"}>
                  Nenhum café selecionado
                </span>
              </section>
            </>
          )}
          {Object.entries(cart.coffees).length > 0 && (
            <div className="flex flex-col gap-2 p-2 w-full my-auto">
              <span className={"flex-1 justify-between flex"}>
                <div>Total de itens</div>
                <div>{formatToBrazilianCurrency(totalItemsPrice)}</div>
              </span>
              <span className={"flex-1 justify-between flex"}>
                <div>Taxa de entrega</div>
                <div>{formatToBrazilianCurrency(deliveryTax)}</div>
              </span>
              <span className={"flex-1 justify-between flex"}>
                <div>Total </div>
                <span className="text-lg font-bold">
                  {formatToBrazilianCurrency(totalItemsPrice + deliveryTax)}
                </span>
              </span>
              <Button
                className="bg-brand-yellow-base hover:bg-brand-yellow-dark transition-all duration-200 mt-4"
                onClick={onConfirmPurchase}
                disabled={Object.entries(cart.coffees).length === 0}
              >
                <span className="text-lg text-white font-bold">
                  CONFIRMAR PEDIDO
                </span>
              </Button>
            </div>
          )}
        </section>
      </CheckoutContainer>
    </div>
  );
}

export default CheckoutOverview;
