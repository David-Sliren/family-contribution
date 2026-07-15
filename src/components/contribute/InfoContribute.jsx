import React from "react";
import { LuHandHeart } from "react-icons/lu";

export const InfoContribute = () => {
  return (
    <>
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full w-fit animate-fade-in-down">
        <LuHandHeart className="text-xl" />
        <span className="text-[11px] font-bold tracking-widest uppercase">
          Apoyo Familiar
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface leading-tight tracking-tight font-headline animate-fade-in-down">
        Formulario de Colaboración
      </h1>
      <p className="text-lg text-on-surface-variant leading-relaxed font-body max-w-sm animate-fade-in-down">
        Tu apoyo asegura el tratamiento continuo de Aleida. Cada contribución es
        un paso hacia su bienestar.
      </p>
    </>
  );
};
