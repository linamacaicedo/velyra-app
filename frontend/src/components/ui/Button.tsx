import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="
        h-12
        px-6
        rounded-xl
        bg-[#7B61FF]
        text-white
        font-semibold
        transition-all
        duration-200
        hover:opacity-90
        active:scale-[0.98]
      "
    >
      {children}
    </button>
  );
}

export default Button;
