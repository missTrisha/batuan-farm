// src/pages/LoginPage.tsx
import { useState } from "react";
import type { SyntheticEvent } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiMapPin,
} from "react-icons/fi";
import { FaSeedling, FaHandshake, FaLeaf, FaWarehouse } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import farmImg from "../assets/images/farm.png";
import logoImg from "../assets/images/logo.jpg";

const features = [
  { icon: FaSeedling, label: "Support Farmers" },
  { icon: FaHandshake, label: "Build Communities" },
  { icon: FaLeaf, label: "Promote Sustainable Farming" },
  { icon: FaWarehouse, label: "Healthy Food Systems" },
];

function Brand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <img
        src={logoImg}
        alt="Batuan MAO logo"
        className="h-16 w-16 shrink-0 rounded-2xl bg-black object-contain"
      />
      <div className="flex flex-col leading-none">
        <span className="text-[0.7rem] font-bold uppercase tracking-wider">
          Municipal Agriculture Office
        </span>
        <span className="font-serif text-3xl font-extrabold uppercase tracking-wide">
          Batuan
        </span>
        <span className="text-xs uppercase tracking-[0.5em]">Masbate</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    // Signed in. Redirecting to the dashboard comes in a later step.
  }

  return (
    <div className="auth-bg grid min-h-screen place-items-center p-4 font-sans text-ink lg:p-6">
      <div className="grid w-full max-w-md animate-fade-up overflow-hidden rounded-3xl bg-surface shadow-card lg:max-w-275 lg:min-h-160 lg:grid-cols-[1.1fr_1fr]">
        {/* Left hero panel (desktop only) */}
        <section className="relative hidden flex-col justify-between gap-8 p-10 text-white lg:flex">
          <img
            src={farmImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.1)_35%,rgba(10,30,12,0.85)_100%)]" />

          <Brand className="relative" />

          <div className="relative">
            <h2 className="mb-3.5 font-serif text-3xl leading-tight">
              Growing a stronger agricultural community{" "}
              <span className="text-gold-300">for a better tomorrow.</span>
            </h2>
            <p className="max-w-85 text-sm leading-relaxed text-white/90">
              The Municipal Agriculture Office of Batuan is committed to
              supporting our farmers, empowering our communities, and building a
              sustainable future for our municipality.
            </p>
          </div>

          <div className="relative grid grid-cols-4 gap-3 border-t border-white/25 pt-5">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 text-center text-[0.7rem] font-semibold leading-tight"
              >
                <Icon className="text-2xl" />
                {label}
              </div>
            ))}
          </div>

          <div className="relative flex items-center gap-1.5 text-xs text-white/90">
            <FiMapPin />
            Batuan, Masbate • Philippines
          </div>
        </section>

        {/* Right form panel */}
        {/* <section className="flex items-center justify-center bg-surface px-5 py-8 sm:px-7 sm:py-9 lg:px-10 lg:py-12"> */}
        <section className="flex items-center justify-center bg-[#e4f3ea] px-5 py-8 sm:px-7 sm:py-9 lg:px-10 lg:py-12">
          <div className="w-full max-w-95">
            <Brand className="mb-9 text-ink" />

            <h1 className="font-serif text-3xl font-bold text-ink">
              Welcome Back
            </h1>
            <p className="mb-7 mt-1 text-[0.95rem] text-muted">
              Sign in to your MAO account
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-bold">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <FiMail className="pointer-events-none absolute left-3.5 text-muted" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 w-full rounded-xl border-mint-300 bg-white pl-11 pr-4 text-[0.95rem] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <FiLock className="pointer-events-none absolute left-3.5 text-muted" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl borderborder-mint-300 bg-white pl-11 pr-12 text-[0.95rem] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-1.5 grid h-9 w-9 min-h-0 place-items-center rounded-lg text-muted hover:bg-primary/10"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-4 rounded-xl bg-danger-bg px-3.5 py-2.5 text-sm text-danger"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12.5 w-full items-center justify-center gap-2.5 rounded-xl bg-primary text-[0.98rem] font-bold text-on-primary transition hover:bg-primary-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign In"}
                {!loading && (
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
