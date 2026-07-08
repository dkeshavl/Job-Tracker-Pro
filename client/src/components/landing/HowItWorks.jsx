import {
  UserPlus,
  BriefcaseBusiness,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up for free and add your job applications in just a few clicks.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Track Every Application",
    description:
      "Move applications through Applied, Interview, Offer and Rejected with an intuitive workflow.",
    icon: BriefcaseBusiness,
  },
  {
    number: "03",
    title: "Land Your Dream Job",
    description:
      "Monitor analytics, salary offers and interview reminders to improve your success rate.",
    icon: TrendingUp,
  },
];

function HowItWorks() {
  return (
    <section
  id="how-it-works"
  className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24"
>

      {/* Heading */}

      <div className="max-w-3xl mx-auto text-center">

        <span className="uppercase tracking-[0.3em] text-zinc-500 text-sm">
          HOW IT WORKS
        </span>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold">
          Get Started in
          <span className="text-zinc-400"> Three Simple Steps</span>
        </h2>

        <p className="mt-6 text-zinc-400 text-lg leading-8">
          Everything is designed to keep your job search organized,
          efficient and stress-free.
        </p>

      </div>

      {/* Steps */}

      <div className="mt-20 grid lg:grid-cols-3 gap-8">

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={index} className="relative">

              <div
                className="
                  h-full
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-8
                  shadow-[0_15px_60px_rgba(255,255,255,0.03)]
                  hover:border-white/20
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >

                {/* Step */}

                <div className="flex items-center justify-between mb-8">

                  <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">

                    <Icon size={26} />

                  </div>

                  <span className="text-5xl font-black text-white/10">
                    {step.number}
                  </span>

                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {step.title}
                </h3>

                <p className="text-zinc-400 leading-8">
                  {step.description}
                </p>

              </div>

              {/* Connector */}

              {index !== steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-7 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-white/10 bg-black items-center justify-center">
                  <ArrowRight size={22} className="text-zinc-500" />
                </div>
              )}

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default HowItWorks;