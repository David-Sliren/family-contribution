"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SearchInput, Select } from "../../../ui/inputs/SearchInput";

export function Toolbar({
  searchName = "Buscar",
  selectFilter = "filtrar",
  optionInitialName = "Agrega un nombre",
  optionInitialValue = "",
  children,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateQuery(key, value) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex shrink-0 gap-2.5 items-center w-fit z-8">
      <SearchInput
        className="text-xs sm:text-md"
        placeholder={searchName}
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => updateQuery("search", e.target.value)}
        aria-label={searchName}
      />
      <Select
        className="text-xs sm:text-md py-3"
        aria-label={selectFilter}
        defaultValue={searchParams.get(selectFilter) ?? ""}
        onChange={(e) => updateQuery(selectFilter, e.target.value)}
      >
        <option value={optionInitialValue}>{optionInitialName}</option>
        {children}
      </Select>
    </div>
  );
}
