import clsx from "clsx";
import { SearchIcon } from "lucide-react";

interface SearchbarProps {
  search: string;
  setSearch: (value: string) => void;
  searchFocused: boolean;
  setSearchFocused: (value: boolean) => void;
  className?: string;
}

export default function Searchbar({
  searchFocused,
  search,
  setSearch,
  setSearchFocused,
  className,
}: SearchbarProps) {
  return (
    <div
      className={clsx(
        "flex items-center border rounded-xl bg-white",
        searchFocused
          ? "border-[#2D5BE3]/50 shadow-[0_0_0_4px_rgba(45,91,227,0.08)]"
          : "border-[#1A1A1A]/10",
        className,
      )}
    >
      <SearchIcon className="text-[#A3A3A3] shrink-0 w-4 aspect-square ml-4" />
      <input
        type="text"
        placeholder='Search "CRM", "invoicing", "project management"...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        className="flex-1 bg-transparent px-4 py-4 text-[#1A1A1A] placeholder-[#1A1A1A]/40 outline-none text-sm"
      />
    </div>
  );
}
