import {
  ProductCategory,
  ProductHosting,
  ProductStack,
} from "../types/product";

export function BadgeList({
  items,
  renderBadge,
  max = 3,
}: {
  items: { id: string }[];
  renderBadge: (
    item: ProductStack | ProductCategory | ProductHosting,
  ) => React.ReactNode;
  max?: number;
}) {
  const visible = items.slice(0, max);
  const overflow = items.length - max;
  return (
    <div className="flex flex-wrap gap-1">
      {visible.map(renderBadge)}
      {overflow > 0 && (
        <span className="text-xs px-2 py-0.5 text-[#1A1A1A]/35">
          +{overflow} more
        </span>
      )}
    </div>
  );
}
