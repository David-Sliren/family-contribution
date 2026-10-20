import { blurColors } from "@/constants/bgBase64";
import Image from "next/image";
import React from "react";
import { LuSquarePen } from "react-icons/lu";

export const UserImg = ({ profiledata }) => {
  const user = profiledata;

  return (
    <div className="relative group">
      <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-primary-fixed-dim ring-offset-4 ring-offset-surface shadow-xl">
        <Image
          alt={user?.name || ""}
          placeholder="blur"
          blurDataURL={blurColors.purple}
          className="size-full object-cover"
          width={160}
          height={160}
          loading="eager"
          src={user?.image || "/family-img/Default.png"}
        />
      </div>
      <button className="hidden absolute bottom-2 right-2 bg-primary text-white p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform">
        <LuSquarePen />
      </button>
    </div>
  );
};
