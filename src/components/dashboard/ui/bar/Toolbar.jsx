"use client";

import { useState, useEffect, useCallback } from "react";
import { SearchInput } from "../../../ui/inputs/SearchInput";
import { useQueryState, parseAsString } from "nuqs";
import { useDebounce } from "use-debounce";

export function Toolbar({
  searchName = "Buscar",
  selectFilter = "filtrar",
  optionInitialName = "Agrega un nombre",
  optionInitialValue = "",
  children,
}) {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
      shallow: false,
    }),
  );

  const [_, setPage] = useQueryState("page", parseAsString.withDefault(1));

  const handleSearch = useCallback(
    (newSearch) => {
      setSearch(newSearch);
      setPage(1);
    },
    [setSearch, setPage],
  );

  const [text, setText] = useState(search);
  const [searchValue] = useDebounce(text, 400);

  useEffect(() => {
    if (searchValue !== search) handleSearch(searchValue);
  }, [search, searchValue, handleSearch]);

  return (
    <div className="flex flex-col sm:flex-row shrink-0 gap-2.5 items-start w-full sm:w-fit z-8 mb-4 sm:mb-0">
      <SearchInput
        className="text-xs sm:text-md"
        placeholder={searchName}
        defaultValue={search}
        onChange={(e) => setText(e.target.value)}
        aria-label={searchName}
      />
      <div className="flex gap-2.5">{children}</div>
    </div>
  );
}
