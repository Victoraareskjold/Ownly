"use client";

import { useState } from "react";

interface SearchFilterProps {
  categories: string[];
  setCategories: (values: string[]) => void;
  stacks: string[];
  setStacks: (values: string[]) => void;
  hostings: string[];
  setHostings: (values: string[]) => void;
  availableCategories: string[];
  availableStacks: string[];
  availableHostings: string[];
}

const INITIAL_VISIBLE = 6;

function FilterGroup({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string;
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, INITIAL_VISIBLE);
  const hiddenCount = items.length - INITIAL_VISIBLE;
  const hasActive = selected.length > 0;

  return (
    <div className="flex items-start gap-3">
      {/* Label */}
      <div className="flex items-center gap-1.5 shrink-0 w-24 pt-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/60">
          {label}
        </span>
        {hasActive && (
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1A1A1A] text-white text-[9px] font-bold">
            {selected.length}
          </span>
        )}
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-1.5 flex-1">
        {visible.map((item) => {
          const active = selected.includes(item);
          return (
            <button
              key={item}
              onClick={() => onToggle(item)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 ${
                active
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-[#F7F5F0] border border-[#1A1A1A]/[0.07] text-[#1A1A1A]/50 hover:border-[#1A1A1A]/20 hover:text-[#1A1A1A]/80"
              }`}
            >
              {item}
            </button>
          );
        })}

        {/* Show more / less */}
        {items.length > INITIAL_VISIBLE && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="px-3 py-1 rounded-full text-xs font-medium text-[#2D5BE3] hover:bg-[#2D5BE3]/6 transition-colors duration-150"
          >
            {expanded ? "Show less" : `+${hiddenCount} more`}
          </button>
        )}

        {/* Clear selection */}
        {hasActive && (
          <button
            onClick={() => selected.forEach((item) => onToggle(item))}
            className="px-3 py-1 rounded-full text-xs font-medium text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors duration-150"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default function SearchFilters({
  categories,
  setCategories,
  stacks,
  setStacks,
  hostings,
  setHostings,
  availableCategories,
  availableStacks,
  availableHostings,
}: SearchFilterProps) {
  const toggle = (
    item: string,
    list: string[],
    setter: (values: string[]) => void,
  ) => {
    setter(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
    );
  };

  const totalActive = categories.length + stacks.length + hostings.length;

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-3 p-4 rounded-xl border border-[#1A1A1A]/[0.07] bg-white shadow-sm">
        <FilterGroup
          label="Category"
          items={availableCategories}
          selected={categories}
          onToggle={(item) => toggle(item, categories, setCategories)}
        />

        <div className="border-t border-[#1A1A1A]/[0.05]" />

        <FilterGroup
          label="Stack"
          items={availableStacks}
          selected={stacks}
          onToggle={(item) => toggle(item, stacks, setStacks)}
        />

        <div className="border-t border-[#1A1A1A]/[0.05]" />

        <FilterGroup
          label="Hosting"
          items={availableHostings}
          selected={hostings}
          onToggle={(item) => toggle(item, hostings, setHostings)}
        />

        {/* Global clear */}
        {totalActive > 0 && (
          <>
            <div className="border-t border-[#1A1A1A]/[0.05]" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#1A1A1A]/35">
                {totalActive} filter{totalActive !== 1 ? "s" : ""} active
              </span>
              <button
                onClick={() => {
                  setCategories([]);
                  setStacks([]);
                  setHostings([]);
                }}
                className="text-xs font-medium text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
              >
                Clear all
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
