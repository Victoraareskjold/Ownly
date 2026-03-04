"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { buyerAuth, verifyBuyerOtp } from "@/lib/auth/buyerAuth";
import { handleNewUser } from "@/lib/auth/handleNewUser";

type Step = "form" | "otp" | "done";

interface ContactSellerModalProps {
  onClose: () => void;
  sellerName: string;
  sellerId: string;
  productName: string;
  productId: string;
}

export default function ContactSellerModal({
  onClose,
  sellerName,
  sellerId,
  productName,
  productId,
}: ContactSellerModalProps) {
  const supabase = createClient();

  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [otp, setOtp] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await buyerAuth(email, name);
      if (user) {
        const userId = await handleNewUser(email, name, "seller");
        await sendMessage(userId);
        setStep("done");
      } else {
        setStep("otp");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userId = await verifyBuyerOtp(email, otp);
      if (!userId) return;
      await sendMessage(userId);
      setStep("done");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (userId: string) => {
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("product_id", productId)
      .eq("buyer_id", userId)
      .maybeSingle();

    const conversationId =
      existing?.id ??
      (
        await supabase
          .from("conversations")
          .insert({
            product_id: productId,
            buyer_id: userId,
            seller_id: sellerId,
          })
          .select("id")
          .maybeSingle()
      ).data?.id;

    const { error: messageError } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: userId,
      content: message,
    });
    if (messageError) throw messageError;
  };

  const resendOtp = async () => {
    setError("");
    await supabase.auth.signInWithOtp({ email });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl border border-[#1A1A1A]/[0.07] shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/70 text-lg transition-colors leading-none z-10"
        >
          ✕
        </button>

        {/* ── Step 1: Contact form ── */}
        {step === "form" && (
          <div className="p-8">
            <h3 className="text-2xl text-[#1A1A1A] mb-1 font-semibold">
              Contact seller
            </h3>
            <p className="text-[#1A1A1A]/45 text-sm mb-6">
              Book a demo or ask @{sellerName} a question about {productName}.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[#1A1A1A]/50 text-xs mb-1.5 font-medium uppercase tracking-wide">
                  Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#1A1A1A]/[0.12] rounded-lg px-4 py-2.5 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#2D5BE3]/50 placeholder:text-[#1A1A1A]/25 transition-colors bg-[#F7F5F0]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-[#1A1A1A]/50 text-xs mb-1.5 font-medium uppercase tracking-wide">
                  Work email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#1A1A1A]/[0.12] rounded-lg px-4 py-2.5 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#2D5BE3]/50 placeholder:text-[#1A1A1A]/25 transition-colors bg-[#F7F5F0]"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-[#1A1A1A]/50 text-xs mb-1.5 font-medium uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-[#1A1A1A]/[0.12] rounded-lg px-4 py-2.5 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#2D5BE3]/50 placeholder:text-[#1A1A1A]/25 resize-none transition-colors bg-[#F7F5F0]"
                  placeholder="Tell us a bit about what you're looking for..."
                />
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-[#1A1A1A] text-white font-medium text-sm hover:bg-[#2D5BE3] transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send message →"}
              </button>
            </form>
          </div>
        )}

        {/* ── Step 2: OTP verification ── */}
        {step === "otp" && (
          <div className="p-8">
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#1A1A1A]/15" />
              <div className="w-2 h-2 rounded-full bg-[#2D5BE3]" />
              <div className="w-2 h-2 rounded-full bg-[#1A1A1A]/15" />
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#F7F5F0] border border-[#1A1A1A]/[0.07] flex items-center justify-center mb-5">
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

            <h3 className="text-2xl text-[#1A1A1A] mb-1 font-semibold">
              Check your email
            </h3>
            <p className="text-[#1A1A1A]/45 text-sm mb-6">
              We sent a 6-digit code to{" "}
              <span className="text-[#1A1A1A]/70 font-medium">{email}</span>.
              Enter it below to confirm and send your message.
            </p>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <input
                required
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full border border-[#1A1A1A]/[0.12] rounded-lg px-4 py-3 text-[#1A1A1A] text-2xl font-mono tracking-[0.5em] text-center focus:outline-none focus:border-[#2D5BE3]/50 bg-[#F7F5F0] transition-colors"
                placeholder="······"
              />

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full py-3 rounded-full bg-[#1A1A1A] text-white font-medium text-sm hover:bg-[#2D5BE3] transition-colors duration-200 disabled:opacity-40"
              >
                {loading ? "Verifying..." : "Confirm & send message"}
              </button>
            </form>

            <p className="text-center text-xs text-[#1A1A1A]/30 mt-4">
              Didn&apos;t get it?{" "}
              <button
                onClick={resendOtp}
                className="text-[#2D5BE3] hover:underline"
              >
                Resend code
              </button>
            </p>
          </div>
        )}

        {/* ── Step 3: Done ── */}
        {step === "done" && (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#2D5BE3]/10 border border-[#2D5BE3]/20 flex items-center justify-center mx-auto mb-5">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2D5BE3"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-2xl text-[#1A1A1A] mb-2 font-semibold">
              Message sent
            </h3>
            <p className="text-[#1A1A1A]/45 text-sm mb-6 leading-relaxed">
              @{sellerName} will get back to you at{" "}
              <span className="text-[#1A1A1A]/70 font-medium">{email}</span>.
              You can also track the conversation in your buyer dashboard.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-[#1A1A1A] text-white font-medium text-sm hover:bg-[#2D5BE3] transition-colors duration-200"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
