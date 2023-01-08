import { animated, useSpring } from "@react-spring/web";
import { FC, ReactNode } from "react";

export const ContentContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [props, api] = useSpring(
    () => ({
      from: {
        opacity: 0,
        transform: "translateY(20px)",
      },
      to: {
        opacity: 1,
        transform: "translateY(0px)",
      },
      leave: {
        opacity: 0,
        transform: "translateY(20px)",
      },
    }),
    []
  );
  return (
    <animated.div
      className={"w-full lg:w-10/12 flex justify-between mx-auto flex-col"}
      style={{
        ...props,
      }}
    >
      {children}
    </animated.div>
  );
};
