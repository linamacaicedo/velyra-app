type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
};

function Button({
  children,
  onClick,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        h-14
        rounded-2xl
        bg-gradient-to-r
        from-[#574BFF]
        to-[#7A52FF]
        text-white
        text-lg
        font-semibold
        shadow-lg
        transition-all
        duration-300
        hover:opacity-95
        ${fullWidth ? "w-full" : "px-6"}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
