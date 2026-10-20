"use client";

import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
import React from "react";
import { LuHeart } from "react-icons/lu";

const DEFAULT_DATA = {
  reason: "Unidos por el bienestar de",
  name: "nombre",
  description:
    "Gestionemos juntos el tratamiento médico de nuestra familia con transparencia y amor. Cada contribución asegura que la atención de calidad nunca se detenga.",
};

const Slogan = () => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-xs font-semibold uppercase tracking-wider animate-fade-in-right">
      <LuHeart className="text-sm" fill="content" />
      Cuidado Familiar Colectivo
    </div>
  );
};

export const CallToAction = () => {
  const { data } = useMainPatientQuery();

  // Object.keys(data).length !== 0 Verifica que el objecto no este vacio
  const dataTotal = Object.keys(data).length !== 0 ? data : DEFAULT_DATA;

  return (
    <>
      <Slogan />
      <h1 className="lowercase [&::first-letter]:uppercase text-5xl lg:text-7xl font-extrabold tracking-tight text-on-background leading-[1.1] animate-fade-in-down">
        {dataTotal.reason}{" "}
        <span className="text-primary italic capitalize">
          {dataTotal.name ?? "Aninimo"}
        </span>
        .
      </h1>
      <p className="lowercase [&::first-letter]:uppercase text-xl text-on-surface-variant max-w-2xl font-body leading-relaxed animate-fade-in-right">
        {dataTotal.description}
      </p>
    </>
  );
};
