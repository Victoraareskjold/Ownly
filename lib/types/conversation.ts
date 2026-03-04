export type RawMessage = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
  profiles: { id: string; name: string } | null;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
  profiles: { id: string; name: string } | null;
};

export type ConversationItem = {
  id: string;
  lastMessageAt: string;
  products: { id: string; name: string; tagline: string } | null;
  profiles: { id: string; name: string } | null;
};

export type Conversation = {
  id: string;
  products: { id: string; name: string; tagline: string } | null;
  profiles: { id: string; name: string } | null;
  messages: Message[];
};
