import {
  BriefcaseBusiness,
  BarChart3,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";

function DashboardPreview() {
  return (
    <section
  id="demo"
  className="relative hidden lg:block scroll-mt-28"
>

      {/* Soft White Glow */}

      <div className="absolute inset-0 rounded-[32px] bg-white/5 blur-3xl"></div>

      {/* Dashboard */}

      <div className="relative rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_80px_rgba(255,255,255,0.05)] overflow-hidden">

        {/* Top Bar */}

        <div className="flex items-center justify-between border-b border-white/10 px-7 py-5">

          <div>
            <h3 className="text-lg font-semibold text-white">
              Dashboard
            </h3>

            <p className="text-sm text-zinc-500">
              Welcome back 👋
            </p>
          </div>

          <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
            <BriefcaseBusiness size={20} />
          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-5 p-7">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="flex justify-between items-center">

              <span className="text-zinc-500 text-sm">
                Applications
              </span>

              <BarChart3 size={18} className="text-white/80" />

            </div>

            <h2 className="mt-5 text-3xl font-bold">
              128
            </h2>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="flex justify-between items-center">

              <span className="text-zinc-500 text-sm">
                Interviews
              </span>

              <CalendarDays size={18} className="text-white/80" />

            </div>

            <h2 className="mt-5 text-3xl font-bold">
              18
            </h2>

          </div>

        </div>

        {/* Graph */}

        <div className="px-7">

          <h4 className="text-sm text-zinc-500 mb-5">
            Monthly Applications
          </h4>

          <div className="h-40 flex items-end gap-3">

            {[35, 60, 45, 80, 55, 95, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-xl bg-white/80 hover:bg-white transition-all duration-300"
                style={{ height: `${h}%` }}
              />
            ))}

          </div>

        </div>

        {/* Bottom */}

        <div className="grid grid-cols-2 gap-5 p-7">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="flex justify-between">

              <span className="text-zinc-500 text-sm">
                Offer Rate
              </span>

              <CircleDollarSign
                size={18}
                className="text-white/80"
              />

            </div>

            <h2 className="mt-5 text-3xl font-bold">
              24%
            </h2>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <span className="text-zinc-500 text-sm">
              Active Jobs
            </span>

            <h2 className="mt-5 text-3xl font-bold">
              47
            </h2>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardPreview;