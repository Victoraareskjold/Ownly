"use client";
import ProductGrid from "@/app/components/ProductGrid";
import { Product } from "@/lib/types/product";

interface DashboardPageClientProps {
  products: Product[];
}

export default function DashboardPageClient({
  products,
}: DashboardPageClientProps) {
  return (
    <div className="max-w-6xl flex flex-col mx-auto px-6 py-12">
      <p className="text-[#1A1A1A]/80 text-md font-semibold leading-relaxed mb-2">
        Your products
      </p>
      <ProductGrid products={products} />
    </div>
  );
}
