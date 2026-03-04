"use client";
import Link from "next/link";

type ConversationItem = {
  id: string;
  lastMessageAt: string;
  products: { id: string; name: string; tagline: string } | null;
  profiles: { id: string; name: string } | null;
};

interface Props {
  conversations: ConversationItem[];
}

export default function ConversationsPageClient({ conversations }: Props) {
  return (
    <div className="max-w-6xl flex flex-col h-full mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1A1A1A]">
          Messages
        </h1>
        <p className="text-[#1A1A1A]/50 text-lg leading-relaxed mt-2">
          Conversations you have started with sellers.
        </p>
      </div>

      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-xl border border-[#1A1A1A]/[0.07] bg-white">
          <div className="w-12 h-12 rounded-full bg-[#F7F5F0] flex items-center justify-center mb-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A1A1A"
              strokeOpacity="0.3"
              strokeWidth="1.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-[#1A1A1A] font-semibold text-sm">
            No conversations yet.
          </p>
          <p className="text-[#1A1A1A]/40 text-xs mt-1">
            Conversations will show here.
          </p>
        </div>
      ) : (
        <ul className="rounded-xl border border-[#1A1A1A]/[0.07] overflow-hidden divide-y divide-[#1A1A1A]/[0.05] bg-white shadow-sm">
          {conversations.map((convo) => (
            <li key={convo.id}>
              <Link
                href={`/conversations/${convo.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-[#F7F5F0] transition-colors duration-200 group"
              >
                {/* Avatar */}
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-sm font-semibold text-white">
                  {convo.products?.name?.[0]?.toUpperCase() ?? "?"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-[#1A1A1A] truncate">
                      {convo.products?.name ?? "Unknown product"}
                    </span>
                    <span className="text-xs text-[#1A1A1A]/35 whitespace-nowrap">
                      {formatDate(convo.lastMessageAt)}
                    </span>
                  </div>
                  <p className="text-xs text-[#1A1A1A]/40 truncate mt-0.5">
                    Selger:{" "}
                    <span className="text-[#1A1A1A]/60">
                      @{convo.profiles?.name ?? "UUnknown"}
                    </span>
                  </p>
                </div>

                <span className="text-[#1A1A1A]/20 group-hover:text-[#2D5BE3] transition-colors duration-200 text-sm">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0)
    return date.toLocaleTimeString("nb-NO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  if (diffDays === 1) return "I går";
  if (diffDays < 7)
    return date.toLocaleDateString("nb-NO", { weekday: "long" });
  return date.toLocaleDateString("nb-NO", { day: "numeric", month: "short" });
}
