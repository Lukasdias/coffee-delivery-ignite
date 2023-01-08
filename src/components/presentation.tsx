import { animated, useSpring } from "@react-spring/web";
import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";
import { FC, useEffect } from "react";
import Blur from "./../assets/blur-background.svg";
import PresentationImageSrc from "./../assets/landing-page-cover.svg";
import { ContentContainer } from "./content.container";

interface AdvantageProps {
  icon: React.ReactNode;
  title: string;
}

const PresentationText = () => {
  return (
    <div className={"flex flex-col max-w-[588px] leading-tight gap-4"}>
      <h1 className={"text-3xl lg:text-4xl font-bold font-baloo-2"}>
        Encontre o café perfeito para qualquer hora do dia
      </h1>
      <span className={"text-base lg:text-lg text-gray-500"}>
        Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
      </span>
    </div>
  );
};

const Advantage = ({ icon, title }: AdvantageProps) => {
  return (
    <animated.div className={"flex items-center gap-4"}>
      {icon}
      <div>
        <p className={"text-gray-500"}>{title}</p>
      </div>
    </animated.div>
  );
};

const AdvantageRibbon: FC<{
  variant:
    | "bg-brand-yellow-dark"
    | "bg-base-text"
    | "bg-brand-yellow-base"
    | "bg-brand-purple-base";
  children: React.ReactNode;
}> = ({ variant, children }) => {
  const [props, api] = useSpring(() => ({
    from: { scale: 0 },
    to: { scale: 1 },
  }));
  return (
    <animated.div
      className={`flex items-center justify-center rounded-full w-8 h-8 ${variant}`}
      style={{
        transform: props.scale.to((scale) => `scale(${scale})`),
      }}
    >
      {children}
    </animated.div>
  );
};

const AdvantagesGrid = () => {
  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mt-6"}>
      <Advantage
        icon={
          <AdvantageRibbon variant={"bg-brand-yellow-dark"}>
            <ShoppingCart weight={"fill"} className={"w-4 h-4 text-white"} />
          </AdvantageRibbon>
        }
        title={"Compra simples e segura"}
      />
      <Advantage
        icon={
          <AdvantageRibbon variant={"bg-base-text"}>
            <Package weight={"fill"} className={"w-4 h-4 text-white"} />
          </AdvantageRibbon>
        }
        title={"Embalagem mantém o café intacto"}
      />
      <Advantage
        icon={
          <AdvantageRibbon variant={"bg-brand-yellow-base"}>
            <Timer weight={"fill"} className={"w-4 h-4 text-white"} />
          </AdvantageRibbon>
        }
        title={"Entrega rápida e rastreada"}
      />
      <Advantage
        icon={
          <AdvantageRibbon variant={"bg-brand-purple-base"}>
            <Coffee weight={"fill"} className={"w-4 h-4 text-white"} />
          </AdvantageRibbon>
        }
        title={"Entrega rápida e rastreada"}
      />
    </div>
  );
};

export const BlurBackground = () => {
  return (
    <img
      src={Blur}
      alt={"Blur Background"}
      className={
        "absolute top-0 left-0 w-full h-full bg-blur-background bg-contain"
      }
    />
  );
};

export const PresentationImage = () => {
  return (
    <div className={"flex flex-1 flex-col items-center justify-center"}>
      <img
        src={PresentationImageSrc}
        alt={"Presentation Image"}
        className={"max-w-[476px] max-h-[360px] w-full h-full"}
      />
    </div>
  );
};

export const Presentation = () => {
  return (
    <ContentContainer>
      <div
        className={
          "py-4 lg:py-24 w-full flex flex-col lg:flex-row relative gap-14"
        }
      >
        <div className={"flex flex-col flex-1"}>
          <PresentationText />
          <AdvantagesGrid />
        </div>
        <PresentationImage />
        {/* <BlurBackground /> */}
      </div>
    </ContentContainer>
  );
};
