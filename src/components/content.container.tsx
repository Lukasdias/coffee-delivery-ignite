import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const ContentContainer: FC<{
    children: ReactNode;
}> = ({ children }) => {
    return (
        <motion.div
            className={"w-full lg:w-10/12 flex flex-1 mx-auto flex-col"}
            initial={{
                opacity: 0,
                transform: "translateY(20px)",
            }}
            animate={{
                opacity: 1,
                transform: "translateY(0px)",
            }}
        >
            <Toaster />
            {children}
        </motion.div>
    );
};
