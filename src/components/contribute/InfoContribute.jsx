"use client";
import React from "react";
import { LuHandHeart } from "react-icons/lu";
import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
export const InfoContribute = () => {
  const { data } = useMainPatientQuery();
  return (
    <>
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full w-fit animate-fade-in-down">
        <LuHandHeart className="text-xl" />
        <span className="text-[11px] font-bold tracking-widest uppercase">
          Apoyo Familiar
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface leading-tight tracking-tight font-headline animate-fade-in-down">
        Contribuye al fondo de tratamiento de{" "}
        <span className="text-primary italic capitalize">
          {data.name ? data.name : "tu familia"}
        </span>
        .
      </h1>
      <p className="text-lg text-on-surface-variant leading-relaxed font-body max-w-sm animate-fade-in-down">
        Tu apoyo asegura el tratamiento continuo de{" "}
        {data.name ? `${data.name} ${data.lastName ?? ""}`.trim() : "tu familia"}.
        Cada contribución es un paso hacia su bienestar.
      </p>
    </>
  );
};
