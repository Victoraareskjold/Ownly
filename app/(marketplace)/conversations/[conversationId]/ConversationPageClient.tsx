"use client";
import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/lib/actions/sendMessage";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";

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
      <div className="flex items-center justify-center h-full">
        <p className="text-[#1A1A1A]/40 text-sm">Conversation not found.</p>
      </div>
    );
  }

  const handleSend = async () => {
    const content = input.trim();
    if (!content || sending) return;
    setSending(true);
    setInput("");

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
      setMessages((prev) => prev.filter((m) => m.id !== tempMsg.id));
      setInput(content);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl flex flex-col mx-auto px-6 py-12 h-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#1A1A1A]/35 mb-8 font-medium">
        <Link
          href="/conversations"
          className="hover:text-[#2D5BE3] transition-colors"
        >
          Messages
        </Link>
        <span>/</span>
        <span className="text-[#1A1A1A]/55">
          {conversation.products?.name ?? "Unknown product"}
        </span>
      </nav>

      {/* Chat card */}
      <div className="flex-1 flex flex-col min-h-0 rounded-xl border border-[#1A1A1A]/[0.07] bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-center gap-3 px-6 py-4 border-b border-[#1A1A1A]/[0.07]">
          <div className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-sm font-semibold text-white shrink-0">
            {conversation.products?.name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div>
            <p className="font-semibold text-sm text-[#1A1A1A] leading-tight">
              {conversation.products?.name ?? "Unknown product"}
            </p>
            <p className="text-xs text-[#1A1A1A]/40">
              @{conversation.profiles?.name ?? "Unknown seller"}
            </p>
          </div>
          {conversation.products?.id && (
            <Link
              href={`/products/${conversation.products.id}`}
              className="ml-auto text-xs font-medium text-[#2D5BE3] hover:underline transition-colors"
            >
              See product →
            </Link>
          )}
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-2">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-16">
              <div className="w-10 h-10 rounded-full bg-[#F7F5F0] flex items-center justify-center mb-3">
                <svg
                  width="16"
                  height="16"
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
                No messages yet.
              </p>
              <p className="text-[#1A1A1A]/40 text-xs mt-1">Say hi! 👋</p>
            </div>
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
                  <div className="w-7 h-7 rounded-full bg-[#1A1A1A] shrink-0 flex items-center justify-center text-xs font-semibold text-white mb-0.5">
                    {msg.profiles?.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
                <div
                  className={`max-w-[72%] flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}
                >
                  {showName && (
                    <span className="text-xs text-[#1A1A1A]/35 px-1">
                      {msg.profiles?.name}
                    </span>
                  )}
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMe
                        ? "bg-[#1A1A1A] text-white rounded-br-sm"
                        : "bg-[#F7F5F0] text-[#1A1A1A] rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-xs text-[#1A1A1A]/30 px-1">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 px-5 py-4 border-t border-[#1A1A1A]/[0.07] flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Skriv en melding…"
            className="flex-1 rounded-full border border-[#1A1A1A]/[0.1] bg-[#F7F5F0] px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30 placeholder:text-[#1A1A1A]/30"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="rounded-full bg-[#1A1A1A] hover:bg-[#2D5BE3] text-white w-10 h-10 flex items-center justify-center shrink-0 disabled:opacity-30 transition-colors duration-200"
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
    </div>
  );
}
