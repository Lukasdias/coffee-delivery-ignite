import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Coffee } from "./coffee-cart";
import { Address } from "../pages/checkout";

export type CoffeeRequestsStore = {
    state: CoffeeRequestsStoreState;
    actions: CoffeeRequestsStoreActions;
};

export type CoffeeRequest = {
    coffees: Coffee[];
    targetAddress: Address;
};

export type CoffeeRequestsStoreState = {
    coffeeRequests: CoffeeRequest[];
};

export type CoffeeRequestsStoreActions = {
    addCoffeeRequest: (coffeeRequest: CoffeeRequest) => void;
    removeCoffeeRequest: (coffeeRequest: CoffeeRequest) => void;
    editCoffeeRequest: (coffeeRequest: CoffeeRequest) => void;
    listCoffeeRequests: () => CoffeeRequest[];
};

export const useCoffeeRequestsStore = create(
    devtools(
        persist(
            immer<CoffeeRequestsStore>((set, get) => ({
                state: {
                    coffeeRequests: [],
                },
                actions: {
                    addCoffeeRequest: (coffeeRequest) => {
                        set((store) => {
                            store.state.coffeeRequests.push(coffeeRequest);
                        });
                    },
                    removeCoffeeRequest: (coffeeRequest) => {
                        set((store) => {
                            store.state.coffeeRequests =
                                store.state.coffeeRequests.filter(
                                    (request) => request !== coffeeRequest
                                );
                        });
                    },
                    editCoffeeRequest: (coffeeRequest) => {
                        set((store) => {
                            store.state.coffeeRequests =
                                store.state.coffeeRequests.map((request) => {
                                    if (request === coffeeRequest) {
                                        return coffeeRequest;
                                    }
                                    return request;
                                });
                        });
                    },
                    listCoffeeRequests: () => {
                        return get().state.coffeeRequests;
                    },
                },
            })),
            {
                name: "@coffee-requests",
                getStorage: () => localStorage,
                partialize(store) {
                    return {
                        state: {
                            coffeeRequests: store.state.coffeeRequests,
                        },
                    };
                },
            }
        )
    )
);

export const getterCoffeeRequestsStore = useCoffeeRequestsStore.getState;
export const setterCoffeeRequestsStore = useCoffeeRequestsStore.setState;
