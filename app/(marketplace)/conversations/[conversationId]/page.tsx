import { createClient } from "@/lib/supabase/server";
import { getConversation } from "@/lib/queries/getConversations";
import ConversationPageClient from "./ConversationPageClient";

export default async function ConversationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { conversationId } = await params;
  const conversation = await getConversation(conversationId);

  return (
    <ConversationPageClient conversation={conversation} userId={user.id} />
  );
}
