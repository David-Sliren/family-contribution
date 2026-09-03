"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SearchInput, Select } from "../../../ui/inputs/SearchInput";

/**
 * En vez de filtrar en memoria del lado del cliente (como el HTML original
 * con [data-filter]), el término de búsquedap vive en la URL (?q=...) y el
 * Server Component (page.jsx) hace la query filtrada. Esto es el mismo
 * patrón que ya usamos para la página de retorno de Mercado Pago:
 * el cliente solo actualiza el estado de navegación, nunca los datos.
 */
export function Toolbar({
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
        placeholder="Buscar medicina"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => updateQuery("search", e.target.value)}
        aria-label="Buscar medicina"
      />
      <Select
        aria-label="Filtrar por stock"
        defaultValue={searchParams.get(selectFilter) ?? ""}
        onChange={(e) => updateQuery(selectFilter, e.target.value)}
      >
        <option value={optionInitialValue}>{optionInitialName}</option>
        {children}
      </Select>
    </div>
  );
}
