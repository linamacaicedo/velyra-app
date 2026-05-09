import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      className="
        w-full
        h-20
        px-6
        flex
        items-center
        justify-between
      "
    >
      <Link
        to="/"
        className="
          text-2xl
          font-bold
          text-[#5B3DF5]
        "
      >
        Velyra Vote
      </Link>

      <nav className="flex items-center gap-4">
        <Link to="/host/login" className="text-[#2D1B69] font-medium">
          Login
        </Link>

        <Link to="/host/register">
          <button
            className="
              h-10
              px-5
              rounded-xl
              bg-[#7B61FF]
              text-white
              font-medium
            "
          >
            Get Started
          </button>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
