import { useState } from "react";
import { useForm } from "react-hook-form";

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
  X,
} from "lucide-react";

import "./Auth.css";

export default function Auth() {
  const [mode, setMode] = useState(
    window.location.pathname === "/register" ? "register" : "login",
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const isRegister = mode === "register";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      remember: false,
    },
  });

  const password = watch("password", "");

  // PASSWORD VALIDATION RULES

  // STRONG PASSWORD VALIDATION

  const commonPasswords = [
    "password",
    "password123",
    "password@123",
    "admin123",
    "qwerty123",
    "welcome123",
    "letmein123",
    "iloveyou123",
    "abc123456",
    "pass123456",
  ];

  // Detect repeated characters (aaaa, 1111, etc.)
  const hasRepeatedCharacters = (p) => /(.)\1{3,}/i.test(p);

  // Detect simple sequences (abcd, 1234, dcba, 4321)
  const hasSequence = (p) => {
    const value = p.toLowerCase();

    for (let i = 0; i <= value.length - 4; i++) {
      const part = value.slice(i, i + 4);

      const codes = [...part].map((char) => char.charCodeAt(0));

      const ascending = codes.every(
        (code, index) => index === 0 || code === codes[index - 1] + 1,
      );

      const descending = codes.every(
        (code, index) => index === 0 || code === codes[index - 1] - 1,
      );

      if (ascending || descending) return true;
    }

    return false;
  };

  const passwordRules = [
    {
      label: "At least 16 characters",
      test: (p) => p.length >= 16,
    },
    {
      label: "One uppercase letter",
      test: (p) => /[A-Z]/.test(p),
    },
    {
      label: "One lowercase letter",
      test: (p) => /[a-z]/.test(p),
    },
    {
      label: "At least 2 numbers",
      test: (p) => (p.match(/[0-9]/g) || []).length >= 2,
    },
    {
      label: "At least 2 special characters",
      test: (p) => (p.match(/[^A-Za-z0-9\s]/g) || []).length >= 2,
    },
    {
      label: "No spaces",
      test: (p) => !/\s/.test(p),
    },
    {
      label: "Not a common password",
      test: (p) => !commonPasswords.includes(p.toLowerCase()),
    },
    {
      label: "No 4 repeated characters",
      test: (p) => !hasRepeatedCharacters(p),
    },
    {
      label: "No simple sequences",
      test: (p) => !hasSequence(p),
    },
  ];

  const passedRules = passwordRules.filter((rule) =>
    rule.test(password),
  ).length;

  const passwordStrength =
    passedRules <= 3
      ? "Weak"
      : passedRules <= 5
        ? "Medium"
        : passedRules <= 7
          ? "Good"
          : "Strong";

  // SWITCH BETWEEN LOGIN AND REGISTER
  const changeMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setShowPassword(false);
    setShowConfirm(false);
    reset();

    window.history.pushState(
      null,
      "",
      nextMode === "register" ? "/register" : "/login",
    );
  };

  // FORM SUBMISSION

  const onSubmit = (data) => {
    setMessage("");

    if (isRegister) {
      const failedRules = passwordRules.filter(
        (rule) => !rule.test(data.password),
      );

      if (failedRules.length > 0) {
        setMessage(
          "Your password is not strong enough. Complete every requirement.",
        );
        return;
      }

      if (data.password !== data.confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      console.log("Registration Details:", {
        name: data.name,
        email: data.email,
        password: "[hidden]",
      });

      setMessage("Registration validated successfully!");
      return;
    }

    // DEMO LOGIN ONLY
    console.log("Login Details:", {
      email: data.email,
      password: "[hidden]",
    });

    sessionStorage.setItem("pulseworkLoggedIn", "true");
    sessionStorage.setItem("pulseworkUser", data.email);

    window.location.href = "/tasks";
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
          {/* LOGIN / REGISTER TABS */}
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
            {/* FORM HEADING */}
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

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* FULL NAME */}
              {isRegister && (
                <div className="auth-input-group input-animate">
                  <label>Full Name</label>

                  <div className="auth-input">
                    <UserRound size={19} />

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      {...register("name", {
                        required: "Full name is required",
                        minLength: {
                          value: 3,
                          message: "Name must contain at least 3 characters",
                        },
                      })}
                    />
                  </div>

                  {errors.name && (
                    <small className="auth-error">{errors.name.message}</small>
                  )}
                </div>
              )}

              {/* EMAIL */}
              <div className="auth-input-group input-animate">
                <label>Email Address</label>

                <div className="auth-input">
                  <Mail size={19} />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                </div>

                {errors.email && (
                  <small className="auth-error">{errors.email.message}</small>
                )}
              </div>

              {/* PASSWORD */}
              <div className="auth-input-group input-animate">
                <label>Password</label>

                <div className="auth-input">
                  <LockKeyhole size={19} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      validate: (value) => {
                        if (
                          isRegister &&
                          passwordRules.some((rule) => !rule.test(value))
                        ) {
                          return "Password does not meet all requirements";
                        }

                        return true;
                      },
                    })}
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

                {errors.password && (
                  <small className="auth-error">
                    {errors.password.message}
                  </small>
                )}

                {/* LIVE PASSWORD STRENGTH */}
                {isRegister && password.length > 0 && (
                  <div className="password-strength">
                    <div className="strength-heading">
                      <span>Password Strength</span>

                      <strong
                        className={`strength-${passwordStrength.toLowerCase()}`}
                      >
                        {passwordStrength}
                      </strong>
                    </div>

                    <div className="strength-bars">
                      {[1, 2, 3, 4].map((bar) => (
                        <span
                          key={bar}
                          className={
                            bar <= Math.min(4, Math.ceil(passedRules / 2.25))
                              ? `filled strength-${passwordStrength.toLowerCase()}`
                              : ""
                          }
                        />
                      ))}
                    </div>

                    <div className="password-rules">
                      {passwordRules.map((rule, index) => {
                        const passed = rule.test(password);

                        return (
                          <div
                            key={index}
                            className={passed ? "rule-passed" : ""}
                          >
                            {passed ? <Check size={13} /> : <X size={13} />}

                            {rule.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              {isRegister && (
                <div className="auth-input-group input-animate">
                  <label>Confirm Password</label>

                  <div className="auth-input">
                    <LockKeyhole size={19} />

                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
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

                  {errors.confirmPassword && (
                    <small className="auth-error">
                      {errors.confirmPassword.message}
                    </small>
                  )}
                </div>
              )}

              {/* PASSWORD NOTE */}
              {isRegister && (
                <div className="password-note">
                  <ShieldCheck size={15} />
                  Your account requires a strong password.
                </div>
              )}

              {/* LOGIN OPTIONS */}
              {!isRegister && (
                <div className="auth-options">
                  <label className="remember-option">
                    <input type="checkbox" {...register("remember")} />
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

              {/* MESSAGE */}
              {message && (
                <div className="auth-message" role="status">
                  {message}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button type="submit" className="auth-submit">
                <span>{isRegister ? "Create Account" : "Login"}</span>

                <ArrowRight size={20} />
              </button>
            </form>

            {/* DIVIDER */}
            <div className="auth-divider">
              <span></span>
              <p>or continue with</p>
              <span></span>
            </div>

            {/* GOOGLE */}
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

            {/* SWITCH */}
            <div className="auth-switch">
              {isRegister ? (
                <>
                  Already have an account?
                  <button type="button" onClick={() => changeMode("login")}>
                    Login here <ArrowUpRight size={16} />
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?
                  <button type="button" onClick={() => changeMode("register")}>
                    Register here <ArrowUpRight size={16} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* CARD FOOTER */}
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
