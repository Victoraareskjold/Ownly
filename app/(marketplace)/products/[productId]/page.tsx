import { getProduct } from "@/lib/queries/getProducts";
import ProductDetailPageClient from "./ProductDetailPageClient";

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) return null;

  return <ProductDetailPageClient product={product} />;
}
