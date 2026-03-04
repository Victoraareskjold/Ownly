"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-toastify";
import { buyerAuth, verifyBuyerOtp } from "@/lib/auth/buyerAuth";

type UserMode = "seller" | "buyer";
type Step = "form" | "otp" | "done";

export default function AuthPage() {
  const supabase = createClient();

  const [mode, setMode] = useState<UserMode>("seller");
  const [step, setStep] = useState<Step>("form");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleBuyerEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await buyerAuth(email, "");
      if (user) {
        window.location.href = "/";
      } else {
        setStep("otp");
      }
    } catch (err: unknown) {
      toast.error("Something went wrong.");

      console.error(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBuyerOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = await verifyBuyerOtp(email, otp);
      if (!userId) return;
      window.location.href = "/";
    } catch (err: unknown) {
      toast.error("Something went wrong.");
      console.error(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSellerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = "/";
      } else {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { role: "seller" },
          },
        });
        if (signUpError) throw signUpError;
        setPassword("");
        setConfirmPassword("");
        toast.success("Please check your email to verify your account.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Authentication failed: ${err.message}`);
        console.error(err);
      } else {
        toast.error("Authentication failed");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-[#1A1A1A]/[0.12] rounded-lg px-4 py-2.5 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#2D5BE3]/50 placeholder:text-[#1A1A1A]/25 bg-[#F7F5F0] transition-colors";
  const btnClass =
    "w-full py-3 rounded-full bg-[#1A1A1A] text-white font-medium text-sm hover:bg-[#2D5BE3] transition-colors duration-200 disabled:opacity-50";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-white to-orange-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 sm:p-12">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
            {mode === "seller"
              ? isLogin
                ? "Welcome back"
                : "Create account"
              : step === "otp"
                ? "Check your email"
                : "Sign in"}
          </h1>
          <p className="text-[#1A1A1A]/40 text-sm mt-1">
            {mode === "seller"
              ? isLogin
                ? "Sign in to your seller account."
                : "Start selling on the marketplace."
              : step === "otp"
                ? `We sent a 6-digit code to ${email}.`
                : "No password needed, we'll email you a code."}
          </p>
        </div>

        <div className="flex gap-1 p-1 rounded-lg bg-[#F7F5F0] border border-[#1A1A1A]/[0.07] mb-6">
          {(["seller", "buyer"] as UserMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setEmail("");
                setOtp("");
                setStep("form");
              }}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                mode === m
                  ? "bg-white text-[#1A1A1A] shadow-sm"
                  : "text-[#1A1A1A]/40 hover:text-[#1A1A1A]/60"
              }`}
            >
              {m === "seller" ? "I'm a seller" : "I'm a buyer"}
            </button>
          ))}
        </div>

        {mode === "seller" && (
          <>
            <form onSubmit={handleSellerSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
              {!isLogin && (
                <input
                  type="password"
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClass}
                />
              )}
              <button type="submit" disabled={loading} className={btnClass}>
                {loading
                  ? "Loading..."
                  : isLogin
                    ? "Sign in →"
                    : "Create account →"}
              </button>
            </form>

            <p className="text-center text-xs text-[#1A1A1A]/35 mt-4">
              {isLogin ? "No account yet?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#2D5BE3] hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>

            <p className="text-center text-xs text-[#1A1A1A]/25 mt-5 leading-relaxed">
              By continuing you agree to our <br />
              <Link href="/tos" className="text-[#2D5BE3] hover:underline">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="text-[#2D5BE3] hover:underline">
                Privacy Policy
              </Link>{" "}
              .
            </p>
          </>
        )}

        {mode === "buyer" && step === "form" && (
          <form onSubmit={handleBuyerEmailSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <button type="submit" disabled={loading} className={btnClass}>
              {loading ? "Sending..." : "Send me a code →"}
            </button>
          </form>
        )}

        {mode === "buyer" && step === "otp" && (
          <>
            <div className="w-12 h-12 rounded-xl bg-[#F7F5F0] border border-[#1A1A1A]/[0.07] flex items-center justify-center mb-5 mx-auto">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2D5BE3"
                strokeWidth="2"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <form onSubmit={handleBuyerOtpSubmit} className="space-y-3">
              <input
                required
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="······"
                className="w-full border border-[#1A1A1A]/[0.12] rounded-lg px-4 py-3 text-[#1A1A1A] text-2xl font-mono tracking-[0.5em] text-center focus:outline-none focus:border-[#2D5BE3]/50 bg-[#F7F5F0] transition-colors"
              />
              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className={btnClass}
              >
                {loading ? "Verifying..." : "Verify & sign in →"}
              </button>
            </form>
            <p className="text-center text-xs text-[#1A1A1A]/30 mt-4">
              Didn&apos;t get it?{" "}
              <button
                type="button"
                onClick={() => supabase.auth.signInWithOtp({ email })}
                className="text-[#2D5BE3] hover:underline"
              >
                Resend
              </button>
              {" · "}
              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setOtp("");
                }}
                className="text-[#2D5BE3] hover:underline"
              >
                Change email
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
