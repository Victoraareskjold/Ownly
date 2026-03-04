import { getProduct } from "@/lib/queries/getProducts";
import ProductDetailPageClient from "./ProductDetailPageClient";
import { createClient } from "@/lib/supabase/server";
import { getConversationId } from "@/lib/queries/getConversations";

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { productId } = await params;
  const product = await getProduct(productId);
  if (!product) return null;

  let conversationId: string | null = null;
  if (user) {
    conversationId = await getConversationId(product.id, user.id);
  }

  return (
    <ProductDetailPageClient
      product={product}
      conversationId={conversationId}
    />
  );
}
