import { RawMessage, Message } from "@/lib/types/conversation";

export function mapMessage(m: RawMessage): Message {
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
