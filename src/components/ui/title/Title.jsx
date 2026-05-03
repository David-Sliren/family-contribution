import { titleFont } from "@/config/fonts";
import React from "react";

export const Title = ({ title, subtitle }) => {
  return (
    <section className="mb-10 animate-slide-in-top">
      <h1
        className={` ${titleFont.className} text-4xl font-extrabold tracking-tight font-headline text-on-surface mb-2 uppercase`}
      >
        {title}
      </h1>
      <p className="text-on-surface-variant text-lg">{subtitle}</p>
    </section>
  );
};
