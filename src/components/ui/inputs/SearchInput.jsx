"use client";

import { cn } from "@/utils/cn";
import { parseAsString } from "nuqs";
import { useQueryState } from "nuqs";

export function SearchInput({ className = "", ...props }) {
  return (
    <input
      type="search"
      className={cn(
        "w-full md:min-w-md xl:min-w-xl bg-surface-container-low border-primary/15 border rounded-full py-3 px-6 text-sm text-on-surface shadow-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/60  transition-all",
        className,
      )}
      {...props}
    />
  );
}

export function SelectFilter({
  className = "",
  children,
  selectFilter,
  fieldValues = ["..."],
  ...props
}) {
  const [option, setOption] = useQueryState(
    selectFilter,
    parseAsString.withDefault(""),
  );

  const [_, setPage] = useQueryState("page", parseAsString.withDefault(1));

  function handleOption(newOption) {
    setOption(newOption);
    setPage(1);
  }

  return (
    <select
      className={cn(
        "w-fit appearance-none bg-surface-container-low border-primary/15 border rounded-full py-2 px-6 font-headline-md text-label-md text-on-surface shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all cursor-pointer text-xs sm:text-md py-3",
        className,
      )}
      aria-label={selectFilter}
      defaultValue={option}
      onChange={(e) => handleOption(e.target.value)}
      {...props}
    >
      {fieldValues.map((value) => (
        <option
          className="capitalize"
          key={value}
          value={value.startsWith("-") ? "" : value}
        >
          {value.startsWith("-") ? value.slice(1) : value}
        </option>
      ))}
    </select>
  );
}
