"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Msg = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
  profiles: { id: string; name: string } | null;
};

export function useMessages(
  conversationId: string,
  initialMessages: Msg[],
  partnerProfile: { id: string; name: string } | null,
) {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const supabase = createClient();

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new;

          setMessages((prev) => {
            if (prev.some((m) => m.id === newMessage.id)) return prev;

            const mappedMsg: Msg = {
              id: newMessage.id,
              conversationId: newMessage.conversation_id,
              senderId: newMessage.sender_id,
              content: newMessage.content,
              createdAt: newMessage.created_at,
              readAt: newMessage.read_at,
              profiles: partnerProfile,
            };

            return [...prev, mappedMsg];
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, partnerProfile, supabase]);

  return { messages, setMessages };
}
