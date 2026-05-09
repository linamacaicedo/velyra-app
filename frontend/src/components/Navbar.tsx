import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-12 py-6">
      <h1 className="text-4xl font-bold tracking-wide text-[#2d1b84]">
        VELYRA
      </h1>

      <div className="flex items-center gap-5">
        <Link
          to="/login"
          className="text-[#2d1b84] font-semibold text-lg hover:text-[#6c4df6] transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="
            px-6 py-3
            rounded-2xl
            text-white
            font-semibold
            text-lg
            bg-gradient-to-r
            from-[#4f46e5]
            to-[#8b5cf6]
            shadow-lg
            hover:scale-105
            transition-all
            duration-300
          "
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
