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
};

export type CoffeeRequestsStoreState = {
    coffeeRequests: CoffeeRequest[];
    targetAddress: Address | undefined;
};

export type CoffeeRequestsStoreActions = {
    addCoffeeRequest: (coffeeRequest: CoffeeRequest, address: Address) => void;
    removeCoffeeRequest: (coffeeRequest: CoffeeRequest) => void;
    editCoffeeRequest: (coffeeRequest: CoffeeRequest, address: Address) => void;
    listCoffeeRequests: () => CoffeeRequest[];
};

export const useCoffeeRequestsStore = create(
    devtools(
        persist(
            immer<CoffeeRequestsStore>((set, get) => ({
                state: {
                    coffeeRequests: [],
                    targetAddress: undefined,
                },
                actions: {
                    addCoffeeRequest: (coffeeRequest, address) => {
                        set((store) => {
                            store.state.coffeeRequests.push(coffeeRequest);
                            store.state.targetAddress = address;
                        });
                    },
                    removeCoffeeRequest: (coffeeRequest) => {
                        set((store) => {
                            store.state.coffeeRequests =
                                store.state.coffeeRequests.filter(
                                    (request) => request !== coffeeRequest
                                );
                            store.state.targetAddress = undefined;
                        });
                    },
                    editCoffeeRequest: (coffeeRequest, address) => {
                        set((store) => {
                            store.state.coffeeRequests =
                                store.state.coffeeRequests.map((request) => {
                                    if (request === coffeeRequest) {
                                        return coffeeRequest;
                                    }
                                    return request;
                                });
                            store.state.targetAddress = address;
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
                            targetAddress: store.state.targetAddress,
                        },
                    };
                },
            }
        )
    )
);

export const getterCoffeeRequestsStore = useCoffeeRequestsStore.getState;
export const setterCoffeeRequestsStore = useCoffeeRequestsStore.setState;
