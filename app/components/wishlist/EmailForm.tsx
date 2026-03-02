interface EmailFormProps {
  submitted: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: (value: string) => void;
  focused: boolean;
  setFocused: (value: boolean) => void;
  loading: boolean;
}
export default function EmailForm({
  submitted,
  handleSubmit,
  email,
  setEmail,
  focused,
  setFocused,
  loading,
}: EmailFormProps) {
  return (
    <>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div
            className={`flex flex-col md:flex-row border rounded-xl overflow-hidden transition-all duration-300 shadow-sm ${
              focused
                ? "border-[#2D5BE3]/50 bg-white shadow-[0_0_0_4px_rgba(45,91,227,0.08)]"
                : "border-[#1A1A1A]/12 bg-white"
            }`}
          >
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              required
              className="flex-1 bg-transparent px-5 py-4 text-[#1A1A1A] placeholder-[#1A1A1A]/25 outline-none text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-4 bg-[#1A1A1A] text-white font-semibold text-sm tracking-tight hover:bg-[#2D5BE3] active:scale-95 transition-all duration-200 whitespace-nowrap"
            >
              Get early access
            </button>
          </div>
          <p className="text-[#1A1A1A]/40 text-xs mt-3">
            No spam. We&apos;ll let you know when we launch.
          </p>
        </form>
      ) : (
        <div className="w-full max-w-md border border-[#2D5BE3]/20 bg-[#2D5BE3]/5 rounded-xl px-6 py-5 text-center">
          <p className="text-[#2D5BE3] font-semibold text-sm mb-1">
            ✓ You&apos;re on the list
          </p>
          <p className="text-[#1A1A1A]/40 text-xs">
            We&apos;ll reach out with news about Ownie.
          </p>
        </div>
      )}
    </>
  );
}
