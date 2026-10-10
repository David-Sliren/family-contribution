"use client";
import { cn } from "@/utils/cn";
import { parseAsString, useQueryState } from "nuqs";
import { LuContact, LuLock, LuUser } from "react-icons/lu";

const TABS = [
  { value: "perfil", label: "Perfil", icon: LuUser },
  { value: "contacto", label: "Contacto", icon: LuContact },
  { value: "seguridad", label: "Seguridad", icon: LuLock },
];

export const ConfigSidebar = () => {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsString.withDefault("perfil"),
  );

  return (
    <nav
      className="w-full md:w-56 shrink-0"
      aria-label="Secciones de configuración"
    >
      <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none">
        {TABS.map(({ value, label, icon: Icon }) => {
          const isActive = tab === value;

          return (
            <li key={value}>
              <button
                type="button"
                onClick={() => setTab(value)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 font-semibold text-sm text-slate-600 hover:bg-primary-container/15 hover:text-primary-container transition whitespace-nowrap cursor-pointer",
                  isActive && "bg-primary-container/15 text-primary-container",
                )}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
