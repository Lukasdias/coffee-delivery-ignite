import shortid from "shortid";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import shallow from "zustand/shallow";
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

export type Address = {
  cep: string;
  street: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  uf: string;
};

export type AddressActions = {
  setAddress: (address: Address) => void;
};

export type Coffee = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: CoffeeVariants[];
  thumbnail: string;
};

export type CoffeeActions = {
  addCoffee: (coffee: Coffee) => void;
  editCoffee: (id: string, coffee: Coffee) => void;
  removeCoffee: (id: string) => void;
};

export type ShoppingCartState = {
  selectedCoffees: Coffee[];
  finalPrice: number;
};

export type ShoppingCartActions = {
  addCoffeeToCart: (coffee: Coffee) => void;
  editCoffeeFromCart: (id: string, coffee: Coffee) => void;
  removeCoffeeFromCart: (id: string) => void;
  clearCart: () => void;
};

export type Store = {
  address: Address;
  shoppingCart: ShoppingCartState;
  availableCoffees: Coffee[];
};

export type CoffeeStore = Store &
  CoffeeActions &
  ShoppingCartActions &
  AddressActions;

export const useCoffeeStore = create(
  devtools(
    persist<CoffeeStore>(
      (set, get) => ({
        address: {} as Address,
        setAddress: (address) => {
          set((state) => ({
            ...state,
            address,
          }));
        },
        shoppingCart: {
          selectedCoffees: [],
          finalPrice: 0,
        },
        addCoffeeToCart: (coffee) => {
          set((state) => ({
            ...state,
            shoppingCart: {
              ...state.shoppingCart,
              selectedCoffees: [...state.shoppingCart.selectedCoffees, coffee],
              finalPrice: state.shoppingCart.finalPrice + coffee.price,
            },
          }));
        },
        editCoffeeFromCart: (id, coffee) => {
          set((state) => ({
            ...state,
            shoppingCart: {
              ...state.shoppingCart,
              selectedCoffees: state.shoppingCart.selectedCoffees.map((c) =>
                c.id === id ? coffee : c
              ),
              finalPrice: state.shoppingCart.finalPrice + coffee.price,
            },
          }));
        },
        removeCoffeeFromCart: (id) => {
          const coffee = get().shoppingCart.selectedCoffees.find(
            (c) => c.id === id
          );
          const price = coffee?.price ?? 0;
          set((state) => ({
            ...state,
            shoppingCart: {
              ...state.shoppingCart,
              selectedCoffees: state.shoppingCart.selectedCoffees.filter(
                (c) => c.id !== id
              ),
              finalPrice: state.shoppingCart.finalPrice - price,
            },
          }));
        },
        clearCart: () => {
          set((state) => ({
            ...state,
            shoppingCart: {
              selectedCoffees: [],
              finalPrice: 0,
            },
          }));
        },
        availableCoffees: [],
        addCoffee: (coffee) => {
          set((state) => ({
            ...state,
            availableCoffees: [...state.availableCoffees, coffee],
          }));
        },
        editCoffee: (id, coffee) => {
          set((state) => ({
            ...state,
            availableCoffees: state.availableCoffees.map((c) =>
              c.id === id ? coffee : c
            ),
          }));
        },
        removeCoffee: (id) => {
          set((state) => ({
            ...state,
            availableCoffees: state.availableCoffees.filter((c) => c.id !== id),
          }));
        },
      }),
      {
        name: "@Coffee-Store",
        getStorage: () => localStorage,
      }
    )
  )
);

export const addCoffee = (coffee: Coffee) => {
  useCoffeeStore.getState().addCoffee(coffee);
};

export const editCoffee = (id: string, coffee: Coffee) => {
  useCoffeeStore.getState().editCoffee(id, coffee);
};

export const removeCoffee = (id: string) => {
  useCoffeeStore.getState().removeCoffee(id);
};

export const addAvailableCoffees = (coffees: Coffee[]) => {
  useCoffeeStore.setState({ availableCoffees: coffees });
};
