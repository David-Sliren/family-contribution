"use client";

import { DeafultPopover } from "@/components/ui/popovers/DeafultPopover";
import { formatMoney } from "@/config/money";
import { blurColors } from "@/constants/bgBase64";
import Image from "next/image";
import { LuEllipsisVertical, LuHandCoins } from "react-icons/lu";

export const UserCard = ({ user, handdler }) => {
  return (
    <article className="relative flex items-center justify-between w-full p-4 rounded-2xl text-sm hover:bg-surface-container-low transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold font-headline-md overflow-hidden">
          {user?.img ? (
            <Image
              src={user?.img}
              height={200}
              width={200}
              placeholder="blur"
              blurDataURL={blurColors.purple}
              alt="imagen de usuario"
            />
          ) : (
            <span className="capitalize">{user?.name[0] ?? "I"}</span>
          )}
        </div>
        <div>
          <h3 className=" font-semibold text-on-surface text-xs">
            {user?.name}
          </h3>
          <p className="text-[10px] text-on-surface-variant">{user?.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 relative">
        <span className="hidden sm:block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
          {formatMoney(user?.totalContributed)}
        </span>

        <button
          popoverTarget={`popover-basic-${user.id}`}
          className="relative text-on-surface-variant hover:text-primary transition-colors menu-trigger [anchor-name:--menu] cursor-pointer p-1"
        >
          <LuEllipsisVertical />
        </button>
      </div>
      <DeafultPopover id={user.id}>
        <button
          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low transition-colors text-primary text-wrap cursor-pointer"
          onClick={() => handdler(user)}
        >
          <span className="hidden sm:block">añadir contribucion</span>
          <LuHandCoins />
        </button>
      </DeafultPopover>
    </article>
  );
};