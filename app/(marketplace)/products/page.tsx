import { getProducts } from "@/lib/queries/getProducts";
import ProductPageClient from "./ProductPageClient";
import {
  getCategories,
  getHostings,
  getStacks,
} from "@/lib/queries/getFilters";

export default async function ProductPage() {
  const [latest, availableCategories, availableStacks, availableHostings] =
    await Promise.all([
      getProducts({ limit: 20, offset: 0 }),
      getCategories(),
      getStacks(),
      getHostings(),
    ]);

  return (
    <ProductPageClient
      initialProducts={latest}
      availableCategories={availableCategories}
      availableStacks={availableStacks}
      availableHostings={availableHostings}
    />
  );
}
