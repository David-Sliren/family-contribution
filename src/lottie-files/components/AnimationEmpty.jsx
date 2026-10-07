"use client";
import { Lottie, LottieInteractions, lottieInView } from "lottie-react";
import empty from "../files/EmptyState.json";
export const AnimationEmpty = ({ title = "No hay contribuciones" }) => {
  return (
    <LottieInteractions interactions={[lottieInView({ once: true })]}>
      <div className="size-90 m-auto flex flex-col justify-center items-center">
        <Lottie src={empty} autoplay={false} className="size-fit" />
        <span className="text-on-surface-variant text-xl text-se -mt-15">
          {title}
        </span>
      </div>
    </LottieInteractions>
  );
};
