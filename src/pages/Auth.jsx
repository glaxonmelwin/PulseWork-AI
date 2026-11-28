import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ShieldCheck,
  Zap,
  LockKeyhole,
  Mail,
  UserRound,
  Eye,
  EyeOff,
  ArrowRight,
  LogIn,
  UserPlus,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import "./Auth.css";

export default function Auth() {
  const navigate = useNavigate();

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
  } = useForm();

  const password = watch("password", "");

  // PASSWORD VALIDATION RULES
  const passwordRules = [
    { label: "At least 12 characters", test: (p) => p.length >= 12 },
    { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
    {
      label: "At least 2 numbers",
      test: (p) => (p.match(/[0-9]/g) || []).length >= 2,
    },
    { label: "One special character", test: (p) => /[^A-Za-z0-9\s]/.test(p) },
    { label: "No spaces", test: (p) => !/\s/.test(p) },
  ];

  const passedRules = passwordRules.filter((rule) =>
    rule.test(password),
  ).length;

  // CHANGE LOGIN / REGISTER MODE
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

    // =========================
    // REGISTRATION
    // =========================
    if (isRegister) {
      if (!passwordRules.every((rule) => rule.test(data.password))) {
        setMessage("Please complete all password requirements.");
        return;
      }

      if (data.password !== data.confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("pulseworkUsers") || "[]");

      const email = data.email.trim().toLowerCase();

      if (users.some((user) => user.email.toLowerCase() === email)) {
        setMessage("An account with this email already exists.");
        return;
      }

      users.push({
        name: data.name.trim(),
        email,
        password: data.password,
        role: "employee",
      });

      localStorage.setItem("pulseworkUsers", JSON.stringify(users));

      // AUTOMATIC LOGIN AFTER REGISTRATION
      sessionStorage.setItem("pulseworkLoggedIn", "true");
      sessionStorage.setItem("pulseworkUser", email);
      sessionStorage.setItem("pulseworkRole", "employee");

      navigate("/dashboard");

      return;
    }

    // =========================
    // LOGIN
    // =========================

    const users = JSON.parse(localStorage.getItem("pulseworkUsers") || "[]");

    const email = data.email.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email && item.password === data.password,
    );

    // MANAGER DEMO LOGIN
    const managerLogin =
      email === "manager@demo.com" && data.password === "Manager@123";

    if (!user && !managerLogin) {
      setMessage("Invalid email or password.");
      return;
    }

    // SAVE LOGIN INFORMATION
    sessionStorage.setItem("pulseworkLoggedIn", "true");
    sessionStorage.setItem("pulseworkUser", email);
    sessionStorage.setItem(
      "pulseworkRole",
      managerLogin ? "manager" : user.role,
    );

    console.log("Login successful");

    // COMMON DASHBOARD FOR EVERYONE
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-[#f4f0df] text-[#28291b]">
      {/* LEFT PANEL */}
      <section className="relative min-h-[650px] lg:min-h-screen overflow-hidden isolate px-8 sm:px-12 lg:px-16 py-10 bg-[radial-gradient(circle_at_75%_15%,#fdf8d9,transparent_28%),radial-gradient(circle_at_30%_90%,#777b45,transparent_50%),linear-gradient(135deg,#eee7c9,#c8c49b_55%,#777b4d)]">
        {/* Background grid */}
        <div className="absolute inset-0 -z-10 opacity-20 bg-[linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] bg-[size:45px_45px]" />

        {/* Floating orbs */}
        <div className="auth-orb absolute right-[12%] top-[12%] w-16 h-16 rounded-full bg-gradient-to-br from-[#fff9ce] to-[#777a3c] shadow-[inset_-8px_-8px_15px_#45482040,0_12px_30px_#44482030]" />

        <div className="auth-orb absolute right-[18%] top-[58%] w-7 h-7 rounded-full bg-gradient-to-br from-[#fff9ce] to-[#777a3c]" />

        <div className="auth-orb absolute left-[10%] bottom-[17%] w-10 h-10 rounded-full bg-gradient-to-br from-[#fff9ce] to-[#777a3c]" />

        {/* Brand */}
        <div className="relative z-10">
          <h2 className="font-serif text-3xl tracking-tight text-[#34351f]">
            PulseWork AI
          </h2>

          <p className="text-[9px] tracking-[3px] mt-1 text-[#34351f]">
            INTELLIGENCE IN MOTION
          </p>
        </div>

        {/* Main heading */}
        <div key={mode} className="relative z-10 mt-16 max-w-xl auth-content">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[2px] text-[#656b36]">
            <Sparkles size={15} />
            INTELLIGENCE MEETS SECURITY
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl xl:text-[58px] leading-[1.12] tracking-tight mt-5">
            {isRegister ? (
              <>
                Build a Safer.
                <br />
                <em className="text-[#626b35]">Smarter Future.</em>
              </>
            ) : (
              <>
                Smarter Security.
                <br />
                <em className="text-[#626b35]">Brighter Tomorrow.</em>
              </>
            )}
          </h1>

          <p className="max-w-md mt-5 text-sm leading-7 text-[#383a2d]">
            Join PulseWork AI and be a part of the next generation cybersecurity
            intelligence platform.
          </p>

          <div className="mt-7 space-y-3">
            {[
              { icon: ShieldCheck, text: "AI-Powered Threat Detection" },
              { icon: Zap, text: "Real-Time Intelligence" },
              { icon: LockKeyhole, text: "Enterprise-Grade Security" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm">
                <span className="w-7 h-7 rounded-full bg-[#92945d] text-white grid place-items-center shadow-md">
                  <Icon size={15} />
                </span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Shield illustration */}
        <div className="absolute right-[-15px] sm:right-5 bottom-12 w-[330px] sm:w-[390px] h-[300px] flex items-center justify-center">
          <div className="auth-orbit absolute w-[330px] h-[100px] rounded-[50%] border border-[#fff5c9] rotate-[-17deg]" />

          <div className="auth-orbit auth-orbit-reverse absolute w-[290px] h-[140px] rounded-[50%] border border-[#fff5c9]" />

          <div className="absolute bottom-5 w-64 h-14 rounded-[50%] border-2 border-[#f9e9a8] bg-[#777b4350] shadow-[0_10px_20px_#34351e50,inset_0_4px_12px_#fff7d4]" />

          <div className="auth-shield relative z-10 text-[#fff5c9] drop-shadow-[0_10px_15px_#4d502c70]">
            <ShieldCheck size={165} strokeWidth={1.1} />
          </div>

          <span className="absolute top-12 left-8 w-3 h-3 rounded-full bg-[#fff4b7] shadow-[0_0_15px_5px_#fff3ae]" />

          <span className="absolute top-24 right-4 w-3 h-3 rounded-full bg-[#fff4b7] shadow-[0_0_15px_5px_#fff3ae]" />
        </div>

        {/* Footer */}
        <div className="absolute left-8 sm:left-12 lg:left-16 bottom-8 flex items-center gap-3 text-xs text-white">
          <ShieldCheck size={18} />
          Secure <i className="w-1 h-1 rounded-full bg-white" />
          Smart <i className="w-1 h-1 rounded-full bg-white" />
          Reliable
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-10 py-10 bg-[radial-gradient(circle_at_100%_0%,#fffdf0,transparent_38%),linear-gradient(145deg,#f9f5e9,#e9e2ca)]">
        {/* Glass card */}
        <div className="w-full max-w-[470px] p-6 sm:p-9 rounded-[28px] border border-white/80 bg-white/40 backdrop-blur-2xl shadow-[0_25px_70px_#77754b20,inset_0_1px_0_white] auth-card">
          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-full bg-[#e9e5d7a6] mb-8">
            <button
              type="button"
              onClick={() => changeMode("login")}
              className={`flex items-center justify-center gap-2 py-3 rounded-full text-sm transition-all duration-300 ${
                !isRegister
                  ? "text-white bg-gradient-to-r from-[#a5a05c] to-[#62662f] shadow-md"
                  : "text-[#555545] hover:text-[#77783d]"
              }`}
            >
              <LogIn size={18} />
              Login
            </button>

            <button
              type="button"
              onClick={() => changeMode("register")}
              className={`flex items-center justify-center gap-2 py-3 rounded-full text-sm transition-all duration-300 ${
                isRegister
                  ? "text-white bg-gradient-to-r from-[#a5a05c] to-[#62662f] shadow-md"
                  : "text-[#555545] hover:text-[#77783d]"
              }`}
            >
              <UserPlus size={18} />
              Register
            </button>
          </div>

          <div key={mode} className="auth-content">
            {/* Heading */}
            <div className="mb-6">
              <span className="text-[9px] tracking-[2px] font-bold text-[#777943]">
                {isRegister ? "CREATE YOUR ACCOUNT" : "WELCOME TO PULSEWORK"}
              </span>

              <h2 className="font-serif text-3xl mt-3 text-[#28291b]">
                {isRegister ? "Create Account" : "Welcome Back!"}
              </h2>

              <p className="text-sm text-[#777568] mt-2">
                {isRegister
                  ? "Start your journey with PulseWork AI."
                  : "Sign in to continue to PulseWork AI"}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              {isRegister && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-2">
                    Full Name
                  </label>

                  <div className="auth-input">
                    <UserRound size={18} />

                    <input
                      placeholder="Enter your full name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 3,
                          message: "Enter at least 3 characters",
                        },
                      })}
                    />
                  </div>

                  {errors.name && (
                    <p className="auth-error">{errors.name.message}</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-2">
                  Email Address
                </label>

                <div className="auth-input">
                  <Mail size={18} />

                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                </div>

                {errors.email && (
                  <p className="auth-error">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-2">
                  Password
                </label>

                <div className="auth-input">
                  <LockKeyhole size={18} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      validate: (value) =>
                        !isRegister ||
                        passwordRules.every((rule) => rule.test(value)) ||
                        "Password does not meet all requirements",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#77775c] hover:text-[#444820]"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="auth-error">{errors.password.message}</p>
                )}

                {/* Password strength */}
                {isRegister && password.length > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-white/60">
                    <div className="flex justify-between text-[11px] mb-2">
                      <span>Password Strength</span>

                      <strong className="text-[#72773d]">
                        {passedRules === 6
                          ? "Strong"
                          : passedRules >= 4
                            ? "Good"
                            : "Weak"}
                      </strong>
                    </div>

                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4].map((bar) => (
                        <span
                          key={bar}
                          className={`h-1 flex-1 rounded-full ${
                            bar <= Math.ceil(passedRules / 1.5)
                              ? "bg-[#858747]"
                              : "bg-[#dedbc9]"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {passwordRules.map((rule, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-1 text-[9px] ${
                            rule.test(password)
                              ? "text-[#69713b]"
                              : "text-[#a09d8c]"
                          }`}
                        >
                          {rule.test(password) ? (
                            <Check size={12} />
                          ) : (
                            <X size={12} />
                          )}

                          {rule.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              {isRegister && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-2">
                    Confirm Password
                  </label>

                  <div className="auth-input">
                    <LockKeyhole size={18} />

                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-[#77775c]"
                    >
                      {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="auth-error">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}

              {/* Remember me */}
              {!isRegister && (
                <div className="flex justify-between items-center text-[11px] mb-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-[#777a3e]"
                      {...register("remember")}
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setMessage(
                        "Password recovery will be available after backend integration.",
                      )
                    }
                    className="text-[#77783d] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Message */}
              {message && (
                <div className="rounded-lg bg-[#f1e9ce] text-[#696333] text-xs p-3 mb-4">
                  {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#aaa45f] to-[#666a32] text-white font-semibold text-sm flex items-center justify-center gap-3 shadow-lg shadow-[#6d703c35] hover:-translate-y-1 hover:shadow-xl hover:brightness-105 active:scale-[.98] transition-all duration-300"
              >
                {isRegister ? "Create Account" : "Login"}
                <ArrowRight size={19} />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <span className="h-px bg-[#d9d4c4] flex-1" />

              <p className="text-[10px] text-[#858272]">or continue with</p>

              <span className="h-px bg-[#d9d4c4] flex-1" />
            </div>

            {/* Google login */}
            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Google sign-in requires backend authentication setup.",
                )
              }
              className="w-full h-11 rounded-full bg-white/80 border border-white flex items-center justify-center gap-3 text-xs font-semibold hover:bg-white hover:-translate-y-0.5 transition-all duration-300"
            >
              <b className="text-lg text-[#4285f4]">G</b>
              Continue with Google
            </button>

            {/* Switch */}
            <div className="flex justify-center flex-wrap gap-1 items-center mt-5 text-[11px] text-[#777568]">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}

              <button
                type="button"
                onClick={() => changeMode(isRegister ? "login" : "register")}
                className="flex items-center gap-1 text-[#74783d] font-bold hover:underline"
              >
                {isRegister ? "Login here" : "Register here"}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Security footer */}
          <div className="border-t border-[#dedacb] mt-5 pt-4 flex justify-center items-center gap-2 text-[10px] text-[#81806e]">
            <ShieldCheck size={15} />
            Your security is our priority.
          </div>
        </div>

        <p className="mt-5 text-[10px] text-[#999582]">
          © {new Date().getFullYear()} PulseWork AI. All rights reserved.
        </p>
      </section>
    </main>
  );
}
