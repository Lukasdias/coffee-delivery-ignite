type ButtonVariants = "fill" | "blank";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      className={`p-3 gap-1 flex justify-center items-center duration-200 transition-all rounded-default ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
