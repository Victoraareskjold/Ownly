import { Message } from "@/lib/types/conversation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapMessage(m: any): Message {
  return {
    id: m.id,
    conversationId: m.conversation_id,
    senderId: m.sender_id,
    content: m.content,
    createdAt: m.created_at,
    readAt: m.read_at,
    profiles: m.profiles,
  };
}
