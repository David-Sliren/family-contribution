"use client";

import React, { useSyncExternalStore } from "react";
import { useMedicineStorage } from "@/store/medicineStore";
import clsx from "clsx";

const subscribeNoop = () => () => {};

export const BottomSheet = ({ children }) => {
  const { setIsOpenCart, isOpenCart } = useMedicineStorage();

  // detecta hidratación sin setState dentro de un effect (react-hooks/set-state-in-effect)
  const hasMounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  if (!hasMounted) return null;

  return (
    <aside
      className={clsx(
        " transform transition-all duration-500 ease-in-out fixed top-0 left-0 size-full flex flex-col justify-end z-30 overflow-hidden cursor-pointer",
        {
          hidden: !isOpenCart,
          "block ": isOpenCart,
        },
      )}
    >
      <div
        onClick={setIsOpenCart}
        className="backdrop-blur-md size-full -z-1 fixed top-0 left-0 overflow-hidden"
      />

      {children}
    </aside>
  );
};
