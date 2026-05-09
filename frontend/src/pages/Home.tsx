import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";

function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section
        className="
          px-6
          py-16
          max-w-7xl
          mx-auto
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-14
        "
      >
        <div className="flex-1 max-w-2xl">
          <span
            className="
              inline-block
              px-4
              py-2
              rounded-full
              bg-[#EEE8FF]
              text-[#7B61FF]
              font-medium
              mb-6
            "
          >
            Real-time audience interaction
          </span>

          <h1
            className="
              text-5xl
              lg:text-7xl
              font-black
              leading-tight
              text-[#2D1B69]
            "
          >
            Create live polls and engage your audience instantly
          </h1>

          <p
            className="
              mt-6
              text-lg
              leading-relaxed
              text-[#6D6790]
            "
          >
            Velyra Vote helps hosts create interactive voting sessions with
            real-time results for events, classrooms and live experiences.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/host/register">
              <Button>Start Hosting</Button>
            </Link>

            <Link to="/vote">
              <button
                className="
                  h-12
                  px-6
                  rounded-xl
                  border
                  border-[#CFC3FF]
                  text-[#5B3DF5]
                  font-semibold
                  bg-white
                "
              >
                Join Session
              </button>
            </Link>
          </div>
        </div>

        <div
          className="
            flex-1
            w-full
            max-w-xl
          "
        >
          <div
            className="
              w-full
              rounded-[32px]
              bg-white/70
              backdrop-blur-xl
              border
              border-white
              shadow-2xl
              p-8
            "
          >
            <div className="space-y-5">
              <div className="h-4 w-32 rounded-full bg-[#D8CCFF]" />
              <div className="h-16 rounded-2xl bg-[#F4F0FF]" />
              <div className="h-16 rounded-2xl bg-[#F4F0FF]" />
              <div className="h-16 rounded-2xl bg-[#F4F0FF]" />
              <div className="h-12 rounded-2xl bg-[#7B61FF]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
