import { useState } from "react";
import {
  Activity,
  ShieldCheck,
  Shield,
  Zap,
  LockKeyhole,
  Mail,
  UserRound,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowUpRight,
  LogIn,
  UserPlus,
  Sparkles,
  Check,
} from "lucide-react";
import "./Auth.css";

export default function Auth() {
  const [mode, setMode] = useState(
    window.location.pathname === "/register" ? "register" : "login",
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  const [message, setMessage] = useState("");

  const isRegister = mode === "register";

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    window.history.replaceState(
      null,
      "",
      nextMode === "register" ? "/register" : "/login",
    );
  };

  const updateField = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (isRegister && form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    setMessage(
      isRegister
        ? "Registration form validated! Backend integration is coming next."
        : "Login form validated! Backend integration is coming next.",
    );
  };

  return (
    <main className="auth-page">
      {/* LEFT BRAND PANEL */}
      <section className="auth-left">
        <div className="auth-background-grid"></div>
        <div className="auth-orb orb-a"></div>
        <div className="auth-orb orb-b"></div>
        <div className="auth-orb orb-c"></div>

        <div className="auth-brand">
          <div className="auth-brand-icon">
            <Activity size={29} />
          </div>

          <div>
            <h2>
              PulseWork <span>AI</span>
            </h2>
            <small>INTELLIGENCE IN MOTION</small>
          </div>
        </div>

        <div className="auth-left-content" key={mode}>
          <div className="auth-label">
            <Sparkles size={14} />
            INTELLIGENCE MEETS SECURITY
          </div>

          <h1>
            {isRegister ? (
              <>
                Build a Safer.
                <br />
                <em>Smarter Future.</em>
              </>
            ) : (
              <>
                Smarter Security.
                <br />
                <em>Brighter Tomorrow.</em>
              </>
            )}
          </h1>

          <p>
            {isRegister
              ? "Join PulseWork AI and explore a smarter approach to cybersecurity intelligence."
              : "Join PulseWork AI and be a part of the next generation cybersecurity intelligence platform."}
          </p>

          <div className="auth-benefits">
            <div>
              <span>
                <ShieldCheck size={20} />
              </span>
              AI-Powered Threat Detection
            </div>
            <div>
              <span>
                <Zap size={20} />
              </span>
              Real-Time Intelligence
            </div>
            <div>
              <span>
                <LockKeyhole size={20} />
              </span>
              Enterprise-Grade Security
            </div>
          </div>
        </div>

        {/* DECORATIVE SHIELD */}
        <div className="shield-scene">
          <div className="shield-orbit orbit-a"></div>
          <div className="shield-orbit orbit-b"></div>
          <div className="shield-orbit orbit-c"></div>

          <div className="shield-platform platform-one"></div>
          <div className="shield-platform platform-two"></div>

          <div className="main-shield">
            <Shield className="shield-outline" size={175} strokeWidth={1.1} />
            <div className="shield-lock">
              <LockKeyhole size={55} strokeWidth={1.5} />
            </div>
            <div className="shield-light"></div>
          </div>

          <div className="shield-particle particle-one"></div>
          <div className="shield-particle particle-two"></div>
          <div className="shield-particle particle-three"></div>
          <div className="shield-particle particle-four"></div>
        </div>

        <div className="auth-left-footer">
          <ShieldCheck size={19} />
          <span>Secure</span>
          <i></i>
          <span>Smart</span>
          <i></i>
          <span>Reliable</span>
        </div>
      </section>

      {/* RIGHT FORM PANEL */}
      <section className="auth-right">
        <div className="auth-card">
          {/* TABS */}
          <div className="auth-tabs">
            <button
              className={!isRegister ? "active" : ""}
              onClick={() => changeMode("login")}
              type="button"
            >
              <LogIn size={19} />
              Login
            </button>

            <button
              className={isRegister ? "active" : ""}
              onClick={() => changeMode("register")}
              type="button"
            >
              <UserPlus size={19} />
              Register
            </button>
          </div>

          <div className="auth-form-content" key={mode}>
            <div className="auth-form-heading">
              <span className="form-kicker">
                {isRegister ? "CREATE YOUR ACCOUNT" : "WELCOME TO PULSEWORK"}
              </span>

              <h2>{isRegister ? "Create Account" : "Welcome Back!"}</h2>

              <p>
                {isRegister
                  ? "Start your journey with PulseWork AI."
                  : "Sign in to continue to PulseWork AI"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {isRegister && (
                <div className="auth-input-group input-animate">
                  <label>Full Name</label>
                  <div className="auth-input">
                    <UserRound size={19} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={updateField}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="auth-input-group input-animate">
                <label>Email Address</label>
                <div className="auth-input">
                  <Mail size={19} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={updateField}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group input-animate">
                <label>Password</label>
                <div className="auth-input">
                  <LockKeyhole size={19} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={updateField}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div className="auth-input-group input-animate">
                  <label>Confirm Password</label>
                  <div className="auth-input">
                    <LockKeyhole size={19} />
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={form.confirmPassword}
                      onChange={updateField}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirm(!showConfirm)}
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirm ? <Eye size={19} /> : <EyeOff size={19} />}
                    </button>
                  </div>
                </div>
              )}

              {isRegister && (
                <div className="password-note">
                  <Check size={14} />
                  Use at least 8 characters for your password.
                </div>
              )}

              {!isRegister && (
                <div className="auth-options">
                  <label className="remember-option">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={updateField}
                    />
                    <span className="custom-check"></span>
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="forgot-link"
                    onClick={() =>
                      setMessage(
                        "Password recovery will be connected with the backend later.",
                      )
                    }
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {message && (
                <div className="auth-message" role="status">
                  {message}
                </div>
              )}

              <button type="submit" className="auth-submit">
                <span>{isRegister ? "Create Account" : "Login"}</span>
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="auth-divider">
              <span></span>
              <p>or continue with</p>
              <span></span>
            </div>

            <button
              className="google-button"
              type="button"
              onClick={() =>
                setMessage("Google authentication will be connected later.")
              }
            >
              <span className="google-g">G</span>
              Continue with Google
            </button>

            <div className="auth-switch">
              {isRegister ? (
                <>
                  Already have an account?
                  <button onClick={() => changeMode("login")}>
                    Login here <ArrowUpRight size={16} />
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?
                  <button onClick={() => changeMode("register")}>
                    Register here <ArrowUpRight size={16} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="auth-card-footer">
            <ShieldCheck size={15} />
            Your security is our priority.
          </div>
        </div>

        <div className="auth-copyright">
          © {new Date().getFullYear()} PulseWork AI. All rights reserved.
        </div>
      </section>
    </main>
  );
}
