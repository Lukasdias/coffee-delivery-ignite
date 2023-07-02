import { ContentContainer } from "../components";
import { Bubble } from "../components/bubble";
import Illustration from "/public/images/illustration-success.svg";

type Props = {};

export function Success({}: Props) {
  return (
    <ContentContainer>
      <section className="flex w-full h-full justify-center items-center">
        <div className={"flex flex-1 gap-2"}>
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-brand-yellow-dark">
              Uhu! Pedido confirmado
            </h1>
            <span className="text-lg">
              Agora é só aguardar que logo o café chegará até você
            </span>
            <RequestOverview />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-start">
          <img
            src={Illustration}
            alt="Ilustração"
            className="w-full max-w-[492px] h-[293px]"
          />
        </div>
      </section>
    </ContentContainer>
  );
}

const RequestOverview = () => {
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
              Entregar em: Rua João Daniel Martinelli, 102
            </span>
            <span className={"text-base-text font-bold"}>
              Farrapos - Porto Alegre, RS
            </span>
          </span>
        </div>
        <div className="flex gap-3">
          <Bubble color="yellow" icon="timer" />
          <span className="flex flex-col">
            <span className={"text-base-text"}>Previsão de entrega</span>
            <span className={"text-base-text font-bold"}>
              30 minutos a 1 hora
            </span>
          </span>
        </div>
        <div className="flex gap-3">
          <Bubble color="dark-yellow" icon="money" />
          <span className="flex flex-col">
            <span className={"text-base-text"}>Pagamento na entrega </span>
            <span className={"text-base-text font-bold"}>
              Cartão de Crédito
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
