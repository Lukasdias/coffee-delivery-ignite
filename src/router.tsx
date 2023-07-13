import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { AppContainer } from "./components/app-container";
import { Checkout } from "./pages/checkout";
import ErrorPage from "./pages/error-page";
import { Home } from "./pages/home";
import { Success } from "./pages/success";
import React from "react";

const LazyAppContainer = React.lazy(() => import("./components/app-container"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LazyAppContainer />,
        errorElement: <ErrorPage />,
        hasErrorBoundary: true,
        action: () => import("./components/app-container"),
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "checkout",
                element: <Checkout />,
            },
            {
                path: "success/:id",
                element: <Success />,
            },
        ],
    },
]);
