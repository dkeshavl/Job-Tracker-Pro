import {
  LayoutDashboard,
  BarChart3,
  Clock3,
  CircleDollarSign,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Drag & Drop Kanban Board",
    description:
      "Organize every application with an intuitive Kanban board and move jobs between stages effortlessly.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Visualize applications, interviews, offers and rejection rates with beautiful charts.",
  },
  {
    icon: Clock3,
    title: "Interview Reminders",
    description:
      "Receive countdown timers and automated email reminders so you never miss an interview.",
  },
  {
    icon: CircleDollarSign,
    title: "Salary Tracking",
    description:
      "Track salary expectations, compare offers and search opportunities easily.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "JWT authentication, email verification and complete account control keep your data safe.",
  },
];

function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      {/* Heading */}

      <div className="text-center max-w-3xl mx-auto">

        <span className="uppercase tracking-[0.2em] text-zinc-400 text-sm font-medium">
          FEATURES
        </span>

        <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
          Everything You Need
        </h2>

        <p className="mt-6 text-lg text-zinc-400 leading-8">
          A complete toolkit to organize applications, manage interviews,
          monitor progress and land your next opportunity.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-8 mt-20 md:grid-cols-2 lg:grid-cols-3">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-white/20
                hover:bg-white/[0.05]
                shadow-[0_10px_40px_rgba(255,255,255,0.03)]
              "
            >
              {/* Glow */}

              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}

              <div className="relative z-10 w-14 h-14 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center">

                <Icon size={28} className="text-white" />

              </div>

              {/* Title */}

              <h3 className="relative z-10 mt-8 text-xl font-semibold">
                {feature.title}
              </h3>

              {/* Description */}

              <p className="relative z-10 mt-4 text-zinc-400 leading-7">
                {feature.description}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default Features;