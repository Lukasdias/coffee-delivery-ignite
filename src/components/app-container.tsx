import { FC } from "react";
import { Outlet } from "react-router-dom";

export const AppContainer: FC = () => {
  return (
    <div
      className={
        "w-screen h-screen bg-base-background flex flex-col overflow-hidden p-8"
      }
    >
      <Outlet />
    </div>
  );
};
