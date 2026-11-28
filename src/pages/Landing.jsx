import { useNavigate } from "react-router-dom";
import "./Auth.css";
import {
  ShieldCheck,
  Zap,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  BrainCircuit,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-hidden relative bg-[#f4f0df] text-[#28291b]">
      {/* Background effects */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#b9b887] rounded-full blur-[100px] opacity-40 animate-pulse" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-[#777b43] rounded-full blur-[120px] opacity-20" />

      {/* Navbar */}
      <nav className="relative z-20 flex justify-between items-center px-6 md:px-16 py-6">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold">
            PulseWork <span className="text-[#777b43]">AI</span>
          </h2>
          <p className="text-[9px] tracking-[3px] mt-1">
            INTELLIGENCE IN MOTION
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#e3dfc9] transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2.5 rounded-full bg-[#777b43] text-white text-sm hover:bg-[#5e6232] transition shadow-lg"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[75vh] flex flex-col lg:flex-row items-center justify-between px-7 md:px-16 py-16 gap-12">
        {/* Left content */}
        <div className="max-w-2xl landing-content">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#b9b88d] bg-white/50 text-[#777b43] text-xs font-bold tracking-wider">
            <Sparkles size={15} />
            SMARTER WORKSPACE. STRONGER SECURITY.
          </div>

          <h1 className="font-serif text-5xl md:text-7xl leading-tight mt-8">
            Work Smarter.
            <br />
            <span className="italic text-[#777b43]">Stay Secure.</span>
          </h1>

          <p className="text-[#666653] leading-8 text-sm md:text-base mt-7 max-w-lg">
            Experience the future of intelligent work management. Organize
            tasks, empower teams, track productivity, and manage everything
            through one secure platform.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <button
              onClick={() => navigate("/login")}
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#aaa45f] to-[#62662f] text-white font-semibold shadow-xl hover:-translate-y-1 hover:shadow-2xl transition duration-300"
            >
              Explore Workspace
              <ArrowRight
                size={19}
                className="group-hover:translate-x-1 transition"
              />
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 rounded-full border border-[#a4a27a] text-[#62662f] font-semibold hover:bg-[#e9e5d5] transition"
            >
              Create Account
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 mt-12">
            {[
              { icon: ShieldCheck, text: "Secure Platform" },
              { icon: Zap, text: "Real-Time Tracking" },
              { icon: LockKeyhole, text: "Role-Based Access" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-xs text-[#65664a]"
              >
                <Icon size={17} className="text-[#777b43]" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right illustration */}
        <div className="relative w-full max-w-[480px] h-[420px] flex items-center justify-center landing-visual">
          {/* Orbital circles */}
          <div className="absolute w-[340px] h-[340px] rounded-full border border-[#a5a36e]/50 landing-orbit" />

          <div className="absolute w-[270px] h-[270px] rounded-full border border-[#a5a36e]/40 landing-orbit-reverse" />

          <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#eee9ca] to-[#777b43] opacity-30 blur-2xl" />

          {/* Main glass card */}
          <div className="relative z-10 w-[300px] md:w-[340px] p-7 rounded-[30px] border border-white bg-white/50 backdrop-blur-2xl shadow-[0_25px_70px_#77754b35] landing-card">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-xs text-[#88866d]">Workspace overview</p>
                <h3 className="font-serif text-2xl mt-1">PulseWork AI</h3>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-[#777b43] text-white flex items-center justify-center">
                <BrainCircuit size={25} />
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#e8e5d1] flex items-center justify-center text-[#777b43]">
                <Activity size={25} />
              </div>

              <div>
                <p className="text-xs text-[#85836e]">Productivity</p>
                <h3 className="text-xl font-bold">Intelligence Active</h3>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "Smart Task Management",
                "Team Collaboration",
                "Secure Access Control",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/60"
                >
                  <CheckCircle2 size={18} className="text-[#777b43]" />
                  <span className="text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 p-4 rounded-2xl bg-gradient-to-r from-[#a7a16a] to-[#686c39] text-white">
              <div className="flex items-center gap-2 text-xs">
                <Sparkles size={15} />
                Intelligence in Motion
              </div>
              <p className="text-[10px] mt-2 text-white/80">
                One workspace. Endless possibilities.
              </p>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg flex items-center justify-center text-[#777b43] landing-float">
            <ShieldCheck size={25} />
          </div>

          <div className="absolute bottom-8 left-0 w-14 h-14 rounded-full bg-[#e9e4c6] shadow-lg flex items-center justify-center text-[#777b43] landing-float">
            <Zap size={24} />
          </div>
        </div>
      </section>

      {/* Bottom section */}
      <section className="relative z-10 px-7 md:px-16 pb-12">
        <div className="border-t border-[#d8d3b9] pt-7 flex flex-col md:flex-row justify-between gap-4 text-xs text-[#85836e]">
          <p>© {new Date().getFullYear()} PulseWork AI. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <ShieldCheck size={15} />
            Secure. Smart. Reliable.
          </p>
        </div>
      </section>
    </main>
  );
}
