import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  BrainCircuit,
  Zap,
  Users,
  ChartNoAxesCombined,
  LockKeyhole,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  Workflow,
  Clock3,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Intelligence",
      description:
        "Make smarter decisions with intelligent insights and AI-driven task recommendations.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Bring managers and employees together with seamless communication and teamwork.",
    },
    {
      icon: Workflow,
      title: "Smart Task Management",
      description:
        "Assign, organize, track and manage every task from one centralized workspace.",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Performance Insights",
      description:
        "Monitor productivity and visualize team progress with meaningful insights.",
    },
    {
      icon: LockKeyhole,
      title: "Secure Workspace",
      description:
        "Keep your workspace organized with role-based access and secure authentication.",
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description:
        "Stay updated with task progress, employee activities and important changes.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create your workspace",
      description: "Get started by creating your PulseWork AI account.",
    },
    {
      number: "02",
      title: "Connect your team",
      description:
        "Managers can assign tasks and organize employee responsibilities.",
    },
    {
      number: "03",
      title: "Track everything",
      description: "Monitor task progress and improve team productivity.",
    },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };
  // Reveal elements smoothly when they enter the screen
  useEffect(() => {
    const elements = document.querySelectorAll(".home-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="home-page overflow-hidden">
      {/* NAVBAR */}
      <nav className="home-navbar">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3"
          >
            <div className="home-brand-icon">
              <ShieldCheck size={25} />
            </div>

            <div className="text-left">
              <h2 className="font-serif text-2xl font-bold text-[#34351f]">
                PulseWork AI
              </h2>
              <p className="text-[8px] tracking-[3px] text-[#777943]">
                INTELLIGENCE IN MOTION
              </p>
            </div>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-9 text-sm text-[#555545]">
            <button onClick={() => scrollTo("home")} className="home-nav-link">
              Home
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="home-nav-link"
            >
              Features
            </button>
            <button onClick={() => scrollTo("about")} className="home-nav-link">
              About
            </button>
            <button
              onClick={() => scrollTo("how-it-works")}
              className="home-nav-link"
            >
              How it works
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 text-sm font-semibold text-[#686b37] hover:text-[#444820] transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="home-primary-btn"
            >
              Get Started <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#555b30]"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {menuOpen && (
          <div className="home-mobile-menu md:hidden">
            <button onClick={() => scrollTo("home")}>Home</button>
            <button onClick={() => scrollTo("features")}>Features</button>
            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={() => scrollTo("how-it-works")}>
              How it works
            </button>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Get Started</button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="home-hero relative min-h-[720px] flex items-center"
      >
        <div className="home-grid-bg" />

        <div className="home-glow home-glow-one" />
        <div className="home-glow home-glow-two" />

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Hero content */}
          <div className="home-hero-content">
            <div className="home-eyebrow">
              <Sparkles size={15} />
              THE FUTURE OF SMART WORK MANAGEMENT
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl xl:text-[76px] leading-[1.08] tracking-tight mt-8 text-[#30311f]">
              Work Smarter.
              <br />
              Grow <span className="home-gradient-text">Together.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base sm:text-lg leading-8 text-[#656452]">
              Transform the way your team works with intelligent task
              management, seamless collaboration and powerful AI-driven
              productivity.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <button
                onClick={() => navigate("/register")}
                className="home-primary-btn home-hero-btn"
              >
                Get Started <ArrowRight size={19} />
              </button>

              <button
                onClick={() => navigate("/login")}
                className="home-secondary-btn"
              >
                Explore Workspace
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 text-xs text-[#74745f]">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#777b40]" />
                Smart Management
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#777b40]" />
                Secure Access
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#777b40]" />
                Team Focused
              </span>
            </div>
          </div>

          {/* Animated visual */}
          <div className="home-visual">
            <div className="home-visual-orbit orbit-one" />
            <div className="home-visual-orbit orbit-two" />
            <div className="home-visual-orbit orbit-three" />

            <div className="home-floating-icon floating-icon-one">
              <BrainCircuit size={28} />
            </div>

            <div className="home-floating-icon floating-icon-two">
              <Zap size={25} />
            </div>

            <div className="home-floating-icon floating-icon-three">
              <ShieldCheck size={25} />
            </div>

            <div className="home-dashboard-card">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] tracking-widest text-[#85836d]">
                    PULSEWORK AI
                  </p>
                  <h3 className="font-serif text-xl text-[#34351f] mt-1">
                    Smart Workspace
                  </h3>
                </div>

                <div className="home-status-dot">
                  <span />
                  Live
                </div>
              </div>

              <div className="home-dashboard-highlight mt-7">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-[#77765e]">Workspace Overview</p>
                    <h3 className="text-3xl font-bold text-[#555a2e] mt-2">
                      Intelligent
                    </h3>
                    <p className="text-[10px] text-[#77765e] mt-1">
                      Workflows in motion
                    </p>
                  </div>

                  <div className="home-brain-icon">
                    <BrainCircuit size={38} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="home-mini-card">
                  <div className="flex items-center gap-2 text-[#777a40]">
                    <Target size={17} />
                    <span className="text-[10px]">Task Focus</span>
                  </div>
                  <p className="font-bold text-xl mt-3 text-[#34351f]">
                    Organized
                  </p>
                </div>

                <div className="home-mini-card">
                  <div className="flex items-center gap-2 text-[#777a40]">
                    <Users size={17} />
                    <span className="text-[10px]">Team Sync</span>
                  </div>
                  <p className="font-bold text-xl mt-3 text-[#34351f]">
                    Connected
                  </p>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-[#f1eedf]">
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-[#66654f]">Workflow Progress</span>
                  <span className="text-[#777a40] font-bold">In Motion</span>
                </div>

                <div className="h-2 bg-[#dedbc8] rounded-full overflow-hidden">
                  <div className="home-progress-bar h-full rounded-full" />
                </div>
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex items-center gap-2">
                  <div className="home-avatar">P</div>
                  <div>
                    <p className="text-[11px] font-bold text-[#4d4d38]">
                      PulseWork Team
                    </p>
                    <p className="text-[9px] text-[#898772]">
                      Smarter collaboration
                    </p>
                  </div>
                </div>

                <ShieldCheck size={23} className="text-[#777a40]" />
              </div>
            </div>

            <div className="home-floating-note note-one">
              <Zap size={17} />
              <span>Smart workflows</span>
            </div>

            <div className="home-floating-note note-two">
              <LockKeyhole size={17} />
              <span>Secure workspace</span>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STRIP */}
      <section className="home-strip">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-7 flex flex-wrap justify-center gap-8 md:gap-16 text-[#77765e] text-xs tracking-widest">
          <span className="flex items-center gap-2">
            <BrainCircuit size={17} /> INTELLIGENT WORK
          </span>
          <span className="flex items-center gap-2">
            <Users size={17} /> TEAM COLLABORATION
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={17} /> SECURE ACCESS
          </span>
          <span className="flex items-center gap-2">
            <Zap size={17} /> SMART PRODUCTIVITY
          </span>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="home-features-section py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="home-section-label">WHAT MAKES US DIFFERENT</span>

            <h2 className="font-serif text-4xl sm:text-5xl mt-5 text-[#30311f]">
              Everything Your Team Needs.
              <span className="home-gradient-text"> One Place.</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#777568]">
              A smarter workspace designed to simplify responsibilities, improve
              collaboration and bring your team's goals together.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="home-feature-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="home-feature-icon">
                    <Icon size={27} />
                  </div>

                  <h3 className="font-serif text-xl text-[#34351f] mt-6">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-7 text-[#777568] mt-3">
                    {feature.description}
                  </p>

                  <div className="home-feature-line" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="home-about-section py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="home-about-visual">
            <div className="home-about-circle circle-one" />
            <div className="home-about-circle circle-two" />

            <div className="home-about-center">
              <ShieldCheck size={95} strokeWidth={1.1} />
              <p className="font-serif text-2xl mt-5">PulseWork AI</p>
              <span className="text-[9px] tracking-[3px] mt-2">
                INTELLIGENCE IN MOTION
              </span>
            </div>

            <div className="home-about-floating about-one">
              <BrainCircuit size={22} />
            </div>

            <div className="home-about-floating about-two">
              <Users size={22} />
            </div>

            <div className="home-about-floating about-three">
              <LockKeyhole size={22} />
            </div>
          </div>

          <div>
            <span className="home-section-label">ABOUT PULSEWORK AI</span>

            <h2 className="font-serif text-4xl sm:text-5xl leading-tight mt-5 text-[#30311f]">
              A Better Way to
              <br />
              <span className="home-gradient-text">Work Together.</span>
            </h2>

            <p className="mt-6 text-sm leading-8 text-[#777568]">
              PulseWork AI brings intelligent task management and team
              coordination into one unified platform. It helps managers organize
              responsibilities and enables employees to stay connected with
              their work.
            </p>

            <p className="mt-4 text-sm leading-8 text-[#777568]">
              Our goal is simple: make everyday work more organized, transparent
              and productive through intelligent technology.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Centralized task management",
                "Manager and employee workflows",
                "Role-based workspace access",
                "Intelligent productivity experience",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#5c5d43]"
                >
                  <CheckCircle2 size={19} className="text-[#777b40]" />
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/register")}
              className="home-primary-btn mt-9"
            >
              Start Your Journey <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="home-how-section py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="home-section-label">
              SIMPLE. SMART. EFFECTIVE.
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl mt-5 text-[#30311f]">
              How PulseWork Works
            </h2>

            <p className="text-sm text-[#777568] mt-4">
              Three simple steps towards smarter teamwork.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="home-step-card">
                <span className="home-step-number">{step.number}</span>

                <div className="home-step-icon">
                  {index === 0 && <Users size={28} />}
                  {index === 1 && <Workflow size={28} />}
                  {index === 2 && <ChartNoAxesCombined size={28} />}
                </div>

                <h3 className="font-serif text-2xl mt-7 text-[#34351f]">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 mt-4 text-[#777568]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta-section py-24 px-6">
        <div className="max-w-5xl mx-auto home-cta-card text-center relative overflow-hidden">
          <div className="home-cta-orb cta-orb-one" />
          <div className="home-cta-orb cta-orb-two" />

          <div className="relative z-10 py-16 px-6">
            <div className="inline-flex items-center gap-2 text-[#f4eecb] text-[10px] tracking-[2px]">
              <Sparkles size={16} />
              YOUR SMARTER WORKSPACE STARTS HERE
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl text-[#fff9df] mt-7 leading-tight">
              Ready to Work
              <br />
              Smarter?
            </h2>

            <p className="max-w-xl mx-auto text-sm leading-7 text-[#e4dfbd] mt-6">
              Bring your team together, organize your work and move towards a
              more intelligent way of working.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <button
                onClick={() => navigate("/register")}
                className="home-cta-button"
              >
                Get Started <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate("/login")}
                className="home-cta-login"
              >
                Login to Workspace
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="home-brand-icon">
                  <ShieldCheck size={24} />
                </div>

                <h2 className="font-serif text-2xl text-[#34351f]">
                  PulseWork AI
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-[#777568] mt-5">
                Intelligence in motion. Bringing people, tasks and technology
                together for a smarter workplace.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#48492e] mb-5">Explore</h3>

              <div className="flex flex-col gap-4 text-sm text-[#777568]">
                <button
                  onClick={() => scrollTo("home")}
                  className="text-left hover:text-[#62662f]"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollTo("features")}
                  className="text-left hover:text-[#62662f]"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollTo("about")}
                  className="text-left hover:text-[#62662f]"
                >
                  About
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#48492e] mb-5">Account</h3>

              <div className="flex flex-col gap-4 text-sm text-[#777568]">
                <button
                  onClick={() => navigate("/login")}
                  className="text-left hover:text-[#62662f]"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="text-left hover:text-[#62662f]"
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#dcd7c5] mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-[#898773]">
            <p>
              © {new Date().getFullYear()} PulseWork AI. All rights reserved.
            </p>

            <p className="flex items-center gap-2">
              <ShieldCheck size={15} />
              Secure. Smart. Reliable.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
