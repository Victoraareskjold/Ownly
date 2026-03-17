"use client";

import { useState } from "react";
import Searchbar from "../components/Searchbar";
import ProductGrid from "../components/ProductGrid";
import Link from "next/link";
import { Product } from "@/lib/types/product";

export const revalidate = 60;

interface HomePageProps {
  initialProducts: Product[];
}

export default function HomePage({ initialProducts }: HomePageProps) {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = initialProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-6xl flex flex-col mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1
          className="text-4xl md:text-6xl font-normal tracking-tight mb-4 text-[#1A1A1A]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Own your software.
          <span className="italic text-[#2D5BE3]"> Pay once.</span>
        </h1>
        <p className="text-[#1A1A1A]/45 text-lg mb-10 max-w-lg mx-auto">
          Complete, self-hosted alternatives to expensive SaaS tools — built by
          independent developers.
        </p>

        <Searchbar
          searchFocused={searchFocused}
          search={search}
          setSearch={setSearch}
          setSearchFocused={setSearchFocused}
          className="shadow-sm max-w-xl mx-auto transition-all duration-300"
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex flex-row items-center justify-between p-1">
              <p className="block text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30">
                Latest products
              </p>
              <Link href={"/products"} className="text-xs text-[#1A1A1A]/50">
                See all
                <span className="text-sm ml-1 shrink-0">→</span>
              </Link>
            </div>
            <ProductGrid products={filtered} />
          </div>
          <div>
            <div className="flex flex-row items-center justify-between p-1">
              <p className="block text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30">
                Weekly featured
              </p>
              <Link href={"/products"} className="text-xs text-[#1A1A1A]/50">
                See all
                <span className="text-sm ml-1 shrink-0">→</span>
              </Link>
            </div>
            <ProductGrid products={filtered} />
          </div>
          <Link
            href={"/products"}
            className="bg-[#1A1A1A] text-white rounded-full text-sm mt-6 font-medium block mx-auto w-40 text-center p-2"
          >
            View all products
          </Link>
        </div>
      ) : (
        <div className="text-center py-24 text-[#1A1A1A]/25">
          <p
            className="text-lg mb-2"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            No products found
          </p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
