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
