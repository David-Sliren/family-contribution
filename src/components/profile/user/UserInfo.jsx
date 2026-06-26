"use client";
import { useUserStore } from "@/components/provaider/AuthProvider";
import { LuHeart } from "react-icons/lu";

export const UserInfo = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex flex-col gap-2 text-center md:text-left">
      <span className="md:order-1 text-primary font-bold tracking-widest uppercase text-xs block">
        {user?.relationship === "externo"
          ? "Gracias por su contribucion"
          : "Miembro de la familia"}
      </span>
      <h1 className=" md:order-0 text-5xl font-extrabold tracking-tight text-on-surface">
        {user?.name}
      </h1>
      <p className=" md:order-first flex items-center justify-center md:justify-start gap-1 text-on-surface-variant  font-extralight text-lg capitalize">
        <LuHeart className="text-primary fill-current" />
        {user?.relationship === "externo" ? "contribuidor" : user?.relationship}
      </p>
    </div>
  );
};
