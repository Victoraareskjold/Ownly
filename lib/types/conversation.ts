export type Conversation = {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  createdAt: string;
  lastMessageAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt: string;
};
