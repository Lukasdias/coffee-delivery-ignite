import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CheckoutForm from "../components/checkout-form";
import CheckoutOverview from "../components/checkout-overview";
import { ContentContainer } from "../components/content.container";

export const CheckoutFormSchema = z.object({
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  paymentMethod: z.enum(["credit", "debit", "money"]),
});

const useOnChangeInput = (input: string, setInput: (value: string) => void) => {
  return useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [input]
  );
};

export type CheckoutFormData = z.infer<typeof CheckoutFormSchema>;

export function Checkout() {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutFormSchema),
    delayError: 3000,
    resetOptions: {
      keepErrors: false,
      keepDirtyValues: false,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    },
    defaultValues: {
      cep: "90250-440",
      street: "Rua João Daniel Martinelli",
      number: "102",
      complement: "",
      neighborhood: "Farrapos",
      city: "Porto Alegre",
      state: "RS",
      paymentMethod: "credit",
    },
  });

  // const [cep, setCEP] = useState("");
  // const [street, setStreet] = useState("");
  // const [neighborhood, setNeighborhood] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [number, setNumber] = useState("");
  // const [complement, setComplement] = useState("");
  // const [paymentMethod, setPaymentMethod] = useState<
  //   "credit" | "debit" | "money"
  // >("credit");

  // const handleCEPChange = useOnChangeInput(cep, setCEP);
  // const handleStreetChange = useOnChangeInput(street, setStreet);
  // const handleNeighborhoodChange = useOnChangeInput(
  //   neighborhood,
  //   setNeighborhood
  // );
  // const handleCityChange = useOnChangeInput(city, setCity);
  // const handleStateChange = useOnChangeInput(state, setState);
  // const handleNumberChange = useOnChangeInput(number, setNumber);
  // const handleComplementChange = useOnChangeInput(complement, setComplement);
  // const handlePaymentMethodChange = (v: "credit" | "debit" | "money") => {
  //   setPaymentMethod(v);
  // };

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <ContentContainer>
      <div
        className={
          "w-full flex flex-col lg:flex-row gap-8 mt-10 lg:justify-between"
        }
      >
        <CheckoutForm form={form} />
        <CheckoutOverview onConfirmPurchase={onSubmit} />
      </div>
    </ContentContainer>
  );
}
