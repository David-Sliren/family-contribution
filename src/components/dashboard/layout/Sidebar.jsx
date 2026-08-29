"use client";

import { blurColors } from "@/constants/bgBase64";
import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
import { cn } from "@/utils/cn";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LuHeartHandshake,
  LuReceipt,
  LuPill,
  LuHouse,
  LuPanelLeft,
  LuUsersRound,
  LuBandage,
} from "react-icons/lu";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Inicio",
    icon: <LuHouse size={18} strokeWidth={1.8} />,
    requiredPatient: true,
    accessRole: ["admin"],
  },
  {
    href: "/dashboard/patients",
    label: "Pacientes",
    icon: <LuBandage size={18} strokeWidth={1.8} />,
    requiredPatient: false,
    accessRole: ["admin"],
  },
  {
    href: "/dashboard/users",
    label: "Usuarios",
    icon: <LuUsersRound size={18} strokeWidth={1.8} />,
    requiredPatient: true,
    accessRole: ["admin"],
  },
  {
    href: "/dashboard/inventory",
    label: "Invetario",
    icon: <LuPill size={18} strokeWidth={1.8} />,
    requiredPatient: true,
    accessRole: ["admin", "carer"],
  },
  {
    href: "/dashboard/expenses",
    label: "Gastos",
    icon: <LuReceipt size={18} strokeWidth={1.8} />,
    requiredPatient: true,
    accessRole: ["admin", "carer"],
  },
  {
    href: "/dashboard/contributions",
    label: "Contribuciones",
    icon: <LuHeartHandshake size={18} strokeWidth={1.8} />,
    requiredPatient: true,
    accessRole: ["admin"],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: mainPatient } = useMainPatientQuery();

  function handleMenu({ state }) {
    if (state === "false") return setIsOpen(() => false);
    if (state === "true") return setIsOpen(() => true);
    setIsOpen(!isOpen);
  }

  return (
    <>
      <LuPanelLeft
        onClick={handleMenu}
        className={clsx(
          "size-6 text-primary-container fixed top-31 left-2.5 sm:hidden transition-all",
          { "-translate-x-full": isOpen },
        )}
      />
      <aside
        className={clsx(
          "fixed sm:sticky top-0 left-0  flex flex-col shrink-0 gap-8 bg-surface-container-low max-w-[252px] min-h-full sm:py-7 pt-24 px-4 transition-all z-40",
          {
            "-translate-x-full sm:translate-0 w-fit": !isOpen,
          },
        )}
      >
        <div
          className={clsx("flex justify-between items-center w-full h-fit", {
            "justify-center": !isOpen,
          })}
        >
          <span
            className={clsx(
              "text-primary-container font-semibold text-xl capitalize",
              { hidden: !isOpen },
            )}
          >
            dashboard
          </span>
          <LuPanelLeft
            onClick={handleMenu}
            className="size-6 text-primary-container"
          />
        </div>
        <nav className="grid gap-1" aria-label="Secciones del panel">
          {NAV_ITEMS.map(
            ({ href, label, icon: Icon, requiredPatient, accessRole }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => {
                    handleMenu({ state: "false" });
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 font-semibold text-on-surface-variant hover:bg-surface-container-high/60 text-sm transition ",
                    {
                      "bg-surface-container-lowest text-primary": active,
                      hidden: requiredPatient && !mainPatient?.name,
                    },
                  )}
                >
                  {Icon}
                  <span className={clsx("", { hidden: !isOpen })}>{label}</span>
                </Link>
              );
            },
          )}
        </nav>

        <section
          className={clsx(
            "bg-surface-container-lowest rounded-2xl mt-auto p-3",
            {
              hidden: !isOpen,
            },
          )}
        >
          <article className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full grid place-items-center overflow-hidden">
              {!mainPatient?.img ? (
                <span className="flex justify-center items-center bg-primary-container size-full text-xs text-on-primary-container capitalize">
                  {mainPatient?.name ? mainPatient?.name[0] : "i"}
                </span>
              ) : (
                <Image
                  src={mainPatient?.img}
                  placeholder="blur"
                  blurDataURL={blurColors.purple}
                  alt="Paciente principal"
                  width={200}
                  height={200}
                />
              )}
            </div>
            <div className="flex flex-col text-[13px] font-body">
              <strong className=" text-on-surface capitalize">
                {mainPatient?.name
                  ? mainPatient?.name.split(" ")[0]
                  : "indefinido"}{" "}
                {mainPatient?.lastName
                  ? mainPatient?.lastName.split(" ")[0]
                  : ""}
              </strong>
              <span className="text-on-surface-variant text-[12px] capitalize">
                {mainPatient?.name ? "principal" : "sin pacientes"}
              </span>
            </div>
          </article>
        </section>
      </aside>
    </>
  );
}
