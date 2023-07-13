import { ContentContainer } from "../components";
import { Bubble } from "../components/bubble";
import { useCoffeeRequestsStore } from "../store/coffee-requests";
import Illustration from "/public/images/illustration-success.svg";
import { motion } from "framer-motion";

export function Success() {
    return (
        <ContentContainer>
            <section className="flex w-full h-full justify-center items-center">
                <div className={"flex flex-1 gap-2"}>
                    <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold text-brand-yellow-dark">
                            Uhu! Pedido confirmado
                        </h1>
                        <span className="text-lg">
                            Agora é só aguardar que logo o café chegará até você
                        </span>
                        <RequestOverview />
                    </motion.div>
                </div>
                <div className="flex flex-1 flex-col justify-start">
                    <motion.img
                        src={Illustration}
                        alt="Ilustração"
                        className="w-full max-w-[492px] h-[293px]"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </section>
        </ContentContainer>
    );
}

const RequestOverview = () => {
    const [targetAddress] = useCoffeeRequestsStore((store) => [
        store.state.targetAddress,
    ]);
    return (
        <div
            className={
                "mt-10 rounded-tl-default rounded-bl-[36px] rounded-tr-[36px] rounded-br-default bg-gradient-to-r from-brand-yellow-base via-brand-yellow-dark to-brand-purple-dark p-[1px]"
            }
        >
            <div className="flex flex-col gap-8 max-w-lg justify-center items-start bg-white rounded-tl-default rounded-bl-[36px] rounded-tr-[36px] rounded-br-default p-10 ">
                <div className="flex gap-3">
                    <Bubble color="purple" icon="pin" />
                    <span className="flex flex-col">
                        <span className={"text-base-text"}>
                            Entregar em: {targetAddress?.street}{" "}
                        </span>
                        <span className={"text-base-text font-bold"}>
                            {targetAddress?.neighborhood} -{" "}
                            {targetAddress?.city}, {targetAddress?.state}
                        </span>
                    </span>
                </div>
                <div className="flex gap-3">
                    <Bubble color="yellow" icon="timer" />
                    <span className="flex flex-col">
                        <span className={"text-base-text"}>
                            Previsão de entrega
                        </span>
                        <span className={"text-base-text font-bold"}>
                            {Math.floor(Math.random() * (60 - 30) + 30)} minutos
                        </span>
                    </span>
                </div>
                <div className="flex gap-3">
                    <Bubble color="dark-yellow" icon="money" />
                    <span className="flex flex-col">
                        <span className={"text-base-text"}>
                            Pagamento na entrega{" "}
                        </span>
                        <span className={"text-base-text font-bold"}>
                            Cartão de Crédito
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};
