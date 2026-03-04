import { createClient } from "@/lib/supabase/server";
import { getConversations } from "@/lib/queries/getConversations";
import ConversationsPageClient from "./ConversationsPageClient";

export default async function ConversationsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const conversations = await getConversations(user.id);

  return <ConversationsPageClient conversations={conversations} />;
}
