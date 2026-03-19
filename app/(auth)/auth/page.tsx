"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-toastify";
import { buyerAuth, verifyBuyerOtp } from "@/lib/auth/buyerAuth";
import { handleNewUser } from "@/lib/auth/handleNewUser";
import { useSearchParams } from "next/navigation";

type UserMode = "seller" | "buyer";
type Step = "form" | "otp" | "done";

// Maps Supabase error messages to human-friendly strings
function getSellerLoginError(err: unknown): string {
  const msg = err instanceof Error ? err.message.toLowerCase() : "";

  if (msg.includes("invalid login credentials"))
    return "Wrong email or password. Please try again.";
  if (msg.includes("email not confirmed"))
    return "Your email isn't verified yet — check your inbox for a confirmation link.";
  if (msg.includes("user already registered"))
    return "An account with this email already exists. Try signing in instead.";
  if (msg.includes("too many requests") || msg.includes("rate limit"))
    return "Too many attempts. Please wait a moment and try again.";

  return err instanceof Error
    ? `Authentication failed: ${err.message}`
    : "Authentication failed. Please try again.";
}

function getOtpError(err: unknown): string {
  const msg = err instanceof Error ? err.message.toLowerCase() : "";

  if (msg.includes("token has expired") || msg.includes("otp expired"))
    return "That code has expired. Please request a new one.";
  if (msg.includes("invalid") || msg.includes("incorrect"))
    return "That code is incorrect. Double-check and try again.";
  if (msg.includes("too many") || msg.includes("rate limit"))
    return "Too many attempts. Please wait and try again.";

  return "Verification failed. Please try again.";
}

function getBuyerError(err: unknown): string {
  const msg = err instanceof Error ? err.message.toLowerCase() : "";

  if (msg.includes("too many") || msg.includes("rate limit"))
    return "Too many requests. Please wait a moment and try again.";
  if (msg.includes("invalid email") || msg.includes("unable to validate"))
    return "That doesn't look like a valid email address.";

  return "Something went wrong. Please try again.";
}

export default function AuthPage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const nextRoute = searchParams.get("next") || "/";

  const [mode, setMode] = useState<UserMode>("seller");
  const [step, setStep] = useState<Step>("form");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const startResendTimer = () => {
    setResendTimer(60);

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBuyerEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await buyerAuth(email, "");
      if (user) {
        await handleNewUser(email, null, "buyer");
        window.location.href = nextRoute;
      } else {
        setStep("otp");
        startResendTimer();
        toast.success("Code sent! Check your inbox.");
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error(getBuyerError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleBuyerOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = await verifyBuyerOtp(email, otp);
      if (!userId) {
        toast.error("Couldn't verify your code. Please try again.");
        return;
      }
      await handleNewUser(email, null, "buyer");
      window.location.href = nextRoute;
    } catch (err: unknown) {
      console.error(err);
      toast.error(getOtpError(err));
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
        await handleNewUser(email, null, "seller");
        window.location.href = nextRoute;
      } else {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match.");
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
        setStep("otp");
        startResendTimer();
        toast.success(
          "Account created! Check your email for the verification code.",
        );
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error(getSellerLoginError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSellerOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });
      if (error) throw error;

      if (!data.user?.email_confirmed_at) {
        toast.error("Email not confirmed. Request a new code and try again.");
        return;
      }

      await handleNewUser(email, null, "seller");
      window.location.href = nextRoute;
    } catch (err: unknown) {
      console.error(err);
      toast.error(getOtpError(err));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-[#1A1A1A]/[0.12] rounded-lg px-4 py-2.5 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#2D5BE3]/50 placeholder:text-[#1A1A1A]/25 bg-[#F7F5F0] transition-colors";
  const btnClass =
    "w-full py-3 rounded-full bg-[#1A1A1A] text-white font-medium text-sm hover:bg-[#2D5BE3] transition-colors duration-200 disabled:opacity-50";

  const isOtpStep = step === "otp";

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-2xl border border-[#1A1A1A]/[0.07] shadow-sm w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
            {isOtpStep
              ? "Check your email"
              : mode === "seller"
                ? isLogin
                  ? "Welcome back"
                  : "Create account"
                : "Sign in"}
          </h1>
          <p className="text-[#1A1A1A]/40 text-sm mt-1">
            {isOtpStep
              ? `We sent a 6-digit code to ${email}.`
              : mode === "seller"
                ? isLogin
                  ? "Sign in to your seller account."
                  : "Start selling on the marketplace."
                : "No password needed — we'll email you a code."}
          </p>
        </div>

        {/* Mode toggle — hidden on OTP step */}
        {!isOtpStep && (
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
        )}

        {/* ── OTP step (shared UI for both modes) ── */}
        {isOtpStep && (
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
            <form
              onSubmit={
                mode === "seller" ? handleSellerOtpSubmit : handleBuyerOtpSubmit
              }
              className="space-y-3"
            >
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
                disabled={resendTimer > 0 || loading}
                type="button"
                onClick={async () => {
                  if (resendTimer > 0) return;

                  try {
                    if (mode === "seller") {
                      await supabase.auth.signInWithOtp({
                        email,
                        options: { shouldCreateUser: true },
                      });
                    } else {
                      await buyerAuth(email, "");
                    }
                    toast.success("New code sent!");
                    startResendTimer();
                  } catch (err: unknown) {
                    console.error(err);
                    toast.error("Couldn't resend the code. Please try again.");
                  }
                }}
                className="text-[#2D5BE3] hover:underline disabled:opacity-40 disabled:no-underline"
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
              </button>
              {" · "}
              {(mode === "buyer" || isLogin) && (
                <button
                  type="button"
                  onClick={() => {
                    setStep("form");
                    setOtp("");
                  }}
                  className="text-[#2D5BE3] hover:underline"
                >
                  Go back
                </button>
              )}
            </p>
          </>
        )}

        {/* ── SELLER: form ── */}
        {mode === "seller" && !isOtpStep && (
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
              By continuing you agree to our{" "}
              <Link href="/tos" className="text-[#2D5BE3] hover:underline">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="text-[#2D5BE3] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </>
        )}

        {/* ── BUYER: email form ── */}
        {mode === "buyer" && !isOtpStep && (
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
      </div>
    </div>
  );
}
