"use client";

import { DeafultPopover } from "@/components/ui/popovers/DeafultPopover";
import { blurColors } from "@/constants/bgBase64";
import { defaultDate } from "@/config/dates";
import { formatMoney } from "@/config/money";
import Image from "next/image";
import { LuEllipsisVertical, LuPencil } from "react-icons/lu";

export const ContributionCard = ({ contribution, handdler = () => "" }) => {
  return (
    <article className="relative flex items-center justify-between w-full p-4 rounded-2xl text-sm hover:bg-surface-container-low transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold font-headline-md overflow-hidden">
          {contribution?.userId.img ? (
            <Image
              src={contribution?.userId.img}
              height={200}
              width={200}
              placeholder="blur"
              blurDataURL={blurColors.purple}
              alt="imagen de usuario"
            />
          ) : (
            <span className="capitalize">
              {contribution?.userId.name[0] ?? "I"}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-on-surface text-[10px] sm:text-xs">
            {contribution?.userId.name} salazar andulce
          </h3>
          <p className="text-[10px] text-on-surface-variant">
            {defaultDate(contribution?.date)}
          </p>
          <p className="text-[10px] text-on-surface-variant">
            {contribution?.purpose}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 relative">
        <span className="sm:block text-primary text-xs w-fit text-right">
          {formatMoney(contribution?.amount)}
          <p className="text-[10px] text-on-surface-variant text-right">
            {contribution?.method}
          </p>
        </span>
        <button
          popoverTarget={`popover-basic-${contribution.id}`}
          className="relative text-on-surface-variant hover:text-primary transition-colors menu-trigger [anchor-name:--menu] cursor-pointer p-1"
        >
          <LuEllipsisVertical />
        </button>
      </div>
      <DeafultPopover id={contribution.id}>
        <button
          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low transition-colors text-primary text-wrap cursor-pointer"
          onClick={() => handdler(contribution)}
        >
          <span className="hidden sm:block capitalize">
            editar contribucion
          </span>
          <LuPencil />
        </button>
      </DeafultPopover>
    </article>
  );
};