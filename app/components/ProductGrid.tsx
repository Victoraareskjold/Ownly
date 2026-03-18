import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
} from "@/lib/constants/categoryColors";
import { Product } from "@/lib/types/product";
import clsx from "clsx";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
  gridCols?: number;
}

export default function ProductGrid({
  products,
  gridCols = 3,
}: ProductGridProps) {
  console.log(products);
  return (
    <div
      className={clsx("grid grid-cols-1 gap-4", {
        "md:grid-cols-1": gridCols === 1,
        "md:grid-cols-2": gridCols === 2,
        "md:grid-cols-3": gridCols === 3,
        "md:grid-cols-4": gridCols === 4,
        "md:grid-cols-5": gridCols === 5,
      })}
    >
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className={clsx(
            "group border border-[#1A1A1A]/[0.07] bg-white rounded-xl flex flex-col gap-4 hover:border-[#2D5BE3]/30 hover:shadow-md transition-all duration-300 shadow-sm",
            "p-4 md:p-5",
            {
              "md:p-8": gridCols === 1,
            },
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-[#1A1A1A] text-base md:text-lg group-hover:text-[#2D5BE3] transition-colors">
                {product.name}
              </h3>
              <p className="text-[#1A1A1A]/40 text-xs md:text-sm mt-0.5 leading-relaxed">
                {product.tagline}
              </p>
              {gridCols === 1 && (
                <p className="text-[#1A1A1A]/60 text-sm mt-2 hidden md:block">
                  {product.description}
                </p>
              )}
            </div>
            {product.category.map((cat) => {
              const color = CATEGORY_COLORS[cat.id] ?? DEFAULT_CATEGORY_COLOR;
              return (
                <span
                  key={cat.id}
                  className={`shrink-0 text-xs px-2 py-1 rounded-md border ${color.bg} ${color.text} ${color.border}`}
                >
                  {cat.name}
                </span>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.stack.map((stack) => (
              <span
                key={stack.id}
                className="text-xs px-2 py-0.5 rounded-md bg-[#F7F5F0] text-[#1A1A1A]/40 border border-[#1A1A1A]/[0.07]"
              >
                {stack.name}
              </span>
            ))}
            {product.hosting.map((hosting) => (
              <span
                key={hosting.id}
                className="text-xs px-2 py-0.5 rounded-md bg-[#F7F5F0] text-[#1A1A1A]/40 border border-[#1A1A1A]/[0.07]"
              >
                {hosting.name}
              </span>
            ))}
            {product.updatesIncluded && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-[#2D5BE3]/8 text-[#2D5BE3] border border-[#2D5BE3]/15">
                Updates included
              </span>
            )}
            {product.setupIncluded && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-[#2D5BE3]/8 text-[#2D5BE3] border border-[#2D5BE3]/15">
                Setup included
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1A]/[0.05] mt-auto">
            <div>
              <p className="text-[#1A1A1A] font-bold text-base md:text-lg">
                ${product.price.toLocaleString()}
              </p>
              <p className="text-[#1A1A1A]/25 text-xs md:text-sm">one-time</p>
              {/* Ekstra felt kun når gridCols=1 */}
              {gridCols === 1 && (
                <p className="text-[#1A1A1A]/40 text-sm mt-1">
                  {product.sales} sales by @{product.seller.name}
                </p>
              )}
            </div>
            {gridCols !== 1 && (
              <div className="text-right">
                <p className="text-[#1A1A1A]/40 text-xs">
                  {product.sales} sales
                </p>
                <p className="text-[#1A1A1A]/25 text-xs">
                  by @{product.seller.name}
                </p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
