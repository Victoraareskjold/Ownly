"use client";
import { useState } from "react";
import ProductGrid from "@/app/components/ProductGrid";
import Searchbar from "@/app/components/Searchbar";
import SearchFilters from "@/app/components/SearchFilters";
import { Product, ProductFilters } from "@/lib/types/product";
import { filterProducts } from "@/lib/utils/filterProducts";

interface ProductPageClientProps {
  initialProducts: Product[];
  availableCategories: string[];
  availableStacks: string[];
  availableHostings: string[];
}

export default function ProductsPageClient({
  initialProducts,
  availableCategories,
  availableStacks,
  availableHostings,
}: ProductPageClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [stacks, setStacks] = useState<string[]>([]);
  const [hostings, setHostings] = useState<string[]>([]);

  const [page, setPage] = useState(0);
  const pageSize = 20;

  const filters: ProductFilters = { search, categories, stacks, hostings };
  const filtered = filterProducts(products, filters);

  const loadMore = async () => {
    const query = new URLSearchParams();
    query.set("limit", pageSize.toString());
    query.set("offset", ((page + 1) * pageSize).toString());
    if (search) query.set("search", search);
    if (categories.length) query.set("categories", categories.join(","));
    if (stacks.length) query.set("stacks", stacks.join(","));
    if (hostings.length) query.set("hostings", hostings.join(","));

    const more: Product[] = await fetch(
      `/api/products?${query.toString()}`,
    ).then((res) => res.json());

    setProducts([...products, ...more]);
    setPage(page + 1);
  };

  return (
    <div className="max-w-6xl flex flex-col mx-auto px-6 py-12">
      <div>
        <h1 className="text-2xl font-medium tracking-tight mb-2 text-[#1A1A1A]">
          Find your product
        </h1>
        <Searchbar
          search={search}
          setSearch={setSearch}
          searchFocused={false}
          setSearchFocused={() => {}}
          className="mb-2"
        />
        <SearchFilters
          categories={categories}
          setCategories={setCategories}
          stacks={stacks}
          setStacks={setStacks}
          hostings={hostings}
          setHostings={setHostings}
          availableCategories={availableCategories}
          availableStacks={availableStacks}
          availableHostings={availableHostings}
        />
      </div>

      <ProductGrid products={filtered} gridCols={3} />

      <div className="text-center mt-6">
        <button
          onClick={loadMore}
          className="bg-[#1A1A1A] text-white rounded-full px-6 py-2 text-sm font-medium"
        >
          Load More
        </button>
      </div>
    </div>
  );
}
