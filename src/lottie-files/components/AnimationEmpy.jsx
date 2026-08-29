"use client";
import { Lottie } from "lottie-react";
import empty from "../files/EmptyState.json";
export const AnimationEmpy = ({ title = "No hay contribuciones" }) => {
  return (
    <div className="size-90 m-auto flex flex-col justify-center items-center">
      <Lottie src={empty} autoplay loop className="size-fit" />
      <span className="text-secondary text-xl text-se -mt-15">{title}</span>
    </div>
  );
};
