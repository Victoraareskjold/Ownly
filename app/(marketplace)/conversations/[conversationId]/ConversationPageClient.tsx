"use client";
import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/lib/actions/sendMessage";

type MsgProfile = { id: string; name: string };
type Msg = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
  profiles: MsgProfile | null;
};
type Conversation = {
  id: string;
  products: { id: string; name: string; tagline: string } | null;
  profiles: { id: string; name: string } | null;
  messages: Msg[];
};

interface Props {
  conversation: Conversation | null;
  userId: string;
}

export default function ConversationPageClient({
  conversation,
  userId,
}: Props) {
  const [messages, setMessages] = useState<Msg[]>(conversation?.messages ?? []);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Samtale ikke funnet.</p>
      </div>
    );
  }

  const handleSend = async () => {
    const content = input.trim();
    if (!content || sending) return;
    setSending(true);
    setInput("");

    // Optimistisk oppdatering
    const tempMsg: Msg = {
      id: crypto.randomUUID(),
      conversationId: conversation.id,
      senderId: userId,
      content,
      createdAt: new Date().toISOString(),
      readAt: null,
      profiles: null,
    };
    setMessages((prev) => [...prev, tempMsg]);

    try {
      await sendMessage({ conversationId: conversation.id, content });
    } catch {
      // Fjern optimistisk melding ved feil
      setMessages((prev) => prev.filter((m) => m.id !== tempMsg.id));
      setInput(content);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-dvh max-w-2xl mx-auto">
      {/* Header */}
      <div className="shrink-0 flex items-center gap-3 px-6 py-4 border-b bg-background">
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
          {conversation.products?.name?.[0]?.toUpperCase() ?? "?"}
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">
            {conversation.products?.name ?? "Ukjent produkt"}
          </p>
          <p className="text-xs text-muted-foreground">
            {conversation.profiles?.name ?? "Ukjent selger"}
          </p>
        </div>
      </div>

      {/* Meldingsliste */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {messages.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            Ingen meldinger ennå. Si hei! 👋
          </p>
        )}
        {messages.map((msg, i) => {
          const isMe = msg.senderId === userId;
          const showName =
            !isMe &&
            msg.profiles?.name &&
            msg.profiles.name !== messages[i - 1]?.profiles?.name;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <div className="w-7 h-7 rounded-full bg-muted shrink-0 flex items-center justify-center text-xs font-semibold text-muted-foreground mb-0.5">
                  {msg.profiles?.name?.[0]?.toUpperCase() ?? "?"}
                </div>
              )}
              <div
                className={`max-w-[72%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-0.5`}
              >
                {showName && (
                  <span className="text-xs text-muted-foreground px-1">
                    {msg.profiles?.name}
                  </span>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-xs text-muted-foreground px-1">
                  {new Date(msg.createdAt).toLocaleTimeString("nb-NO", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-6 py-4 border-t bg-background flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Skriv en melding…"
          className="flex-1 rounded-full border bg-muted/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || sending}
          className="rounded-full bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center shrink-0 disabled:opacity-40 hover:bg-primary/90 transition-colors"
          aria-label="Send melding"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 translate-x-0.5"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
