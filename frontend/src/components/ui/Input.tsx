import type { InputHTMLAttributes } from "react";

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="
        w-full
        h-12
        px-4
        rounded-xl
        border
        border-[#D6CCFF]
        bg-white
        text-[#2D1B69]
        placeholder:text-[#8E8AAE]
      "
    />
  );
}

export default Input;
