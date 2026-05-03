import { formatMoney } from "@/config/money";
import { useMedicineStorage } from "@/store/medicineStore";
import { clsx } from "clsx";
import React from "react";
import { LuClipboardPlus, LuPill, LuX } from "react-icons/lu";

export const CartCard = ({ item }) => {
  const { deleteProduct } = useMedicineStorage();

  return (
    <li className="flex flex-col gap-2 w-80 sm:w-70 text-[10px] sm:text-xs z-50 animate-slide-in-bottom">
      <div className="info-alert flex items-center justify-between w-full h-16 sm:h-14 rounded-lg bg-primary/20 px-[10px] border border-primary/40 cursor-pointer">
        <div className="flex gap-2 items-center">
          <div
            className={clsx(
              "bg-error-container text-on-error-container backdrop-blur-xl p-1 rounded-lg size-8",
              {
                "bg-error-container text-on-error-container": item.isMedicine,
                "bg-secondary-fixed text-on-secondary-container":
                  !item.isMedicine,
              },
            )}
          >
            {item.isMedicine ? (
              <LuPill className="size-full" />
            ) : (
              <LuClipboardPlus className="size-full" />
            )}
          </div>
          <div>
            <p className="text-gray-950 font-semibold uppercase text-left">
              {item.name}
            </p>
            <p className="text-gray-600 font-light text-left">
              {item.price === 0 ? "Reclamar" : formatMoney(item.price)}
              {item.activePrinciple && ` • ${item.activePrinciple} `}
            </p>
          </div>
        </div>
        <button
          onClick={() => deleteProduct(item.id)}
          className="text-primary hover:bg-primary/5 p-1 rounded-md transition-colors ease-linear size-8 active:scale-90 cursor-pointer"
        >
          <LuX className="size-full" />
        </button>
      </div>
    </li>
  );
};
