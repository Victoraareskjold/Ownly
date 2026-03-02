import { Product, ProductFilters } from "@/lib/types/product";

export function filterProducts(products: Product[], filters: ProductFilters) {
  const { search, categories, stacks, hostings } = filters;

  return products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase());

    const productCategoryNames = p.category.map((c) => c.name);
    const matchCategory =
      categories.length === 0 ||
      categories.every((c) => productCategoryNames.includes(c));

    const productStackNames = p.stack.map((s) => s.name);
    const matchStack =
      stacks.length === 0 ||
      stacks.every((s) => productStackNames.includes(s));

    const productHostingNames = p.hosting.map((h) => h.name);
    const matchHosting =
      hostings.length === 0 ||
      hostings.every((h) => productHostingNames.includes(h));

    return matchSearch && matchCategory && matchStack && matchHosting;
  });
}
