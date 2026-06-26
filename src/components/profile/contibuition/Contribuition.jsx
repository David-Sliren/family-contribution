"use client";

import React from "react";
import { TableContribuition } from "./table/TableContribuition";
import { HeaderStat } from "./HeaderStat";
import { useUserStore } from "@/components/provaider/AuthProvider";

const Empty = () => {
  return (
    <span className="text-primary-container text-2xl text-center">
      No tienes colaboraciones
    </span>
  );
};

export const Contribuition = () => {
  const colaborations = useUserStore((state) => state.user?.contributions);

  return (
    <section className="mb-16 animate-slide-in-bottom">
      <HeaderStat />
      {colaborations?.length === 0 ? <Empty /> : <TableContribuition />}
    </section>
  );
};
