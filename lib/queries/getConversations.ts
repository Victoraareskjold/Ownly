import { createClient } from "@/lib/supabase/server";
import { mapMessage } from "../mappers/conversationMapper";

export async function getConversationId(productId: string, userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("conversations")
    .select("id")
    .eq("product_id", productId)
    .eq("buyer_id", userId)
    .maybeSingle();
  return data?.id ?? null;
}

export async function getConversations(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("conversations")
    .select(
      `*, products (id, name, tagline), profiles!conversations_seller_id_fkey (id, name)`,
    )
    .eq("buyer_id", userId)
    .order("last_message_at", { ascending: false });

  return (data ?? []).map((c) => ({
    id: c.id,
    lastMessageAt: c.last_message_at,
    products: c.products,
    profiles: c.profiles,
  }));
}

export async function getConversation(conversationId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("conversations")
    .select(
      `
      *,
      products (id, name, tagline),
      profiles!conversations_seller_id_fkey (id, name),
      messages (
        id,
        sender_id,
        content,
        created_at,
        read_at,
        profiles!messages_sender_id_fkey (id, name)
      )
    `,
    )
    .eq("id", conversationId)
    .order("created_at", { referencedTable: "messages", ascending: true })
    .maybeSingle();

  if (!data) return null;

  return {
    id: data.id,
    products: data.products,
    profiles: data.profiles,
    messages: (data.messages ?? []).map((m: unknown) => mapMessage(m)),
  };
}
