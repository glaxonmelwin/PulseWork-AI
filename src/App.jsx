import Auth from "./pages/Auth";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Activity,
  BrainCircuit,
  Check,
  CircleDot,
  Database,
  Fingerprint,
  Globe2,
  LockKeyhole,
  Menu,
  Network,
  Radar,
  ScanSearch,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import "./App.css";

const features = [
  {
    icon: Radar,
    number: "01",
    title: "Real-time Threat Intelligence",
    description:
      "Monitor suspicious activity and discover emerging digital threats through a unified intelligence view.",
    tag: "LIVE MONITORING",
  },
  {
    icon: ScanSearch,
    number: "02",
    title: "AI Threat Analysis",
    description:
      "Transform complex security signals into understandable insights with AI-assisted analysis.",
    tag: "AI POWERED",
  },
  {
    icon: Fingerprint,
    number: "03",
    title: "Domain Reputation",
    description:
      "Investigate domains, identify suspicious indicators and understand potential reputation risks.",
    tag: "REPUTATION",
  },
  {
    icon: Network,
    number: "04",
    title: "Threat Correlation",
    description:
      "Connect related indicators to uncover patterns that may otherwise remain hidden.",
    tag: "INTELLIGENCE",
  },
  {
    icon: ShieldAlert,
    number: "05",
    title: "Risk Assessment",
    description:
      "Organize security findings by severity so teams can focus on the most important issues.",
    tag: "RISK INSIGHTS",
  },
  {
    icon: BrainCircuit,
    number: "06",
    title: "Predictive Insights",
    description:
      "Use historical patterns and intelligent analysis to support proactive security decisions.",
    tag: "SMART ANALYSIS",
  },
];

const process = [
  {
    icon: Database,
    title: "Collect",
    text: "Gather security signals and digital indicators.",
  },
  {
    icon: BrainCircuit,
    title: "Analyze",
    text: "Process information using intelligent analysis.",
  },
  {
    icon: ScanSearch,
    title: "Detect",
    text: "Identify suspicious patterns and potential risks.",
  },
  {
    icon: ShieldCheck,
    title: "Protect",
    text: "Present actionable insights for security teams.",
  },
];

