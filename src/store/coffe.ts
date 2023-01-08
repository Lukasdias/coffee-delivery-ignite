import shortid from "shortid";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

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

export type ShoppingCart = {
  selectedCoffees: Coffee[];
};

export type Request = {
  id: string;
  coffees: Coffee[];
  paymentMethod: PaymentVariants;
  address: Address;
};

type RequestActions = {
  addRequest: (request: Request) => void;
  editRequest: (id: string, request: Request) => void;
  removeRequest: (id: string) => void;
};

export type Store = {
  requests: Request[];
  shoppingCart: ShoppingCart;
  availableCoffees: Coffee[];
};

export type CoffeeStore = Store & RequestActions & CoffeeActions;

function fillCoffee() {
  const coffees: Coffee[] = [];
  for (let i = 0; i < 10; i++) {
    coffees.push({
      id: shortid.generate(),
      name: `Café ${i}`,
      description: `Descrição do café ${i}`,
      price: Math.floor(Math.random() * 100),
      tags: ["TRADICIONAL", "COM LEITE"],
      thumbnail: "https://picsum.photos/200",
    });
  }
  return coffees;
}

export const useCoffeeStore = create(
  devtools(
    persist<CoffeeStore>(
      (set) => ({
        requests: [],
        shoppingCart: {
          selectedCoffees: [],
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
        addRequest: (request) => {
          set((state) => ({
            ...state,
            requests: [...state.requests, request],
          }));
        },
        editRequest: (id, request) => {
          set((state) => ({
            ...state,
            requests: state.requests.map((r) => (r.id === id ? request : r)),
          }));
        },
        removeRequest: (id) => {
          set((state) => ({
            ...state,
            requests: state.requests.filter((r) => r.id !== id),
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
