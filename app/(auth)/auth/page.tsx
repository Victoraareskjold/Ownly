"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-toastify";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showCheckEmail, setShowCheckEmail] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isMarketingChecked, setIsMarketingChecked] = useState(false);

  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const inviteCode = searchParams.get("inviteCode");
    if (inviteCode) {
      localStorage.setItem("inviteCode", inviteCode);
      setIsLogin(false);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        /* LOGIN */
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = "/";
      } else {
        /* Signup */
        if (!isChecked) {
          toast.error("You must accept the Terms and Privacy Policy.");
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        localStorage.setItem(
          "marketing_consent",
          JSON.stringify(isMarketingChecked),
        );
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
        setShowCheckEmail(true);
        toast.success("Please check your email to verify your account.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Authentication failed: ${err.message}`);
      } else {
        toast.error("Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isLogin && !isChecked) {
      toast.error("You must accept the Terms and Privacy Policy.");
      return;
    }

    localStorage.setItem(
      "marketing_consent",
      JSON.stringify(isMarketingChecked),
    );

    const planId = searchParams.get("planId");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/onboarding${
          planId ? `&planId=${planId}` : ""
        }`,
      },
    });

    if (error) {
      toast.error(`Authentication failed: ${error.message}`);
    }
  };

  const handleGithubLogin = async () => {
    if (!isLogin && !isChecked) {
      toast.error("You must accept the Terms and Privacy Policy.");
      return;
    }

    localStorage.setItem(
      "marketing_consent",
      JSON.stringify(isMarketingChecked),
    );

    const planId = searchParams.get("planId");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/onboarding${
          planId ? `&planId=${planId}` : ""
        }`,
      },
    });

    if (error) {
      toast.error(`GitHub login failed: ${error.message}`);
    }
  };

  if (showCheckEmail) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 sm:p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Check Your Email
          </h2>

          <p className="text-slate-600 mb-6">
            We&apos;ve sent a verification link to{" "}
            <span className="font-semibold text-slate-800">{email}</span>
          </p>

          <p className="text-sm text-slate-500 mb-8">
            Click the link in the email to verify your account and get started.
            If you don&apos;t see it, check your spam folder.
          </p>

          <button
            onClick={() => {
              setShowCheckEmail(false);
              setIsLogin(true);
              setEmail("");
            }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-md hover:opacity-90 transition duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 sm:p-12">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {!isLogin && (
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="mt-1 cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-slate-600 cursor-pointer"
                >
                  I accept the{" "}
                  <Link href="/tos" className="text-indigo-600 underline">
                    Terms of Service
                  </Link>
                  ,{" "}
                  <Link href="/privacy" className="text-indigo-600 underline">
                    Privacy Policy
                  </Link>
                  , and{" "}
                  <Link href="/dpa" className="text-indigo-600 underline">
                    Data Processing Agreement
                  </Link>
                  .
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={isMarketingChecked}
                  onChange={(e) => setIsMarketingChecked(e.target.checked)}
                  className="mt-1 cursor-pointer"
                />
                <label
                  htmlFor="marketing"
                  className="text-sm text-slate-600 cursor-pointer"
                >
                  I wish to receive newsletters and marketing emails.
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-md hover:opacity-90 transition duration-200"
          >
            {loading ? "Loading..." : isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Github
          </button>
        </div>
        {isLogin && (
          <p className="mt-4 text-center text-xs text-slate-500">
            By continuing, you agree to your{" "}
            <label htmlFor="terms">
              <Link href="/tos" className="text-indigo-600 underline">
                Terms of Service
              </Link>
              ,{" "}
              <Link href="/privacy" className="text-indigo-600 underline">
                Privacy Policy
              </Link>
              , and{" "}
              <Link href="/dpa" className="text-indigo-600 underline">
                Data Processing Agreement
              </Link>
              .
            </label>
          </p>
        )}
      </div>
    </div>
  );
}
