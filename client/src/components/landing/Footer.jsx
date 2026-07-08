import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-12 lg:grid-cols-3">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center shadow-[0_10px_40px_rgba(255,255,255,0.04)]">

                <BriefcaseBusiness size={22} />

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Job Tracker Pro
                </h2>

                <p className="text-sm text-zinc-500">
                  Track your career smarter
                </p>

              </div>

            </div>

            <p className="mt-6 leading-7 text-zinc-400 max-w-md">
              A modern Job Application Tracking System built with
              React.js, Node.js, Express.js and MySQL.
              Organize applications, monitor interviews,
              analyze progress and land your dream job.
            </p>

          </div>

          {/* Links */}

          <div>

            <h3 className="font-semibold text-lg mb-6">
              Quick Links
            </h3>

            <div className="space-y-4">

              <Link
                to="/login"
                className="block text-zinc-400 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block text-zinc-400 hover:text-white transition"
              >
                Register
              </Link>

            </div>

          </div>

          {/* Tech */}

          <div>

            <h3 className="font-semibold text-lg mb-6">
              Built With
            </h3>

            <div className="flex flex-wrap gap-3">

              {[
                "React",
                "Node.js",
                "Express",
                "MySQL",
                "Tailwind CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-4
                    py-2
                    text-sm
                    text-zinc-300
                    backdrop-blur-xl
                  "
                >
                  {tech}
                </span>
              ))}

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-10 border-t border-white/10"></div>

        {/* Bottom */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-zinc-500 text-center md:text-left">
            © {new Date().getFullYear()} Job Tracker Pro. All rights reserved.
          </p>

          <div className="flex gap-4">

            <a
              href="https://github.com/dkeshavl/Job-Tracker-Pro"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-11
                h-11
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                flex
                items-center
                justify-center
                hover:bg-white/10
                transition
              "
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/d-keshav-lagubigi/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-11
                h-11
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                flex
                items-center
                justify-center
                hover:bg-white/10
                transition
              "
            >
              <FaLinkedin size={18} />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;