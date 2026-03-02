export default function ValueProps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mt-16 w-full">
      {[
        {
          label: "Buy once",
          desc: "No subscriptions, ever. Pay a one-time fee and own the code.",
        },
        {
          label: "",
          desc: "Sellers commit to bugfixes and updates for all buyers.",
        },
        {
          label: "Run it your way",
          desc: "Deploy on your own infra or Vercel/Supabase. Your data, always.",
        },
      ].map((item) => (
        <div
          key={item.label}
          className="border border-[#1A1A1A]/[0.07] bg-white rounded-xl p-5 text-left hover:border-[#2D5BE3]/30 hover:shadow-md transition-all duration-300 shadow-xs"
        >
          <p className="text-[#1A1A1A] font-semibold text-sm mb-2">
            {item.label}
          </p>
          <p className="text-[#1A1A1A]/40 text-xs leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
