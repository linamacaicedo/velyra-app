type InputProps = {
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ placeholder, type = "text", value, onChange }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        h-14
        px-5
        rounded-2xl
        bg-white
        border
        border-[#E6D8FF]
        outline-none
        text-[#3D2E84]
        placeholder:text-[#D4BFF5]
        text-base
        transition-all
        duration-300
        focus:border-[#7B46FF]
        focus:ring-2
        focus:ring-[#C8B3FF]
      "
    />
  );
}

export default Input;
