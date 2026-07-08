import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto h-[72px] px-5 lg:px-8 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div
            className="
              w-11
              h-11
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
              flex
              items-center
              justify-center
              shadow-[0_8px_30px_rgba(255,255,255,0.04)]
              group-hover:bg-white/10
              transition
            "
          >
            <BriefcaseBusiness size={22} />
          </div>

          <div className="hidden sm:block">
            <h1 className="font-bold text-lg tracking-tight">
              Job Tracker Pro
            </h1>

            <p className="text-xs text-zinc-500">
              Track your career smarter
            </p>
          </div>
        </Link>

        {/* Buttons */}

        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="
              hidden
              sm:flex
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-5
              py-2.5
              text-sm
              hover:bg-white/6
              hover:border-white/20
              transition-all
            "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              rounded-xl
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-black
              shadow-lg
              hover:scale-105
              hover:bg-zinc-200
              transition-all
            "
          >
            Register
          </Link>

        </div>

      </div>
    </header>
  );
}

export default LandingNavbar;