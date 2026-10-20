"use client";

import { DeafultPopover } from "@/components/ui/popovers/DeafultPopover";
import { blurColors } from "@/constants/bgBase64";
import { defaultDate } from "@/config/dates";
import { formatMoney } from "@/config/money";
import Image from "next/image";
import { LuEllipsisVertical, LuPencil } from "react-icons/lu";
import { ButtonPop } from "@/components/ui/buttons/ButtonPop";

export const ContributionCard = ({ contribution, handdler = () => "" }) => {
  return (
    <article className="relative flex items-center justify-between w-full p-4 rounded-2xl text-sm hover:bg-surface-container-low transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold font-headline-md overflow-hidden">
          {contribution?.createBy.image ? (
            <Image
              src={contribution?.createBy.image}
              height={200}
              width={200}
              placeholder="blur"
              blurDataURL={blurColors.purple}
              alt="imagen de usuario"
              className="size-full"
            />
          ) : (
            <span className="capitalize">
              {contribution?.createBy.name[0] ?? "I"}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-on-surface text-[10px] sm:text-xs">
            {contribution?.createBy.name}
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
          <p className="text-[10px] text-on-surface-variant text-right">
            {contribution?.status}
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
        <ButtonPop
          name="editar"
          handle={() => handdler(contribution)}
          icon={LuPencil}
        />
      </DeafultPopover>
    </article>
  );
};
