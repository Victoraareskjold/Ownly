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
    <div className="max-w-2xl min-h-screen mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Meldinger</h1>

      {conversations.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <p className="text-lg font-medium">Ingen samtaler ennå</p>
          <p className="text-sm mt-1">Samtaler du starter vil dukke opp her.</p>
        </div>
      ) : (
        <ul className="border rounded-xl overflow-hidden divide-y divide-border">
          {conversations.map((convo) => (
            <li key={convo.id}>
              <Link
                href={`/conversations/${convo.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors group"
              >
                {/* Avatar placeholder */}
                <div className="shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                  {convo.products?.name?.[0]?.toUpperCase() ?? "?"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm truncate">
                      {convo.products?.name ?? "Ukjent produkt"}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(convo.lastMessageAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">
                    Selger: {convo.profiles?.name ?? "Ukjent"}
                  </p>
                </div>

                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
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
