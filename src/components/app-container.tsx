import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";

export const AppContainer: FC = () => {
  return (
    <div
      className={
        "w-screen h-screen bg-base-background flex flex-col overflow-hidden p-8"
      }
    >
      <Header />
      <Outlet />
    </div>
  );
};
