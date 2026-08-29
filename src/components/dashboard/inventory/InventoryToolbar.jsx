"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SearchInput, Select } from "@/components/ui/inputs/SearchInput";

/**
 * En vez de filtrar en memoria del lado del cliente (como el HTML original
 * con [data-filter]), el término de búsqueda vive en la URL (?q=...) y el
 * Server Component (page.jsx) hace la query filtrada. Esto es el mismo
 * patrón que ya usamos para la página de retorno de Mercado Pago:
 * el cliente solo actualiza el estado de navegación, nunca los datos.
 */
export function InventoryToolbar({
  options = [{ value: "", title: "Ingrese un valor" }],
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
    <div className="flex gap-2.5 items-center flex-wrap mb-6">
      <SearchInput
        placeholder="Buscar medicina"
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(e) => updateQuery("q", e.target.value)}
        aria-label="Buscar medicina"
      />
      <Select
        aria-label="Filtrar por stock"
        defaultValue={searchParams.get("stock") ?? ""}
        onChange={(e) => updateQuery("stock", e.target.value)}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.title}
          </option>
        ))}
      </Select>
      <div className="ml-auto">{children}</div>
    </div>
  );
}
