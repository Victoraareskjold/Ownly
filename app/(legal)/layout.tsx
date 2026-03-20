import "../globals.css";

export default async function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-dvh">
      <main id="main" className="flex-1 relative">
        <div
          className="pointer-events-none -z-10 fixed inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(#D4D0C8 1px, transparent 1px), linear-gradient(90deg, #D4D0C8 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="bg-white mx-auto max-w-3xl mt-12 p-4 rounded-md">
          {children}
        </div>
      </main>
    </div>
  );
}
