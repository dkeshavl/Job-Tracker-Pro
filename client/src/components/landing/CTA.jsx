import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">

      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(255,255,255,0.05)]
        "
      >

        {/* Soft Glow */}

        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent"></div>

        {/* Decorative Circles */}

        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>

        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>

        <div className="relative px-8 py-20 md:px-16 text-center">

          {/* Badge */}

          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            Ready to organize your job search?
          </span>

          {/* Heading */}

          <h2 className="mt-8 text-4xl md:text-6xl font-bold leading-tight">
            Stop Using
            <span className="text-zinc-400"> Spreadsheets</span>

            <br />

            Start Tracking Smarter
          </h2>

          {/* Description */}

          <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-zinc-400">
            Manage every application, interview, salary offer and reminder
            from one clean dashboard built specifically for job seekers.
          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-8
                py-4
                font-semibold
                text-black
                hover:bg-zinc-200
                transition
              "
            >
              Get Started Free

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                px-8
                py-4
                hover:bg-white/5
                transition
              "
            >
              Login
            </Link>

          </div>

          {/* Bottom Text */}

          <p className="mt-8 text-sm text-zinc-500">
            No credit card • Free forever • Secure authentication
          </p>

        </div>

      </div>

    </section>
  );
}

export default CTA;