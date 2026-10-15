"use client";

import { blurColors } from "@/constants/bgBase64";
import { useMainPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
import Image from "next/image";
import React from "react";

export const PortCard = () => {
  const { data } = useMainPatientQuery();

  return (
    <div className="flex aspect-square rounded-[3rem] overflow-hidden tonal-shadow-sm rotate-3 hover:rotate-0 transition-transform duration-500 sm:animate-fade-in-left animate-jiggle animate-duration-2200 [animation-iteration-count:infinite]">
      {!data?.image ? (
        <span className="flex justify-center items-center size-full bg-primary-container text-md md:text-2xl">
          Por favor inserte una imagen
        </span>
      ) : (
        <Image
          loading="eager"
          placeholder="blur"
          blurDataURL={blurColors.purple}
          alt="Abuela feliz"
          className="w-full h-full object-cover "
          src={data?.image}
          width={500}
          height={500}
        />
      )}
    </div>
  );
};
