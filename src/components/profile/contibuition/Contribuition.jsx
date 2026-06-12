import React from "react";
import { TableContribuition } from "./table/TableContribuition";
import { LuDownload } from "react-icons/lu";
import { HeaderStat } from "./HeaderStat";

export const Contribuition = () => {
  return (
    <section className="mb-16 animate-slide-in-bottom">
      <HeaderStat />
      <TableContribuition />
    </section>
  );
};
