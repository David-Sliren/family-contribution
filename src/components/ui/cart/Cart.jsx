"use client";

import { LuShoppingCart } from "react-icons/lu";
import { CartCard } from "./CartCard";
import { useMedicineStorage } from "@/store/medicineStore";
import Lottie from "lottie-react";
import Medicine from "@/lottie-files/Medicine.json";
import { useUserStore } from "@/components/provaider/AuthProvider";

export const Cart = () => {
  const user = useUserStore((state) => state.user);
  const { products, setIsOpenCart } = useMedicineStorage();

  return (
    <section
      className={`group text-white rounded-t-3xl xl:rounded-3xl border border-primary/20 bg-gradient-to-tr from-primary-fixed to-primary-fixed-dim shadow-2xl duration-700 relative backdrop-blur-xl hover:border-primary/40 overflow-hidden hover:shadow-primary/10 hover:shadow-3xl w-full max-h-4/5 xl:w-[350px] xl:h-fit animate-slide-in-bottom xl:animate-slide-in-right z-10 ${user?.role !== "user" ? "block" : "hidden"}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce delay-500" />
        <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-primary/5 blur-xl animate-ping" />
        <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-primary/5 blur-lg animate-ping delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
      </div>
      <div className="p-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
            <div className="absolute inset-0 rounded-full border border-primary/90 animate-pulse delay-500" />
            {/* container cart */}
            <div
              onClick={setIsOpenCart}
              className="p-6 rounded-full backdrop-blur-lg border border-primary/38 bg-gradient-to-br from-white/80 to-gray-900/6 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover:shadow-green-500/20 xl:pointer-events-none"
            >
              <div className="transform group-hover:rotate-180 transition-transform duration-700">
                <LuShoppingCart className="text-primary" fill="#a855f7" />
              </div>
            </div>
          </div>
          <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
            <p className="text-3xl font-bold bg-gradient-to-r from-primary/55 via-primary to-primary/55 bg-clip-text text-transparent animate-pulse">
              Compras
            </p>
          </div>

          {!products.length ? (
            <div className="text-primary">
              <Lottie
                className="size-50"
                animationData={Medicine}
                loop={true}
              />
              <span>No hay productos</span>
            </div>
          ) : (
            <ul className="flex flex-col gap-y-2 items-center max-h-85 w-full lg:max-h-75 overflow-x-hidden not-scrollbar ">
              {products.map((item, i) => (
                <CartCard key={i} item={item} />
              ))}
            </ul>
          )}

          <div className="mt-6 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500 animate-pulse" />
          <div className="flex space-x-2 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>

      {/* digonals */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </section>
  );
};
