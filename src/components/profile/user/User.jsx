import React from "react";
import { UserImg } from "./UserImg";
import { UserInfo } from "./UserInfo";

export const User = () => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 mb-16 animate-slide-in-top">
      <UserImg />
      <UserInfo />
    </section>
  );
};
