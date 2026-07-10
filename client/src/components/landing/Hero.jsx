import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 lg:pt-24 pb-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}

        <div>
          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 py-2 text-sm text-zinc-300">
            🚀 Smart Job Application Tracker
          </div>

          {/* Heading */}

          <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Take Control
            <br />
            of Your
            <span className="block text-white">Job Search</span>
          </h1>

          {/* Description */}

          <p className="mt-8 text-lg text-zinc-400 leading-8 max-w-xl">
            Organize every application, monitor interviews, track salary offers
            and visualize your progress from one modern dashboard.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-7 py-4 font-semibold hover:bg-zinc-200 transition duration-300"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>

            <button
              onClick={() =>
                document.getElementById("how-it-works")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                px-7
                py-4
                font-medium
                hover:bg-white/5
                hover:border-white/20
                hover:scale-[1.02]
                active:scale-95
                transition-all
                duration-300
            "
            >
              <PlayCircle size={20} />
              See How It Works
            </button>
          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
            <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3 sm:p-5">
              <h2 className="text-2xl sm:text-3xl font-bold">500+</h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 break-words">
                Jobs Managed
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3 sm:p-5">
              <h2 className="text-2xl sm:text-3xl font-bold">100%</h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 break-words">
                Free Forever
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3 sm:p-5">
              <h2 className="text-2xl sm:text-3xl font-bold">Secure</h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 break-words">
                JWT Authentication
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard */}

        <DashboardPreview />
      </div>
    </section>
  );
}

export default Hero;
