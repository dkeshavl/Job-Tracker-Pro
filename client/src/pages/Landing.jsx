import LandingNavbar from "../components/landing/LandingNavbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_45%)]" />

        {/* Top Glow */}
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/5 blur-[140px]" />

        {/* Left Glow */}
        <div className="absolute top-[40%] -left-40 h-[300px] w-[300px] rounded-full bg-white/5 blur-[120px]" />

        {/* Right Glow */}
        <div className="absolute bottom-0 -right-40 h-[350px] w-[350px] rounded-full bg-white/5 blur-[140px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Landing;