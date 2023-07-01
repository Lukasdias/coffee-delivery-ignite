import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CheckoutFormData } from "../pages/checkout";

export type CoffeeVariants =
  | "TRADICIONAL"
  | "COM LEITE"
  | "ALCOÓLICO"
  | "ESPECIAL"
  | "GELADO";

export type PaymentVariants =
  | "DINHEIRO"
  | "CARTÃO DE DÉBITO"
  | "CARTÃO DE CRÉDITO"
  | "SEM PAGAMENTO";

export type PaymentFormSchema = {
  variant: PaymentVariants;
};

export type Coffee = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: CoffeeVariants[];
  thumbnail: string;
};

export type CoffeeOnCart = Coffee & {
  qty: number;
};

export type CoffeeActions = {
  addCoffee: (coffee: Coffee) => void;
  editCoffee: (id: string, coffee: Coffee) => void;
  removeCoffee: (id: string) => void;
};

export type ShoppingCartState = {
  coffees: {
    [key: string]: CoffeeOnCart;
  };
  finalPrice: number;
};

export type ShoppingCartActions = {
  fillCoffeePool: (coffees: Coffee[]) => void;
  addCoffeeToCart: (coffee: Coffee, qty: number) => void;
  editCoffeeFromCart: (id: string, qty: number) => void;
  removeCoffeeFromCart: (id: string) => void;
  clearCart: () => void;
  getAmountOfGivenCoffeeInCart: (id: string) => number;
  submitOrder: (address: CheckoutFormData) => void;
};

type State = {
  availableCoffees: Coffee[];
  currentRequest: {
    coffees: {
      [key: string]: CoffeeOnCart;
    } | null;
    address: CheckoutFormData | null;
  };
  shoppingCart: ShoppingCartState;
};

export type CoffeeStoreState = State;

export type CoffeeStoreActions = CoffeeActions & ShoppingCartActions;

export type CoffeeStore = {
  state: CoffeeStoreState;
  actions: CoffeeStoreActions;
};

export const useCoffeeStore = create(
  devtools(
    persist(
      immer<CoffeeStore>((set, get) => ({
        state: {
          availableCoffees: [],
          shoppingCart: {
            coffees: {},
            finalPrice: 0,
          },
          currentRequest: {
            coffees: {},
            address: null,
          },
        },
        actions: {
          getAmountOfGivenCoffeeInCart: (id) => {
            if (!get().state.shoppingCart.coffees[id]) {
              return 0;
            }
            return get().state.shoppingCart.coffees[id]?.qty;
          },
          fillCoffeePool: (coffees) => {
            set((store) => {
              if (store.state.availableCoffees.length > 0) {
                return;
              }
              store.state.availableCoffees = coffees;
            });
          },
          addCoffee: (coffee) => {
            if (get().state.availableCoffees.find((c) => c.id === coffee.id)) {
              return;
            }
            set((store) => {
              store.state.availableCoffees.push(coffee);
            });
          },
          editCoffee: (id, coffee) => {
            set((store) => {
              const index = store.state.availableCoffees.findIndex(
                (c) => c.id === id
              );
              store.state.availableCoffees[index] = coffee;
            });
          },
          removeCoffee: (id) => {
            set((store) => {
              store.state.availableCoffees =
                store.state.availableCoffees.filter((c) => c.id !== id);
            });
          },
          addCoffeeToCart: (coffee, qty) => {
            set((store) => {
              if (!store.state.shoppingCart.coffees[coffee.id]) {
                store.state.shoppingCart.coffees[coffee.id] = {
                  ...coffee,
                  qty: 0,
                };
              }
              store.state.shoppingCart.coffees[coffee.id].qty += qty;
              store.state.shoppingCart.finalPrice += coffee.price * qty;
            });
          },
          editCoffeeFromCart: (id, qty) => {
            if (!get().state.shoppingCart.coffees[id]) {
              return;
            }
            if (qty === 0) {
              get().actions.removeCoffeeFromCart(id);
            } else {
              set((store) => {
                store.state.shoppingCart.coffees[id].qty = qty;
              });
            }
          },
          removeCoffeeFromCart: (id) => {
            set((store) => {
              store.state.shoppingCart.coffees = Object.fromEntries(
                Object.entries(store.state.shoppingCart.coffees).filter(
                  ([key]) => key !== id
                )
              );
            });
          },
          clearCart: () => {
            set((store) => {
              store.state.shoppingCart.coffees = {};
              store.state.shoppingCart.finalPrice = 0;
            });
          },
          submitOrder: (address) => {
            if (Object.keys(get().state.shoppingCart.coffees).length === 0)
              return;
            if (!address) return;
            set((store) => {
              store.state.currentRequest.coffees =
                store.state.shoppingCart.coffees;
              store.state.currentRequest.address = address;
            });
          },
        },
      })),
      {
        name: "@Coffee-Store",
        version: 1,
        getStorage: () => localStorage,
        partialize(store) {
          return {
            state: {
              availableCoffees: store.state.availableCoffees,
              shoppingCart: store.state.shoppingCart,
            },
          };
        },
      }
    )
  )
);