const demoAlerts = [
  {
    name: "Suspicious domain activity",
    detail: "demo-login-security.example",
    level: "High",
    color: "high",
  },
  {
    name: "Unusual network behaviour",
    detail: "Network indicator · Demo",
    level: "Medium",
    color: "medium",
  },
  {
    name: "Potential phishing indicator",
    detail: "Email indicator · Demo",
    level: "Low",
    color: "low",
  },
];

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      {/* NAVIGATION */}
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <Activity size={22} strokeWidth={2.5} />
          </span>
          <span>
            PulseWork<span className="brand-ai"> AI.</span>
            <small>INTELLIGENCE IN MOTION</small>
          </span>
        </a>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#features" onClick={closeMenu}>
            Features
          </a>

          <a href="#intelligence" onClick={closeMenu}>
            Intelligence
          </a>

          <a href="#workflow" onClick={closeMenu}>
            How it works
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          {/* LOGIN LINK */}
          <a href="/login" onClick={closeMenu}>
            Login
          </a>

          {/* MOBILE REGISTER BUTTON */}
          <a href="/register" className="mobile-cta" onClick={closeMenu}>
            Get Started <ArrowUpRight size={16} />
          </a>
        </nav>

        {/* DESKTOP REGISTER BUTTON */}
        <a href="/register" className="nav-cta">
          Get Started <ArrowUpRight size={16} />
        </a>

        {/* MOBILE MENU */}
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* HERO */}
      <section className="hero-section" id="home">
        <div className="hero-grid"></div>
        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        <div className="hero-content">
          <div className="eyebrow reveal">
            <span className="status-dot"></span>
            NEXT-GENERATION CYBERSECURITY INTELLIGENCE
          </div>

          <h1 className="hero-title reveal">
            Stay Ahead.
            <br />
            <span className="gradient-text">Think Smarter.</span>
            <br />
            Stay Secure.
          </h1>

          <p className="hero-description reveal">
            Discover a smarter way to understand digital threats. PulseWork AI
            brings intelligent threat analysis, security insights and proactive
            monitoring together in one powerful platform.
          </p>

          <div className="hero-actions reveal">
            <a href="#features" className="primary-btn">
              Explore Platform <ArrowRight size={18} />
            </a>

            <a href="#intelligence" className="secondary-btn">
              <span className="play-icon">↗</span>
              Explore Intelligence
            </a>
          </div>

          <div className="hero-trust reveal">
            <span>
              <ShieldCheck size={17} /> Security-focused
            </span>

            <span>
              <Zap size={17} /> AI-assisted insights
            </span>

            <span>
              <LockKeyhole size={17} /> Privacy-conscious design
            </span>
          </div>
        </div>

        {/* FLOATING HERO VISUAL */}
        <div className="hero-visual reveal">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="hero-core">
            <div className="core-inner">
              <ShieldCheck size={62} strokeWidth={1.3} />
              <span>AI</span>
            </div>
          </div>

          <div className="floating-chip chip-top">
            <span className="chip-icon purple">
              <BrainCircuit size={19} />
            </span>

            <span>
              <strong>AI Analysis</strong>
              <small>Intelligence active</small>
            </span>

            <span className="chip-live"></span>
          </div>

          <div className="floating-chip chip-left">
            <span className="chip-icon green">
              <ShieldCheck size={19} />
            </span>

            <span>
              <strong>Threat Insights</strong>
              <small>Demo visualization</small>
            </span>
          </div>

          <div className="floating-chip chip-right">
            <span className="chip-icon gold">
              <Radar size={19} />
            </span>

            <span>
              <strong>Live Monitoring</strong>
              <small>Concept preview</small>
            </span>
          </div>

          <div className="floating-chip chip-bottom">
            <Activity size={17} />
            <span>INTELLIGENCE NETWORK</span>
          </div>

          <div className="orbit-dot dot-one"></div>
          <div className="orbit-dot dot-two"></div>
          <div className="orbit-dot dot-three"></div>
        </div>

        <a href="#overview" className="scroll-indicator">
          SCROLL TO EXPLORE <ArrowDown size={15} />
        </a>
      </section>

      {/* OVERVIEW / STATS */}
      <section className="overview-section" id="overview">
        <div className="overview-inner">
          <div className="overview-copy reveal">
            <span className="section-kicker">THE PULSEWORK ADVANTAGE</span>

            <h2>
              Intelligence that
              <br /> moves <em>with you.</em>
            </h2>

            <p>
              Modern security requires more than simply reacting to threats. It
              requires understanding signals, connecting information and making
              better decisions.
            </p>
          </div>

          <div className="stats-grid reveal">
            <div className="stat-item">
              <span className="stat-icon">
                <ShieldCheck />
              </span>
              <strong>24/7</strong>
              <span>Monitoring concept</span>
            </div>

            <div className="stat-item">
              <span className="stat-icon">
                <BrainCircuit />
              </span>
              <strong>AI</strong>
              <span>Assisted intelligence</span>
            </div>

            <div className="stat-item">
              <span className="stat-icon">
                <Globe2 />
              </span>
              <strong>360°</strong>
              <span>Security perspective</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section section-padding" id="features">
        <div className="section-heading reveal">
          <span className="section-kicker">POWERFUL CAPABILITIES</span>

          <h2>
            Everything you need.
            <br />
            <em>One intelligent platform.</em>
          </h2>

          <p>
            Explore the tools and capabilities designed to make cybersecurity
            insights easier to understand.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className="feature-card reveal" key={feature.number}>
                <div className="feature-top">
                  <div className="feature-icon">
                    <Icon size={25} />
                  </div>

                  <span>{feature.number}</span>
                </div>

                <span className="feature-tag">{feature.tag}</span>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <a href="#intelligence" className="feature-link">
                  Discover more <ArrowUpRight size={17} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* INTELLIGENCE PREVIEW */}
      <section className="intelligence-section" id="intelligence">
        <div className="intelligence-inner">
          <div className="intelligence-copy reveal">
            <span className="section-kicker">YOUR SECURITY, REIMAGINED</span>

            <h2>
              See the bigger
              <br />
              <em>security picture.</em>
            </h2>

            <p>
              A unified intelligence experience that turns security indicators
              into clear, organized insights.
            </p>

            <ul className="benefit-list">
              <li>
                <Check size={17} /> Understand potential threats
              </li>

              <li>
                <Check size={17} /> Organize alerts by severity
              </li>

              <li>
                <Check size={17} /> Explore security indicators
              </li>

              <li>
                <Check size={17} /> Make informed decisions
              </li>
            </ul>

            <a href="#workflow" className="primary-btn">
              Discover How It Works <ArrowRight size={17} />
            </a>
          </div>

          <div className="dashboard-window reveal">
            <div className="dashboard-header">
              <div className="dashboard-brand">
                <span className="mini-brand">
                  <Activity size={15} />
                </span>

                <strong>
                  PulseWork <span>Intelligence</span>
                </strong>
              </div>

              <div className="dashboard-status">
                <span></span> DEMO PREVIEW
              </div>
            </div>

            <div className="dashboard-body">
              <div className="dashboard-title-row">
                <div>
                  <small>SECURITY OVERVIEW</small>
                  <h3>Threat Intelligence</h3>
                </div>

                <span className="demo-label">SAMPLE DATA</span>
              </div>

              <div className="dashboard-metrics">
                <div className="metric-card">
                  <span>Threat indicators</span>
                  <strong>128</strong>
                  <small>
                    <Activity size={12} /> Illustrative
                  </small>
                </div>

                <div className="metric-card">
                  <span>High-risk alerts</span>
                  <strong>08</strong>
                  <small>
                    <ShieldAlert size={12} /> Illustrative
                  </small>
                </div>

                <div className="metric-card">
                  <span>Analysis status</span>
                  <strong className="metric-active">Active</strong>
                  <small>
                    <CircleDot size={12} /> Demo state
                  </small>
                </div>
              </div>

              <div className="chart-card">
                <div className="chart-heading">
                  <div>
                    <strong>Activity overview</strong>
                    <small>Illustrative activity visualization</small>
                  </div>

                  <Activity size={19} />
                </div>

                <div className="chart-area">
                  <div className="chart-y-labels">
                    <span>100</span>
                    <span>75</span>
                    <span>50</span>
                    <span>25</span>
                    <span>0</span>
                  </div>

                  <div className="chart-graph">
                    <div className="chart-line line-a"></div>
                    <div className="chart-line line-b"></div>

                    <div className="chart-bars">
                      {[35, 52, 43, 72, 48, 65, 39, 84, 56, 74, 47, 68].map(
                        (height, index) => (
                          <span
                            key={index}
                            style={{ "--bar-height": `${height}%` }}
                          ></span>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="chart-x-labels">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                  <span>SUN</span>
                </div>
              </div>

              <div className="alerts-card">
                <div className="alerts-heading">
                  <strong>Recent security indicators</strong>
                  <span>DEMO</span>
                </div>

                {demoAlerts.map((alert, index) => (
                  <div className="alert-row" key={index}>
                    <span className={`alert-indicator ${alert.color}`}></span>

                    <div className="alert-info">
                      <strong>{alert.name}</strong>
                      <small>{alert.detail}</small>
                    </div>

                    <span className={`alert-level ${alert.color}`}>
                      {alert.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="workflow-section section-padding" id="workflow">
        <div className="section-heading reveal">
          <span className="section-kicker">SIMPLE. SMART. STRUCTURED.</span>

          <h2>
            From signals to
            <br />
            <em>security insights.</em>
          </h2>

          <p>
            A clear workflow for making sense of complex security information.
          </p>
        </div>

        <div className="workflow-grid">
          {process.map((item, index) => {
            const Icon = item.icon;

            return (
              <article className="workflow-card reveal" key={item.title}>
                <div className="workflow-number">0{index + 1}</div>

                <div className="workflow-icon">
                  <Icon size={29} />
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

                {index !== process.length - 1 && (
                  <ArrowRight className="workflow-arrow" size={22} />
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-decoration"></div>

        <div className="about-content reveal">
          <span className="section-kicker">THE VISION BEHIND PULSEWORK</span>

          <h2>
            Making digital security
            <br />
            <em>smarter and simpler.</em>
          </h2>

          <p>
            PulseWork AI is designed around a simple idea: security intelligence
            should be easier to access, understand and act upon. We bring
            AI-assisted thinking and cybersecurity concepts into one focused
            experience.
          </p>

          <div className="about-points">
            <span>
              <Sparkles size={18} /> Intelligent by design
            </span>

            <span>
              <Shield size={18} /> Security focused
            </span>

            <span>
              <Zap size={18} /> Built for clarity
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="cta-glow"></div>

        <div className="cta-content reveal">
          <span className="section-kicker">THE FUTURE IS INTELLIGENT</span>

          <h2>
            Ready to rethink
            <br />
            <em>cybersecurity?</em>
          </h2>

          <p>
            Explore a smarter approach to digital threat intelligence with
            PulseWork AI.
          </p>

          <a href="mailto:hello@pulsework.ai" className="cta-button">
            Let's Connect <ArrowUpRight size={19} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <a href="#home" className="brand footer-brand">
            <span className="brand-icon">
              <Activity size={22} />
            </span>

            <span>
              PulseWork<span className="brand-ai"> AI.</span>
              <small>INTELLIGENCE IN MOTION</small>
            </span>
          </a>

          <p>Think ahead. Stay aware. Stay secure.</p>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#intelligence">Intelligence</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} PulseWork AI. All rights reserved.
          </span>

          <span>Designed for intelligent security.</span>
        </div>
      </footer>
    </main>
  );
}

/* ==========================================
   MAIN APP ROUTING
========================================== */

export default function App() {
  const path = window.location.pathname;

  if (path === "/login" || path === "/register") {
    return <Auth />;
  }

  return <LandingPage />;
}
